// scripts/migrate.ts
import { Pool } from 'pg';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const migrationsDir = join(root, 'supabase', 'migrations');
const seedPath = join(root, 'supabase', 'seed.sql');

// Skip locally: require Supabase auth schema. 0007 is manual-only (Phase 2B), never auto-run.
const SKIP_LOCAL = ['0005_rls.sql', '0006_auth_trigger.sql', '0007_link_profiles_to_auth_users.sql'];

async function main() {
  const args = new Set(process.argv.slice(2));
  const reset = args.has('--reset');
  const seed = args.has('--seed') || reset;

  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');

  const pool = new Pool({ connectionString: url });
  const client = await pool.connect();
  try {
    if (reset) {
      console.log('→ resetting schema');
      await client.query(`
        drop schema if exists public cascade;
        create schema public;
      `);
    }

    const files = readdirSync(migrationsDir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const skip = SKIP_LOCAL.includes(file);
      console.log(`${skip ? '↩ skip (supabase-only)' : '→ applying'} ${file}`);
      if (skip) continue;
      const sql = readFileSync(join(migrationsDir, file), 'utf8');
      await client.query(sql);
    }

    if (seed) {
      console.log('→ seeding');
      const sql = readFileSync(seedPath, 'utf8');
      await client.query(sql);
    }

    console.log('✓ done');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
