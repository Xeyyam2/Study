// scripts/generate-seed-from-catalog.mjs
// Reads scripts/data/studyleo-catalog.json and emits src/lib/seed/studyleo-catalog.ts
// with the StudyLeo universities, programs, and university_programs.
//
// Regenerate after re-scraping:
//   npm run scrape:studyleo && node scripts/generate-seed-from-catalog.mjs
//
// Design decisions (see Task 6):
//  - Programs dedupe against the hand-written seed by EN name: when a catalog
//    program's EN name matches a seedPrograms row, we REUSE that program's id
//    in the university_programs rows instead of creating a duplicate program.
//    Only genuinely-new program names create new `programs` rows. Universities
//    dedupe by exact lowercased name. Slug-only matches count as a match too,
//    because `public.programs.slug` / `public.universities.slug` are globally
//    UNIQUE in Postgres — inserting a same-slug duplicate would fail.
//  - `programs.slug` is globally unique in the DB, but the catalog repeats the
//    same slug across universities (e.g. `nutrition-and-dietetics` ×42). We
//    disambiguate: first occurrence keeps the catalog slug; later ones get a
//    `-<universitySlug>` suffix. The UI never routes on program slug (search
//    sends program hits to /programs; the tables render `name[locale]`), so
//    the suffix is cosmetic but keeps the data layer / search stable.
//  - university_programs.university_id is a FK to the EXISTING seed university
//    rows (short ids like `u-istanbul-medipol`), resolved via slug map.
//  - Every catalog university already exists in the hand-written seed (by name
//    or slug), so the emitted `studyLeoUniversities` array is EMPTY. The module
//    still declares the typed array + logo map so the pipeline is stable if the
//    catalog ever adds new universities.
//  - `InstructionLanguage` is widened to 'tr' | 'en' | 'ar' | 'ru' in
//    src/types/index.ts — the catalog contains ar/ru programs (real data).
//  - Placeholders: foundedYear 1998, studentCount 0, ranking 999 (sorts new
//    unis to the end of /universities). `formatNumber(0)` renders "0" — fine
//    for now, flagged as a placeholder in the emitted file.
//  - The emitted module imports types via the RELATIVE path '../../types'
//    (never '@/types') because scripts/seed-content.ts runs under tsx, which
//    does not resolve the '@/' path alias (see seed-content.ts:38-39).
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const catalog = JSON.parse(
  readFileSync(join(root, 'scripts', 'data', 'studyleo-catalog.json'), 'utf8'),
);
const seedDir = join(root, 'src', 'lib', 'seed');

// The 17 AppLocale keys used by the hand-written seed files (src/i18n/routing).
const LOCALES = [
  'en', 'tr', 'az', 'ru', 'de', 'fr', 'fa', 'ar', 'tk', 'kk',
  'ky', 'zh', 'bg', 'ur', 'uz', 'sw', 'so', 'id',
];

// ---------------------------------------------------------------------------
// 1. Load existing hand-written seed arrays to dedupe by NAME.
// ---------------------------------------------------------------------------

/** Collect `key: '...'` string values from a seed TS file. */
function extractNames(file, key) {
  const set = new Set();
  try {
    const src = readFileSync(join(seedDir, file), 'utf8');
    for (const m of src.matchAll(new RegExp(`${key}: '([^']+)'`, 'g'))) {
      set.add(m[1].toLowerCase());
    }
  } catch {
    /* file missing — treat as empty */
  }
  return set;
}

const existingUniNames = extractNames('universities.ts', 'name');
const existingUniSlugs = extractNames('universities.ts', 'slug');

// Normalize Turkish diacritics so "Nevşehir" matches seed "Nevsehir".
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .trim();

