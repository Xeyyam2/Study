// Find teaching-related program slugs.
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
      `select slug, name_i18n->>'en' as en from public.programs
       where slug ilike '%teach%' or slug ilike '%science%' or slug ilike '%math%'
       order by slug`
    );
    console.log(r.rows.length, "rows");
    for (const row of r.rows as { slug: string; en: string }[]) {
      console.log(`${row.slug}\t${row.en}`);
    }
  } catch (e) {
    console.error("ERR", (e as Error).message);
  } finally {
    await pool.end().catch(() => {});
  }
})();
