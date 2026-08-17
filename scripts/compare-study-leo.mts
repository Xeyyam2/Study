// Compare StudyLeo universities against our DB.
// Scrape StudyLeo /en/universities page for all university slugs + names + logos.
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

// StudyLeo slugs we know exist (from their site). We'll scrape the full list.
const STUDYLEO_UNIVERSITIES_URL = "https://www.studyleo.com/en/universities";

async function scrapeStudyLeoUniversities() {
  const res = await fetch(STUDYLEO_UNIVERSITIES_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (study-site-compare)" },
    redirect: "follow",
  });
  const text = await res.text();
  // JSON-LD ItemList entries: {"@type":"CollegeOrUniversity","name":"X","url":".../universities/slug",...}
  const items: { name: string; slug: string }[] = [];
  const re =
    /\{"@type":"ListItem","position":\d+,"item":\{"@type":"CollegeOrUniversity","@id":"https:\/\/www\.studyleo\.com\/en\/universities\/([^"#]+)#university","name":"([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    items.push({ slug: m[1], name: m[2] });
  }
  return items;
}

(async () => {
  const env = loadEnv(path.join(process.cwd(), ".env.local"));
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: 2,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    const [studyLeo, dbRes] = await Promise.all([
      scrapeStudyLeoUniversities(),
      pool.query(
        `select u.slug, u.name, count(up.id)::int program_count
         from public.universities u
         left join public.university_programs up on up.university_id = u.id
         group by u.slug, u.name
         order by u.slug`
      ),
    ]);

    const db = new Map(
      (dbRes.rows as { slug: string; name: string; program_count: number }[]).map(
        (r) => [r.slug, r]
      )
    );

    console.log("StudyLeo universities:", studyLeo.length);
    console.log("Our DB universities:", db.size);
    console.log("\n== StudyLeo universities NOT in our DB ==");
    for (const s of studyLeo) {
      if (!db.has(s.slug)) {
        console.log(`MISSING ${s.slug} — ${s.name}`);
      }
    }
    console.log("\n== In both, but our program_count == 0 ==");
    for (const s of studyLeo) {
      const ours = db.get(s.slug);
      if (ours && ours.program_count === 0) {
        console.log(`ZERO ${s.slug} — ${s.name}`);
      }
    }
    console.log("\n== In our DB but NOT StudyLeo ==");
    for (const [slug, r] of db) {
      if (!studyLeo.some((s) => s.slug === slug)) {
        console.log(`EXTRA ${slug} — ${r.name} (${r.program_count} programs)`);
      }
    }
  } catch (e) {
    console.error("ERR", (e as Error).message);
  } finally {
    await pool.end().catch(() => {});
  }
})();
