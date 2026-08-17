// Check which university slugs exist in the DB and whether logos resolve.
// Minimal: parse .env.local manually (no dotenv dependency).
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

function loadEnv(file) {
  const out = {};
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
if (!url) {
  console.error("no DATABASE_URL in .env.local");
  process.exit(1);
}
console.log("host:", url.split("@")[1].split("/")[0]);

const { universityLogoImages } = require("../src/lib/seed/university-images");

const pool = new Pool({
  connectionString: url,
  max: 2,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

(async () => {
  try {
    const r = await pool.query(
      `select u.slug, u.logo_text, u.is_state
       from public.universities u
       order by u.slug`
    );
    const rows = r.rows;
    console.log("total universities:", rows.length);
    const state = rows.filter((x) => x.is_state);
    console.log("state universities:", state.length);
    console.log("\n-- state universities with logo mapping --");
    for (const x of state) {
      const mapped = universityLogoImages[x.slug];
      console.log(
        `${mapped ? "LOGO" : "MISS"} ${x.slug} (logo_text=${x.logo_text})`
      );
    }
    console.log("\n-- universities in logo map but NOT in DB --");
    const dbSlugs = new Set(rows.map((x) => x.slug));
    for (const s of Object.keys(universityLogoImages)) {
      if (!dbSlugs.has(s)) console.log("EXTRA", s);
    }
  } catch (e) {
    console.error("ERR", e.message);
  } finally {
    await pool.end().catch(() => {});
  }
})();
