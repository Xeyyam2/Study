import { unstable_cache } from "next/cache";
import { data } from "@/lib/data";
import type { UniversityFilters } from "@/types";

// PERF: the universities listing page is dynamic (it reads searchParams), so
// ISR never caches its HTML. These wrappers cache the DATA instead: after the
// first request per filter combination the page renders without touching
// Postgres. unstable_cache keys on all serialized arguments, so each filter
// combination gets its own entry — no cross-combination leakage. Results are
// locale-independent (i18n maps resolve at render time), so no locale in the
// key.
export const getCachedUniversityListing = unstable_cache(
  (filters: UniversityFilters) => data.universities.listWithMetadata(filters),
  ["universities-listing"],
  { revalidate: 3600, tags: ["universities-listing"] },
);

export const getCachedCities = unstable_cache(
  () => data.cities.list(),
  ["cities-list"],
  { revalidate: 3600, tags: ["cities-list"] },
);
