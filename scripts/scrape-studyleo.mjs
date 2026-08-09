// scripts/scrape-studyleo.mjs
// One-off/manual scraper: pulls StudyLeo's 6,241 programs (JSON-LD embedded in
// /en/programs?page=N) into scripts/data/studyleo-catalog.json + downloads logos.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'data', 'studyleo-catalog.json');
const LOGO_DIR = join(__dirname, '..', 'public', 'images', 'universities');
const PER_PAGE = 10;
const START_PAGE = 1;
const MAX_PAGES = 700; // safety cap; actual is 625

// StudyLeo faculty → our category, matched against program name keywords.
const CATEGORY_KEYWORDS = [
  ['dentistry', ['dental', 'dentistry', 'diş', 'prosthetics']],
  ['medicine', ['medicine', 'medical', 'doctor', 'tıp', 'hekim']],
  ['engineering', ['engineering', 'mühendislik', 'mühendisliği']],
  ['computer-science', ['computer', 'software', 'data', 'cyber', 'artificial intelligence', 'yazılım', 'bilgisayar']],
  ['business', ['business', 'management', 'marketing', 'finance', 'economics', 'trade', 'administration', 'accounting', 'logistics', 'işletme', 'ekonomi']],
  ['law', ['law', 'hukuk', 'justice']],
  ['architecture', ['architecture', 'mimarlık', 'mimarlik', 'restoration']],
  ['arts', ['design', 'art', 'fashion', 'music', 'cinema', 'graphic', 'interior', 'sanat', 'tasarım']],
  ['health-sciences', ['health', 'nursing', 'physiotherapy', 'pharmacy', 'nutrition', 'psychology', 'midwifery', 'audiology', 'paramedic', 'dialysis', 'opticianry', 'audiometry', 'speech and language therapy', 'hemşire', 'fizyoterapi', 'eczacılık', 'beslenme']],
  ['tourism', ['tourism', 'hotel', 'gastronomy', 'turizm', 'otel']],
  ['agriculture', ['agriculture', 'food', 'tarım', 'gıda']],
  ['natural-sciences', ['mathematics', 'physics', 'chemistry', 'biology', 'matematik', 'fizik', 'kimya', 'biyoloji']],
  ['humanities', ['history', 'literature', 'philosophy', 'language', 'translation', 'tarih', 'edebiyat', 'felsefe']],
  ['communication', ['journalism', 'communication', 'media', 'radio', 'television', 'cinema and tv', 'gazetecilik', 'iletişim']],
  ['social-sciences', ['sociology', 'political', 'international relations', 'social', 'sosyoloji', 'siyaset']],
];
const DEFAULT_CATEGORY = 'social-sciences';

function slugify(s) {
  return String(s)
    .replace(/ı/g, 'i') // dotless ı (U+0131) has no NFKD decomposition — transliterate first
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // Ç→C, Ö→O, Ş→S, Ğ→G, İ→I (decomposed), é→e, etc.
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function categorize(name) {
  const n = (name || '').toLowerCase();
  for (const [category, keywords] of CATEGORY_KEYWORDS) {
    if (keywords.some((k) => n.includes(k))) return category;
  }
  return DEFAULT_CATEGORY;
}

function parseTimeToComplete(s) {
  if (!s) return 4;
  const m = /(\d+(?:\.\d+)?)Y/.exec(s);
  return m ? Math.round(Number(m[1])) : 4;
}

function degreeLevel(s) {
  const l = (s || '').toLowerCase();
  if (l.includes('associate')) return 'associate';
  if (l.includes('master')) return 'master';
  if (l.includes('phd') || l.includes('doctor')) return 'phd';
  return 'bachelor';
}

// Strip $, commas → number. null when empty.
function parsePrice(raw) {
  if (raw == null) return null;
  const n = Number(String(raw).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : null;
}

async function fetchWithRetry(url, attempts = 3) {
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
      if (res.ok) return await res.text();
      lastErr = new Error(`HTTP ${res.status} for ${url}`);
    } catch (e) {
      lastErr = e;
    }
    // transient network errors happen; back off briefly and retry
    await new Promise((r) => setTimeout(r, 800 * i));
  }
  throw lastErr;
}

