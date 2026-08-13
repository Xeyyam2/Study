import { getPool } from "@/lib/db";
import { createSeedDataLayer } from "./seed-repository";
import { createPgDataLayer } from "./pg-data-repository";
import type { DataLayer } from "./repositories";

/**
 * Single data-access entry point.
 *
 * When `DATABASE_URL` is set (local Docker Postgres or Supabase), the marketing/
 * public read layer uses a Postgres-backed repository seeded from `src/lib/seed`.
 * Otherwise it falls back to the in-memory seed layer (useful for quick tests).
 */
// BE-1: one shared pool for the whole app (see src/lib/db.ts).
export const getSharedPool = getPool;

function createDataLayer(): DataLayer {
  if (process.env.DATABASE_URL) return createPgDataLayer(getSharedPool);
  return createSeedDataLayer();
}

export const data: DataLayer = createDataLayer();

export type { DataLayer } from "./repositories";
export type {
  UniversityRepository,
  CityRepository,
  CountryRepository,
  ProgramRepository,
  ReviewRepository,
  FaqRepository,
  ScholarshipRepository,
  BlogRepository,
} from "./repositories";
