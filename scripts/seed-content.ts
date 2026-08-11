// scripts/seed-content.ts — Phase 3B: load `src/lib/seed/*` into the content tables
// created by `0011_content_tables.sql`. Idempotent (truncate + insert).
import { Pool } from 'pg';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  seedCountries,
  seedCities,
  seedPrograms,
  seedCategories,
  seedUniversities,
  seedUniversityPrograms,
  seedScholarships,
  seedDormitories,
  seedReviews,
  seedFaqs,
  seedBlog,
} from '../src/lib/seed';
// B7: StudyLeo catalog (68K lines) imported directly from scripts/data/ —
// kept out of src/lib/seed/ so next build doesn't parse 2.3MB of seed data.
import {
  studyLeoUniversities,
  studyLeoPrograms,
  studyLeoUniversityPrograms,
  studyLeoCities,
} from './data/studyleo-catalog';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Load .env.local / .env (mirrors migrate.ts).
for (const file of ['.env.local', '.env']) {
  const envPath = join(root, file);
  if (!existsSync(envPath)) continue;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, value] = match;
    if (process.env[key] === undefined) {
      process.env[key] = value.replace(/^["']|["']$/g, '');
    }
  }
}

// Re-export so tsx picks the .ts imports from src/lib/seed (ESM-compatible via tsconfig paths
// are NOT resolved here — import via relative path).
void [seedCountries, seedCities, seedPrograms, seedCategories, seedUniversities, seedUniversityPrograms, seedScholarships, seedDormitories, seedReviews, seedFaqs, seedBlog, studyLeoUniversities, studyLeoPrograms, studyLeoUniversityPrograms, studyLeoCities];

async function truncateAll(client: import('pg').PoolClient) {
  const tables = [
    'public.blog_posts',
    'public.faqs',
    'public.reviews',
    'public.dormitories',
    'public.scholarships',
    'public.university_programs',
    'public.universities',
    'public.programs',
    'public.program_categories',
    'public.cities',
    'public.countries',
  ];
  for (const t of tables) {
    await client.query(`truncate table ${t} restart identity cascade`);
  }
}