async function fetchPage(page) {
  return fetchWithRetry(`https://www.studyleo.com/en/programs?page=${page}`);
}

// Program cards show their teaching language as
// `<span class="text-grey text-xs">Languages</span><div class="font-medium text-black-text text-sm flex flex-col"><span>English</span></div>`
// Cards on a page line up 1:1 with the JSON-LD ItemList items (verified against live HTML).
function extractLanguages(html) {
  const langs = [];
  const re = /Languages<\/span><div[^>]*><span>([^<]+)<\/span>/g;
  let m;
  while ((m = re.exec(html))) langs.push(m[1].trim());
  return langs;
}

// Normalise a card language label to our canonical codes. Real labels seen in the wild:
// "English", "Turkish", "30% English" (Turkish-taught programs with partial English content).
// Anything unrecognised falls back to 'en' rather than dropping the program.
// Note: the plan's `startsWith('tr')` check never matched "Turkish" (t-u-r…), so we match
// full words — verified: "Turkish"→tr, "English"/"30% English"→en.
function normalizeLanguage(label) {
  const l = (label || '').toLowerCase();
  if (l.startsWith('en') || l.includes('english')) return 'en';
  if (l.startsWith('tr') || l.includes('turkish')) return 'tr';
  if (l.startsWith('ar') || l.includes('arabic')) return 'ar';
  if (l.startsWith('ru') || l.includes('russian')) return 'ru';
  return 'en';
}

// University cities come from the /en/universities listing's JSON-LD
// (CollegeOrUniversity -> PostalAddress.addressLocality), which is far more robust than
// matching card markup. The list paginates ?page=1..7 (12 per page, 76 universities total).
async function fetchUniversityCities() {
  const map = new Map();
  for (let page = 1; page <= 20; page++) {
    const url = page === 1 ? 'https://www.studyleo.com/en/universities' : `https://www.studyleo.com/en/universities?page=${page}`;
    const html = await fetchWithRetry(url);
    let found = 0;
    const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    let m;
    while ((m = re.exec(html))) {
      try {
        const parsed = JSON.parse(m[1]);
        if (parsed['@type'] === 'ItemList' && Array.isArray(parsed.itemListElement)) {
          for (const el of parsed.itemListElement) {
            const item = el.item;
            if (item?.['@type'] !== 'CollegeOrUniversity' || !item.name) continue;
            const slug = (item.url || item['@id'] || '').split('/').filter(Boolean).pop()?.replace(/#.*$/, '');
            if (!slug) continue;
            const city = item.address?.addressLocality;
            if (city) map.set(slug, city);
            found++;
          }
        }
      } catch { /* skip malformed blocks */ }
    }
    if (!found) break; // past the last page
    await new Promise((r) => setTimeout(r, 300));
  }
  return map;
}

function extractJsonLd(html) {
  const out = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1]);
      if (parsed['@type'] === 'ItemList' && Array.isArray(parsed.itemListElement)) {
        for (const el of parsed.itemListElement) {
          const item = el.item;
          if (item && item['@type'] === 'EducationalOccupationalProgram') out.push(item);
        }
      }
    } catch { /* skip malformed blocks */ }
  }
  return out;
}

// Flatten duplicates: same program name at same university may repeat across pages.
const programs = new Map(); // key: `${uniSlug}|${programName}`
const universities = new Map(); // key: slug
let seen = 0;
const unmatched = new Set();

