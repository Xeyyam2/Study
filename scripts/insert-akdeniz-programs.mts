// Insert Akdeniz University programs into DB.
// Sources:
//  - Programs: https://yos.akdeniz.edu.tr/tr/kontenjanlar-11087 (Lisans Kontenjanları)
//  - Tuition: https://yos.akdeniz.edu.tr/tr/ogrenim_ucretleri-11088 (2025-2026 USD)
import { Pool } from "pg";
import fs from "node:fs";
import path from "node:path";

function loadEnv(file: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[m[1]] = v;
  }
  return out;
}

// Akdeniz programs: DB slug -> { tuitionUSD, language, durationYears }
// Tuition is per-faculty USD from the official 2025-2026 table.
const PROGRAMS: Record<string, { tuitionUSD: number; language: string; durationYears: number }> = {
  dentistry: { tuitionUSD: 7390, language: "tr", durationYears: 5 },
  archaeology: { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  philosophy: { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "english-language-and-literature": { tuitionUSD: 2470, language: "en", durationYears: 4 },
  psychology: { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  sociology: { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  history: { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "turkish-language-and-literature": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "english-language-teaching": { tuitionUSD: 2470, language: "en", durationYears: 4 },
  "preschool-teaching": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "special-education-teaching": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "guidance-and-psychological-counseling": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "classroom-teaching": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "turkish-language-teaching": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  biology: { tuitionUSD: 3080, language: "tr", durationYears: 4 },
  physics: { tuitionUSD: 3080, language: "tr", durationYears: 4 },
  chemistry: { tuitionUSD: 3080, language: "tr", durationYears: 4 },
  mathematics: { tuitionUSD: 3080, language: "tr", durationYears: 4 },
  nursing: { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  law: { tuitionUSD: 4060, language: "tr", durationYears: 4 },
  economics: { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "business-administration": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "political-science-and-public-administration": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "international-relations": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "islamic-sciences": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  journalism: { tuitionUSD: 2220, language: "tr", durationYears: 4 },
  "public-relations-and-advertising": { tuitionUSD: 2220, language: "tr", durationYears: 4 },
  "radio-television-and-cinema": { tuitionUSD: 2220, language: "tr", durationYears: 4 },
  advertising: { tuitionUSD: 2220, language: "tr", durationYears: 4 },
  "maritime-business-management": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "child-development": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "social-work": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "management-information-systems": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "gastronomy-and-culinary-arts": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "recreation": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "tourism-management": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "interior-architecture": { tuitionUSD: 3200, language: "tr", durationYears: 4 },
  architecture: { tuitionUSD: 3200, language: "tr", durationYears: 4 },
  "urban-and-regional-planning": { tuitionUSD: 3200, language: "tr", durationYears: 4 },
  "translation-and-interpreting": { tuitionUSD: 2470, language: "en", durationYears: 4 },
  "computer-engineering": { tuitionUSD: 5280, language: "en", durationYears: 4 },
  "environmental-engineering": { tuitionUSD: 3200, language: "tr", durationYears: 4 },
  "electrical-and-electronics-engineering": { tuitionUSD: 5280, language: "tr", durationYears: 4 },
  "food-engineering": { tuitionUSD: 3200, language: "tr", durationYears: 4 },
  "civil-engineering": { tuitionUSD: 3200, language: "tr", durationYears: 4 },
  "mechanical-engineering": { tuitionUSD: 3200, language: "tr", durationYears: 4 },
  "artificial-intelligence-and-data-engineering": { tuitionUSD: 5280, language: "en", durationYears: 4 },
  "nutrition-and-dietetics": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "physiotherapy-and-rehabilitation": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  "sports-management": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
  medicine: { tuitionUSD: 10150, language: "tr", durationYears: 6 },
  "plant-production-and-technologies": { tuitionUSD: 3200, language: "tr", durationYears: 4 },
  "agricultural-economics": { tuitionUSD: 3200, language: "tr", durationYears: 4 },
  "agricultural-machinery-and-technologies-engineering": { tuitionUSD: 3200, language: "tr", durationYears: 4 },
  "international-trade-and-logistics": { tuitionUSD: 2470, language: "tr", durationYears: 4 },
};

const env = loadEnv(path.join(process.cwd(), ".env.local"));
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 2,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

(async () => {
  const client = await pool.connect();
  try {
    const uniRes = await client.query(
      `select id from public.universities where slug = 'akdeniz-university'`
    );
    const uniId = uniRes.rows[0]?.id;
    if (!uniId) throw new Error("akdeniz-university not found");
    console.log("Akdeniz id:", uniId);

    const slugs = Object.keys(PROGRAMS);
    const progRes = await client.query(
      `select id, slug from public.programs where slug = any($1)`,
      [slugs]
    );
    const progBySlug = new Map(
      (progRes.rows as { id: string; slug: string }[]).map((r) => [r.slug, r.id])
    );

    const existingRes = await client.query(
      `select up.program_id from public.university_programs up where up.university_id = $1`,
      [uniId]
    );
    const existing = new Set((existingRes.rows as { program_id: string }[]).map((r) => r.program_id));

    let inserted = 0, skipped = 0, missing = 0;
    for (const [slug, info] of Object.entries(PROGRAMS)) {
      const programId = progBySlug.get(slug);
      if (!programId) {
        console.log("MISSING program slug:", slug);
        missing++;
        continue;
      }
      if (existing.has(programId)) {
        skipped++;
        continue;
      }
      await client.query(
        `insert into public.university_programs
           (id, university_id, program_id, language, tuition_fee, original_fee, currency, scholarship_available)
         values (gen_random_uuid()::text, $1, $2, $3, $4, null, 'USD', false)
         on conflict do nothing`,
        [uniId, programId, info.language, info.tuitionUSD]
      );
      inserted++;
    }
    console.log(`inserted: ${inserted}, dup: ${skipped}, missing: ${missing}`);
  } catch (e) {
    console.error("ERR", (e as Error).message);
  } finally {
    client.release();
    await pool.end().catch(() => {});
  }
})();