async function insertAll(client: import('pg').PoolClient) {
  // countries
  for (const c of seedCountries) {
    await client.query(
      `insert into public.countries (code, slug, name_i18n, flag) values ($1, $2, $3::jsonb, $4)
       on conflict (code) do nothing`,
      [c.code, c.slug, JSON.stringify(c.name), c.flag],
    );
  }

  // cities
  for (const c of [...seedCities, ...studyLeoCities]) {
    await client.query(
      `insert into public.cities (id, slug, country_code, name_i18n, monthly_living_cost_usd) values ($1, $2, $3, $4::jsonb, $5)
       on conflict (id) do nothing`,
      [c.id, c.slug, c.countryId, JSON.stringify(c.name), c.monthlyLivingCostUSD ?? null],
    );
  }

  // program_categories
  for (const cat of seedCategories) {
    await client.query(
      `insert into public.program_categories (slug, name_i18n, icon) values ($1, $2::jsonb, $3)
       on conflict (slug) do nothing`,
      [cat.slug, JSON.stringify(cat.name), cat.icon ?? null],
    );
  }

  // programs
  for (const p of [...seedPrograms, ...studyLeoPrograms]) {
    await client.query(
      `insert into public.programs (id, slug, name_i18n, degree_level, category_slug, duration_years)
       values ($1, $2, $3::jsonb, $4, $5, $6)
       on conflict (id) do nothing`,
      [p.id, p.slug, JSON.stringify(p.name), p.degreeLevel, p.categorySlug, p.durationYears],
    );
  }

  // universities
  for (const u of [...seedUniversities, ...studyLeoUniversities]) {
    await client.query(
      `insert into public.universities
         (id, slug, city_id, name, founded_year, student_count, ranking, accreditation,
          is_state, logo_text, hero_image, gallery, tagline_i18n, description_i18n, languages, featured)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb, $14::jsonb, $15, $16)
       on conflict (id) do nothing`,
      [
        u.id, u.slug, u.cityId, u.name, u.foundedYear, u.studentCount, u.ranking, u.accreditation,
        u.isState, u.logoText, u.heroImage, u.gallery, JSON.stringify(u.tagline), JSON.stringify(u.description),
        u.languages, u.featured ?? false,
      ],
    );
  }

  // university_programs
  for (const up of [...seedUniversityPrograms, ...studyLeoUniversityPrograms]) {
    await client.query(
      `insert into public.university_programs
         (id, university_id, program_id, language, tuition_fee, original_fee, currency, scholarship_available)
       values ($1, $2, $3, $4, $5, $6, $7, $8)
       on conflict (id) do nothing`,
      [up.id, up.universityId, up.programId, up.language, up.tuitionFee, up.originalFee ?? null, up.currency, up.scholarshipAvailable],
    );
  }

  // scholarships
  for (const s of seedScholarships) {
    await client.query(
      `insert into public.scholarships (id, university_id, name_i18n, percentage, requirements_i18n)
       values ($1, $2, $3::jsonb, $4, $5::jsonb)
       on conflict (id) do nothing`,
      [s.id, s.universityId, JSON.stringify(s.name), s.percentage, JSON.stringify(s.requirements)],
    );
  }

  // dormitories
  for (const d of seedDormitories) {
    await client.query(
      `insert into public.dormitories (id, university_id, capacity, price_per_month, currency, photos)
       values ($1, $2, $3, $4, $5, $6)
       on conflict (id) do nothing`,
      [d.id, d.universityId, d.capacity, d.pricePerMonth, d.currency, d.photos],
    );
  }

  // reviews
  for (const r of seedReviews) {
    await client.query(
      `insert into public.reviews
         (id, university_id, author_name, author_country, author_initials, rating, text_i18n,
          verified, program_studied_i18n, year)
       values ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9::jsonb, $10)
       on conflict (id) do nothing`,
      [
        r.id, r.universityId, r.authorName, r.authorCountry, r.authorInitials, r.rating,
        JSON.stringify(r.text), r.verified, JSON.stringify(r.programStudied), r.year,
      ],
    );
  }

  // faqs
  for (const f of seedFaqs) {
    await client.query(
      `insert into public.faqs (id, entity_type, entity_id, question_i18n, answer_i18n)
       values ($1, $2, $3, $4::jsonb, $5::jsonb)
       on conflict (id) do nothing`,
      [f.id, f.entityType, f.entityId, JSON.stringify(f.question), JSON.stringify(f.answer)],
    );
  }

  // blog_posts
  for (const b of seedBlog) {
    await client.query(
      `insert into public.blog_posts
         (id, slug, title_i18n, excerpt_i18n, content_i18n, author, published_at,
          cover_image, category_i18n, reading_minutes)
       values ($1, $2, $3::jsonb, $4::jsonb, $5::jsonb, $6, $7, $8, $9::jsonb, $10)
       on conflict (id) do nothing`,
      [
        b.id, b.slug, JSON.stringify(b.title), JSON.stringify(b.excerpt), JSON.stringify(b.content),
        b.author, b.publishedAt, b.coverImage, JSON.stringify(b.category), b.readingMinutes,
      ],
    );
  }
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  const pool = new Pool({ connectionString: url });
  const client = await pool.connect();
  try {
    console.log('→ seeding content tables');
    // C5: truncate + insert must be atomic — a partial failure must not leave
    // the content tables empty. Wrap both in a single transaction.
    await client.query('begin');
    try {
      await truncateAll(client);
      await insertAll(client);
      await client.query('commit');
    } catch (err) {
      await client.query('rollback');
      throw err;
    }
    console.log('✓ content seeded');
  } finally {
    client.release();
    await pool.end();
  }
}

// Run if invoked directly. Also export for compose with migrate.ts.
const invokedDirect = (() => {
  try {
    return import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('seed-content.ts');
  } catch {
    return false;
  }
})();

if (invokedDirect) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export { main as seedContent };
// silence unused (readdirSync kept for future expansion of env file glob)
void readdirSync;