import { unstable_cache } from "next/cache";
import { data } from "@/lib/data";
import { getCachedCities } from "@/lib/universities/listing-data";
import type { ProgramListingFilters } from "@/lib/data/repositories";

export { getCachedCities };

// PERF: the /programs page is dynamic (reads searchParams), so ISR never
// caches its HTML. These wrappers cache the DATA instead — after the first
// request per (page × filters) combination the page renders without touching
// Postgres. Same pattern as the universities listing (Phase 1).
export const getCachedProgramCategories = unstable_cache(
  () => data.programs.getCategories(),
  ["program-categories"],
  { revalidate: 3600, tags: ["program-categories"] },
);

export const getCachedProgramListingPage = unstable_cache(
  (page: number, perPage: number, filters: ProgramListingFilters = {}) =>
    data.programs.listPage(page, perPage, filters),
  ["programs-listing"],
  { revalidate: 3600, tags: ["programs-listing"] },
);