// Map university slug → canonical seed id (e.g. 'istanbul-medipol-university'
// → 'u-istanbul-medipol'). The hand-written seed uses short ids that differ
// from the catalog slugs, and the DB FK on university_programs.university_id
// points at those existing rows.
const uniIdBySlug = new Map();
const uniIdByNormName = new Map();
try {
  const src = readFileSync(join(seedDir, 'universities.ts'), 'utf8');
  // Sequential scan: every `id: 'u-...'` is followed by its `name`/`slug`
  // within the same university object (universities.ts has no blank lines
  // between entries, so a block-based split does not work here).
  let lastId = null;
  let lastName = null;
  for (const m of src.matchAll(/id: '(u-[^']+)'|name: '([^']+)'|slug: '([^']+)'/g)) {
    if (m[1]) {
      lastId = m[1];
      lastName = null;
    } else if (m[2]) {
      lastName = m[2];
    } else if (m[3] && lastId) {
      uniIdBySlug.set(m[3], lastId);
      if (lastName) uniIdByNormName.set(norm(lastName), lastId);
    }
  }
} catch (err) {
  console.warn('warn: could not parse universities.ts for id map:', err.message);
}
// programs.ts names are LocalizedString objects — extract the EN name only.
// Sequential scan: every `id: 'p-...'` is followed by its `name: { en: '...' }`
// within the same Program object, so an `en:` directly after a program id
// belongs to that program's name. (The `seedCategories` block above also has
// `en:` keys — they are never preceded by a program id, so they are excluded.)
const progIdByEnName = new Map(); // lowercase EN name → seed program id
const existingProgSlugs = new Set();
try {
  const src = readFileSync(join(seedDir, 'programs.ts'), 'utf8');
  let lastId = null;
  for (const m of src.matchAll(/id: '(p-[^']+)'|en: '([^']+)'|slug: '([^']+)'/g)) {
    if (m[1]) {
      lastId = m[1];
    } else if (m[2]) {
      if (lastId && !progIdByEnName.has(m[2].toLowerCase())) {
        progIdByEnName.set(m[2].toLowerCase(), lastId);
      }
      lastId = null; // name consumed; next en: belongs to a new program
    } else if (m[3]) {
      existingProgSlugs.add(m[3]);
    }
  }
} catch {}

// Existing seedCities, keyed by normalized EN name → id.
const cityById = new Map(); // id → city
try {
  const src = readFileSync(join(seedDir, 'cities.ts'), 'utf8');
  // Sequential scan: each city object is `id: 'c-...'` ... `name: { en: '...'`.
  let lastId = null;
  for (const m of src.matchAll(/id: '(c-[^']+)'|en: '([^']+)'/g)) {
    if (m[1]) {
      lastId = m[1];
      if (!cityById.has(lastId)) cityById.set(lastId, { id: lastId });
    } else if (m[2] && lastId && !cityById.get(lastId).en) {
      cityById.get(lastId).en = m[2].toLowerCase();
    }
  }
} catch {}

const seedCityByNorm = new Map();
for (const c of cityById.values()) {
  if (c.en) seedCityByNorm.set(norm(c.en), c.id);
}
const ISTANBUL_ID = seedCityByNorm.get('istanbul') ?? 'c-istanbul';

// ---------------------------------------------------------------------------
// 2. Build the StudyLeo-only arrays (skip anything already seeded).
// ---------------------------------------------------------------------------

const { universities, programs } = catalog;

/** Resolve a city id for a catalog university; creates new cities as needed. */
function resolveCityId(cityName, newCities, seenCitySlugs) {
  if (!cityName) return ISTANBUL_ID; // catalog universities with null cityName
  const key = norm(cityName);
  const existing = seedCityByNorm.get(key);
  if (existing) return existing;
  if (seenCitySlugs.has(key)) {
    return newCities.find((c) => norm(c.name.en) === key)?.id ?? ISTANBUL_ID;
  }
  seenCitySlugs.add(key);
  const slug = key.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'city';
  const city = {
    id: `c-${slug}`,
    slug,
    countryId: 'TR',
    monthlyLivingCostUSD: 500,
    name: Object.fromEntries(LOCALES.map((l) => [l, cityName])),
  };
  newCities.push(city);
  return city.id;
}

