// Dump all bachelor programs from DB to a JSON for mapping.
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
      `select p.slug, p.name_i18n->>'en' as name_en, p.name_i18n->>'tr' as name_tr
       from public.programs p
       where p.degree_level = 'bachelor'
       order by p.slug`
    );
    fs.writeFileSync(
      "bachelor-programs.json",
      JSON.stringify(r.rows, null, 1)
    );
    console.log("bachelor programs:", r.rows.length);
    // Print TR names for matching
    for (const row of r.rows as { slug: string; name_en: string; name_tr?: string }[]) {
      console.log(`${row.slug}\t${row.name_en}\t${row.name_tr ?? ""}`);
    }
  } catch (e) {
    console.error("ERR", (e as Error).message);
  } finally {
    await pool.end().catch(() => {});
  }
})();