async function main() {
  for (let page = START_PAGE; page <= MAX_PAGES; page++) {
    const html = await fetchPage(page);
    const items = extractJsonLd(html);
    if (!items.length) {
      if (page === 1) {
        throw new Error('No JSON-LD items on page 1 — StudyLeo markup likely changed');
      }
      break; // past last page
    }
    const langs = extractLanguages(html); // card languages line up 1:1 with JSON-LD items
    for (const item of items) {
      seen++;
      const name = item.name;
      const provider = item.provider?.[0];
      if (!name || !provider) continue;
      const uniName = provider.name;
      const uniSlug = slugify(uniName);
      const logoUrl = provider.logo;
      const offers = item.offers || {};
      const low = parsePrice(offers.lowPrice);
      const high = parsePrice(offers.highPrice);
      const category = categorize(name);
      if (category === DEFAULT_CATEGORY && !CATEGORY_KEYWORDS.some(([, ks]) => ks.some((k) => name.toLowerCase().includes(k)))) {
        unmatched.add(name);
      }
      if (!universities.has(uniSlug)) {
        universities.set(uniSlug, {
          name: uniName,
          slug: uniSlug,
          logoUrl: logoUrl || null,
          cityName: null, // backfilled from the universities page in Task 5
        });
      }
      const key = `${uniSlug}|${name}`;
      if (!programs.has(key)) {
        programs.set(key, {
          name,
          slug: slugify(name),
          degreeLevel: degreeLevel(item.educationalCredentialAwarded),
          durationYears: parseTimeToComplete(item.timeToComplete),
          categorySlug: category,
          universitySlug: uniSlug,
          language: 'en', // replaced below with the real language from card HTML
          tuitionFee: low ?? 0,
          originalFee: low && high && high > low ? high : null,
          currency: offers.priceCurrency || 'USD',
        });
      }
    }
    // Language for program at index i corresponds to langs[i] (same DOM order as the JSON-LD).
    items.forEach((item, i) => {
      const provider = item.provider?.[0];
      if (!provider || !item.name) return;
      const key = `${slugify(provider.name)}|${item.name}`;
      const prog = programs.get(key);
      if (prog) prog.language = normalizeLanguage(langs[i]);
    });
    console.log(`page ${page}: ${items.length} items (total seen ${seen})`);
    await new Promise((r) => setTimeout(r, 300)); // be polite
  }

  // Backfill university cities from the /en/universities listing (only the ~76 listed
  // universities have one; the rest stay null and are logged).
  const cityMap = await fetchUniversityCities();
  console.log(`university city map: ${cityMap.size} cities`);
  const unis = [...universities.values()];
  for (const uni of unis) {
    uni.cityName = cityMap.get(uni.slug) ?? null;
    if (!uni.cityName) console.warn(`⚠ no city found for ${uni.name}`);
  }

  const catalog = {
    generatedAt: new Date().toISOString(),
    universities: unis,
    programs: [...programs.values()],
    unmatchedPrograms: [...unmatched],
  };
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(catalog, null, 2));
  console.log(`✓ wrote ${OUT}`);
  console.log(`universities: ${catalog.universities.length}, programs: ${catalog.programs.length}`);
  console.log(`unmatched (defaulted to ${DEFAULT_CATEGORY}): ${unmatched.size}`);
  if (unmatched.size) console.log('first 20 unmatched:', [...unmatched].slice(0, 20).join('; '));

  // Download logos (best effort; log failures, don't crash).
  for (const uni of catalog.universities) {
    if (!uni.logoUrl) continue;
    const dir = join(LOGO_DIR, uni.slug);
    mkdirSync(dir, { recursive: true });
    const ext = uni.logoUrl.includes('.svg') ? 'svg' : 'webp';
    const outPath = join(dir, `logo.${ext}`);
    try {
      const buf = Buffer.from(await fetchWithRetry(uni.logoUrl, 2).then((t) => t));
      writeFileSync(outPath, buf);
      uni.logoLocalPath = `/images/universities/${uni.slug}/logo.${ext}`;
    } catch (e) {
      console.warn(`⚠ logo failed ${uni.name}: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  writeFileSync(OUT, JSON.stringify(catalog, null, 2));
  console.log('✓ logos downloaded and catalog updated');
}

// Only run when invoked directly — importing for tests must not scrape.
const invokedDirect = (() => {
  try {
    return import.meta.url === pathToFileURL(process.argv[1]).href;
  } catch {
    return false;
  }
})();
if (invokedDirect) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export { categorize, parsePrice, degreeLevel, parseTimeToComplete, slugify, extractLanguages, normalizeLanguage };
