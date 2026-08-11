import { Pool } from 'pg';
import { createSeedDataLayer } from './seed-repository';
import { createPgDataLayer } from './pg-data-repository';
import type { DataLayer } from './repositories';

/**
 * Single data-access entry point.
 *
 * When `DATABASE_URL` is set (local Docker Postgres or Supabase), the marketing/
 * public read layer uses a Postgres-backed repository seeded from `src/lib/seed`.
 * Otherwise it falls back to the in-memory seed layer (useful for quick tests).
 */
let _pool: Pool | null = null;
export function getSharedPool(): Pool {
  if (!_pool) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
    const max = Number(process.env.PGPOOL_MAX ?? 2);
    _pool = new Pool({ connectionString: process.env.DATABASE_URL, max });
    // 4.1: Prevent unhandled EventEmitter errors from crashing the process.
    _pool.on('error', (err) => {
      console.error('[data pool error]', err);
    });
  }
  return _pool;
}

function createDataLayer(): DataLayer {
  if (process.env.DATABASE_URL) return createPgDataLayer(getSharedPool);
  return createSeedDataLayer();
}

export const data: DataLayer = createDataLayer();

export type { DataLayer } from './repositories';
export type {
  UniversityRepository,
  CityRepository,
  CountryRepository,
  ProgramRepository,
  ReviewRepository,
  FaqRepository,
  ScholarshipRepository,
  BlogRepository,
} from './repositories';