// Insert Kocaeli University programs into DB.
// Data source: Kocaeli University official YÃ–S 2026-2027 PDF.
// https://api.kocaeli.edu.tr/api/FileOperation/OpenFile?filePath=1125/Document/Files/2026/06/20260609_a78f9_yos-2026-2027-kontenjan-ve-ucretler2-f23.pdf
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

// Kocaeli programs: DB program slug -> { tuitionTRY, language, durationYears }
const PROGRAMS: Record<string, { tuitionTRY: number; language: string; durationYears: number }> = {
  "maritime-business-management": { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  dentistry: { tuitionTRY: 400000, language: "tr", durationYears: 5 },
  "mathematics-teaching-for-elementary-schools": { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  "english-language-teaching": { tuitionTRY: 129600, language: "en", durationYears: 4 },
  "preschool-teaching": { tuitionTRY: 129600, language: "tr", durationYears: 4 },
  "guidance-and-psychological-counseling": { tuitionTRY: 129600, language: "tr", durationYears: 4 },
  "classroom-teaching": { tuitionTRY: 129600, language: "tr", durationYears: 4 },
  "turkish-language-teaching": { tuitionTRY: 129600, language: "tr", durationYears: 4 },
  archaeology: { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  biology: { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  philosophy: { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  physics: { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  "english-language-and-literature": { tuitionTRY: 64800, language: "en", durationYears: 4 },
  chemistry: { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  mathematics: { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  history: { tuitionTRY: 33210, language: "tr", durationYears: 4 },
  "turkish-language-and-literature": { tuitionTRY: 33210, language: "tr", durationYears: 4 },
  "artificial-intelligence-and-machine-learning": { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  "aviation-electrical-and-electronics": { tuitionTRY: 243000, language: "tr", durationYears: 4 },
  "aerospace-engineering": { tuitionTRY: 243000, language: "tr", durationYears: 4 },
  "aviation-management": { tuitionTRY: 243000, language: "tr", durationYears: 4 },
  "aircraft-maintenance-and-repair": { tuitionTRY: 243000, language: "tr", durationYears: 4 },
  law: { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  "islamic-sciences": { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  journalism: { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  "visual-communication-design": { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  "public-relations-and-advertising": { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  "radio-television-and-cinema": { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  advertising: { tuitionTRY: 64800, language: "tr", durationYears: 4 },
  "business-administration": { tuitionTRY: 97200, language: "en", durationYears: 4 },
  "interior-architecture": { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  architecture: { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  "computer-engineering": { tuitionTRY: 180000, language: "tr", durationYears: 4 },
  "environmental-engineering": { tuitionTRY: 180000, language: "en", durationYears: 4 },
  "electrical-engineering": { tuitionTRY: 180000, language: "tr", durationYears: 4 },
  "electrical-and-electronics-engineering": { tuitionTRY: 180000, language: "en", durationYears: 4 },
  "industrial-engineering": { tuitionTRY: 180000, language: "tr", durationYears: 4 },
  "geomatics-engineering": { tuitionTRY: 180000, language: "tr", durationYears: 4 },
  "civil-engineering": { tuitionTRY: 180000, language: "en", durationYears: 4 },
  "chemical-engineering": { tuitionTRY: 180000, language: "en", durationYears: 4 },
  "mechanical-engineering": { tuitionTRY: 180000, language: "en", durationYears: 4 },
  "mechatronics-engineering": { tuitionTRY: 180000, language: "en", durationYears: 4 },
  "metallurgy-and-materials-engineering": { tuitionTRY: 180000, language: "tr", durationYears: 4 },
  "software-engineering": { tuitionTRY: 180000, language: "en", durationYears: 4 },
  midwifery: { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  nursing: { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  "social-work": { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  economics: { tuitionTRY: 97200, language: "en", durationYears: 4 },
  "political-science-and-public-administration": { tuitionTRY: 64800, language: "en", durationYears: 4 },
  "international-relations": { tuitionTRY: 64800, language: "en", durationYears: 4 },
  "information-systems-engineering": { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  "biomedical-engineering": { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  "energy-systems-engineering": { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  "automotive-engineering": { tuitionTRY: 162000, language: "tr", durationYears: 4 },
  medicine: { tuitionTRY: 600000, language: "tr", durationYears: 6 },
  "gastronomy-and-culinary-arts": { tuitionTRY: 35640, language: "tr", durationYears: 4 },
  "tourism-management": { tuitionTRY: 35640, language: "tr", durationYears: 4 },
  "plant-production-and-technologies": { tuitionTRY: 53460, language: "tr", durationYears: 4 },
};

// Labour economics (Ã‡alÄ±ÅŸma Ekonomisi ve EndÃ¼stri Ä°liÅŸkileri) has no direct match; skip or map.
// BahÃ§e Bitkileri -> plant-production-and-technologies (closest)
// Bitki Koruma -> no match; skip

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
    // Find Kocaeli university
    const uniRes = await client.query(
      `select id from public.universities where slug = 'kocaeli-university'`
    );
    const uniId = uniRes.rows[0]?.id;
    if (!uniId) throw new Error("kocaeli-university not found in DB");
    console.log("Kocaeli id:", uniId);

    // Fetch all program ids by slug
    const slugs = Object.keys(PROGRAMS);
    const progRes = await client.query(
      `select id, slug from public.programs where slug = any($1)`,
      [slugs]
    );
    const progBySlug = new Map(
      (progRes.rows as { id: string; slug: string }[]).map((r) => [r.slug, r.id])
    );

    // Existing university_programs (avoid duplicates)
    const existingRes = await client.query(
      `select up.program_id from public.university_programs up
       where up.university_id = $1`,
      [uniId]
    );
    const existing = new Set((existingRes.rows as { program_id: string }[]).map((r) => r.program_id));

    let inserted = 0;
    let skipped = 0;
    let missing = 0;
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
         values
           (gen_random_uuid()::text, $1, $2, $3, $4, null, 'TRY', false)
         on conflict do nothing`,
        [uniId, programId, info.language, info.tuitionTRY]
      );
      inserted++;
    }
    console.log(`\ninserted: ${inserted}, skipped(dup): ${skipped}, missing program slug: ${missing}`);
  } catch (e) {
    console.error("ERR", (e as Error).message);
  } finally {
    client.release();
    await pool.end().catch(() => {});
  }
})();