/** Initials for the logoText fallback. */
function initials(name) {
  const words = name
    .replace(/[()]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'U';
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join('');
}

const seenUniNames = new Set();
const seenUniSlugs = new Set();
const studyLeoUniversities = [];
const studyLeoLogoImages = {};
const newCities = [];
const seenCitySlugs = new Set();

for (const uni of universities) {
  const nameKey = uni.name.toLowerCase();
  const nameTaken = existingUniNames.has(nameKey) || seenUniNames.has(nameKey);
  // Slug conflicts are treated as "already seeded" — the DB slug column is UNIQUE.
  const slugTaken = existingUniSlugs.has(uni.slug) || seenUniSlugs.has(uni.slug);
  if (nameTaken || slugTaken) {
    seenUniNames.add(nameKey);
    seenUniSlugs.add(uni.slug);
    continue;
  }
  seenUniNames.add(nameKey);
  seenUniSlugs.add(uni.slug);

  const cityId = resolveCityId(uni.cityName, newCities, seenCitySlugs);
  const uniPrograms = programs.filter((p) => p.universitySlug === uni.slug);
  const languages = [...new Set(uniPrograms.map((p) => p.language))];

  studyLeoUniversities.push({
    id: `u-${uni.slug}`,
    name: uni.name,
    slug: uni.slug,
    cityId,
    // PLACEHOLDER fields — the catalog has no foundedYear/studentCount/ranking.
    // ranking 999 keeps new unis at the end of the /universities sort;
    // studentCount 0 renders as "0" via formatNumber — revisit if it looks bad.
    foundedYear: 1998,
    studentCount: 0,
    ranking: 999,
    accreditation: 'YÖK Accredited',
    isState: false, // StudyLeo catalog is private universities
    logoText: initials(uni.name),
    ...(uni.logoLocalPath ? { logoImage: uni.logoLocalPath } : {}),
    heroImage: `/images/universities/${uni.slug}/hero.webp`,
    gallery: [],
    languages,
    tagline: { en: '' },
    description: { en: '' },
  });
  if (uni.logoLocalPath) studyLeoLogoImages[uni.slug] = uni.logoLocalPath;
}

// Programs — reuse existing seed program ids by EN name; create a new Program
// row only for genuinely-new names. EVERY catalog entry still gets a
// university_programs row (this is the Task 6 fix: previously any catalog
// program whose EN name matched the seed was skipped entirely, dropping
// ~3,144 university_programs rows).
// (Slug collisions are still handled: `public.programs.slug` is globally
// UNIQUE in Postgres, so repeated catalog slugs get a '-<universitySlug>'
// suffix after the first use, and slugs owned by hand-written seed programs
// get the same suffix.)
const usedSlugs = new Map(); // slug → count (disambiguate globally-unique slug)
const newProgIdByName = new Map(); // lowercase EN name → created program id (new names only)
const usedUpKeys = new Set(); // 'universityId|programId' → dedupe within catalog
const studyLeoPrograms = [];
const studyLeoUniversityPrograms = [];

for (const p of programs) {
  const nameKey = p.name.toLowerCase();
  const existingProgramId = progIdByEnName.get(nameKey);
  let programId;
  if (existingProgramId) {
    // Name already seeded — reuse the existing program row.
    programId = existingProgramId;
  } else if (newProgIdByName.has(nameKey)) {
    // Genuinely-new name already created earlier in the catalog — reuse it.
    programId = newProgIdByName.get(nameKey);
  } else {
    // First sighting of a genuinely-new name — create a program row with a
    // unique id/slug.
    const seedSlugTaken = existingProgSlugs.has(p.slug);
    const count = (usedSlugs.get(p.slug) ?? 0) + 1;
    usedSlugs.set(p.slug, count);
    // First occurrence keeps the catalog slug; duplicates get a university
    // disambiguator because public.programs.slug is globally UNIQUE. A slug
    // that already belongs to a hand-written seed program is treated as a
    // collision too (different EN name, e.g. catalog "Artificial Intelligence"
    // vs seed "Artificial Intelligence (MSc)") and gets the same suffix.
    const slug = count === 1 && !seedSlugTaken ? p.slug : `${p.slug}-${p.universitySlug}`;
    programId = `p-${p.universitySlug}-${slug}`;
    newProgIdByName.set(nameKey, programId);
    studyLeoPrograms.push({
      id: programId,
      slug,
      // Only EN is available from the catalog; mirror it to all 17 locales so
      // every language shows the real name instead of an empty/fallback value.
      name: Object.fromEntries(LOCALES.map((l) => [l, p.name])),
      degreeLevel: p.degreeLevel,
      categorySlug: p.categorySlug,
      durationYears: p.durationYears,
    });
  }

  // Resolve the canonical university id (existing seed row or a new u-<slug>).
  // Prefer the exact slug map; fall back to the normalized-name map (handles
  // slug drift like seed "bezmi-alem-university" vs catalog "bezmi-alem-university").
  const uni = universities.find((x) => x.slug === p.universitySlug);
  const universityId =
    uniIdBySlug.get(p.universitySlug) ??
    (uni ? uniIdByNormName.get(norm(uni.name)) : undefined) ??
    `u-${p.universitySlug}`;

  // EVERY catalog entry gets a university_programs row. Dedupe only exact
  // universityId|programId repeats within the catalog itself (same program at
  // the same university listed twice) — a program whose name matches the seed
  // is NOT dropped.
  const upKey = `${universityId}|${programId}`;
  if (usedUpKeys.has(upKey)) continue;
  usedUpKeys.add(upKey);

  // up id is derived from universityId|programId so it is stable and can never
  // collide with the hand-written seed's `up-1`..`up-34` ids.
  const upId = `up-${universityId}-${programId}`;
  studyLeoUniversityPrograms.push({
    id: upId,
    universityId,
    programId,
    language: p.language, // 'en' | 'tr' | 'ar' | 'ru'
    tuitionFee: p.tuitionFee,
    ...(p.originalFee != null ? { originalFee: p.originalFee } : {}),
    currency: p.currency,
    scholarshipAvailable: p.originalFee != null,
  });
}

// ---------------------------------------------------------------------------
// 3. Emit the TS module.
// ---------------------------------------------------------------------------

const ser = (value, indent) => JSON.stringify(value, null, indent);

let out = `// AUTO-GENERATED from the StudyLeo catalog (scripts/data/studyleo-catalog.json).
// Do not edit by hand. Regenerate with:
//   npm run scrape:studyleo && node scripts/generate-seed-from-catalog.mjs
//
// Import is RELATIVE ('../../types') on purpose: scripts/seed-content.ts runs
// under tsx, which does not resolve the '@/' path alias.
import type { City, Program, University, UniversityProgram } from '../../types';

/**
 * StudyLeo-only universities. Currently empty: every university in the catalog
 * is already present in the hand-written src/lib/seed/universities.ts (matched
 * by name or slug). Rows for these are inserted into the DB by the existing
 * seedUniversities; this array exists so new catalog universities automatically
 * flow through the same pipeline.
 *
 * Placeholder fields (catalog has no data): foundedYear 1998, studentCount 0,
 * ranking 999 (sorts to the end of /universities), tagline/description empty,
 * heroImage points at the scraped local file, gallery empty.
 */
export const studyLeoUniversities: University[] = ${ser(studyLeoUniversities, 2)};

/**
 * StudyLeo-only programs (EN name only). A catalog program whose EN name
 * already exists in seedPrograms is NOT emitted here — its university_programs
 * rows reference the existing seed program id instead. Only genuinely-new
 * program names create rows in this array. Slugs are globally unique in the
 * DB, so repeated catalog slugs get a '-<universitySlug>' suffix after the
 * first use.
 */
export const studyLeoPrograms: Program[] = ${ser(studyLeoPrograms, 2)};

/**
 * StudyLeo university↔program rows with real tuition data. ONE row per
 * catalog entry (all ~4,134 university×program pairs), deduped only by exact
 * universityId|programId repeats within the catalog. programId references
 * either an existing seedPrograms row or a new studyLeoPrograms row.
 * Only the non-en locales need the UI; name localization falls back to the EN
 * name (name[locale] renders the missing locale as the raw key — see the
 * university detail table).
 */
export const studyLeoUniversityPrograms: UniversityProgram[] = ${ser(studyLeoUniversityPrograms, 2)};

/**
 * New cities discovered in the catalog (cityName not in seedCities).
 * Empty today: every catalog city already exists in src/lib/seed/cities.ts.
 */
export const studyLeoCities: City[] = ${ser(newCities, 2)};

/** Scraped logo file paths keyed by university slug (for local asset use). */
export const studyLeoLogoImages: Record<string, string> = ${ser(studyLeoLogoImages, 2)};
`;

// Trim JSON.stringify's blank-line noise for compactness — keep it readable.
out = out
  .split('\n')
  .map((line) => line.replace(/\s+$/g, ''))
  .join('\n')
  .replace(/\n{3,}/g, '\n\n');

const target = join(seedDir, 'studyleo-catalog.ts');
writeFileSync(target, out, 'utf8');

console.log(`✓ wrote ${target}`);
console.log(`  universities kept (new):   ${studyLeoUniversities.length}`);
console.log(`  universities skipped:      ${universities.length - studyLeoUniversities.length}`);
console.log(`  programs kept (new):       ${studyLeoPrograms.length}`);
console.log(`  programs reusing seed id:  ${programs.length - studyLeoPrograms.length}`);
console.log(`  university_programs:       ${studyLeoUniversityPrograms.length}`);
console.log(`  new cities:                ${newCities.length}`);
console.log(`  logo images mapped:        ${Object.keys(studyLeoLogoImages).length}`);
