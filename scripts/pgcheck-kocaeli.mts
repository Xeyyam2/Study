// Check Kocaeli programs in DB and what logoImage resolves to.
import { Pool } from "pg";
import fs from "node:fs";
import path from "node:path";
import { universityLogoImages } from "../src/lib/seed/university-images";

function loadEnv(file: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

const env = loadEnv(path.join(process.cwd(), ".env.local"));
const url = env.DATABASE_URL;
const pool = new Pool({
  connectionString: url,
  max: 2,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

(async () => {
  try {
    const r = await pool.query(
      `select u.slug, u.name, count(up.id)::int program_count
       from public.universities u
       left join public.university_programs up on up.university_id = u.id
       where u.slug = 'kocaeli-university'
       group by u.slug, u.name`
    );
    console.log("kocaeli row:", r.rows);
    console.log("logoImage:", universityLogoImages["kocaeli-university"]);

    // Check the exact query the programs page uses for kocaeli rows.
    const items = await pool.query(
      `select u.id u_id, u.slug u_slug, u.name u_name
       from public.university_programs up
       join public.programs p on p.id = up.program_id
       join public.universities u on u.id = up.university_id
       join public.cities c on c.id = u.city_id
       where u.slug = 'kocaeli-university'
       limit 3`
    );
    console.log("\nprogram rows:", items.rows);
  } catch (e) {
    console.error("ERR", (e as Error).message);
  } finally {
    await pool.end().catch(() => {});
  }
})();
