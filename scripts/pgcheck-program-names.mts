// Check program names in DB for common engineering/medicine programs.
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

const env = loadEnv(path.join(process.cwd(), ".env.local"));
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 2,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

(async () => {
  try {
    const r = await pool.query(
      `select p.slug, p.degree_level, p.name_i18n->>'en' as name_en
       from public.programs p
       where p.slug in (
         'computer-engineering','medicine','law','nursing','architecture',
         'civil-engineering','mechanical-engineering','electrical-engineering',
         'business-administration','economics','psychology','mathematics',
         'physics','chemistry','biology','history','philosophy',
         'english-language-and-literature','turkish-language-and-literature',
         'translation-and-interpreting','dentistry','pharmacy','veterinary-medicine',
         'agricultural-engineering','food-engineering','software-engineering',
         'industrial-engineering','mechatronics-engineering',
         'molecular-biology-and-genetics','political-science-and-public-administration',
         'international-relations','public-relations-and-advertising',
         'visual-communication-design','gastronomy-and-culinary-arts',
         'tourism-management','sociology','turkish-language-teaching',
         'english-language-teaching','preschool-teaching','classroom-teaching',
         'guidance-and-psychological-counseling','science-teaching',
         'elementary-mathematics-teaching','aviation-management',
         'aircraft-maintenance-and-repair','occupational-health-and-safety',
         'social-work','midwifery','physiotherapy-and-rehabilitation',
         'nutrition-and-dietetics','health-management','sports-sciences',
         'coaching-education','recreation','music','fine-arts','painting','sculpture'
       )
       order by p.slug`
    );
    console.log(`found ${r.rows.length} matches:`);
    for (const row of r.rows) {
      console.log(`${row.slug} (${row.degree_level}) = ${row.name_en}`);
    }
  } catch (e) {
    console.error("ERR", (e as Error).message);
  } finally {
    await pool.end().catch(() => {});
  }
})();
