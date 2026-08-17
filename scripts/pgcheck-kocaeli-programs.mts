// Verify Kocaeli programs in DB.
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
      `select p.name_i18n->>'en' as name, up.language, up.tuition_fee, up.currency
       from public.university_programs up
       join public.programs p on p.id = up.program_id
       join public.universities u on u.id = up.university_id
       where u.slug = 'kocaeli-university'
       order by p.name_i18n->>'en'`
    );
    console.log(`Kocaeli programs: ${r.rows.length}`);
    for (const row of r.rows as { name: string; language: string; tuition_fee: number; currency: string }[]) {
      console.log(`${row.name} | ${row.language} | ${row.tuition_fee} ${row.currency}`);
    }
  } catch (e) {
    console.error("ERR", (e as Error).message);
  } finally {
    await pool.end().catch(() => {});
  }
})();
