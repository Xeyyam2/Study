import { createSeedDataLayer } from './seed-repository';
import type { DataLayer } from './repositories';

/**
 * Single data-access entry point.
 *
 * Today this returns the in-memory seed layer. To switch to Supabase in a
 * later phase, implement `createSupabaseDataLayer()` and swap it here —
 * no UI code needs to change because everything consumes the `DataLayer`
 * interface from `./repositories`.
 */
function createDataLayer(): DataLayer {
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
