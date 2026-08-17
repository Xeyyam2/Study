// Check what programs exist in the DB and which universities have none.
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
    // Total programs
    const p = await pool.query(`select count(*)::int c from public.programs`);
    console.log("total programs in DB:", p.rows[0].c);

    // Sample programs
    const s = await pool.query(`select slug, degree_level from public.programs order by slug limit 30`);
    console.log("\nsample programs:");
    for (const r of s.rows) console.log(`  ${r.slug} (${r.degree_level})`);

    // State universities with 0 programs
    const z = await pool.query(
      `select u.slug, u.name from public.universities u
       where u.is_state = true
       and not exists (select 1 from public.university_programs up where up.university_id = u.id)
       order by u.slug`
    );
    console.log("\nstate universities with 0 programs:", z.rows.length);
    for (const r of z.rows) console.log(`  ${r.slug}`);
  } catch (e) {
    console.error("ERR", (e as Error).message);
  } finally {
    await pool.end().catch(() => {});
  }
})();
