import type { DegreeLevel, University, UniversityFilters } from '@/types';

export type UniversitySort = 'relevance' | 'name' | 'tuition' | 'ranking';

type ListingQueryValue = string | string[] | undefined;
export type ListingQueryInput = Record<string, ListingQueryValue>;

export interface ParsedListingQuery {
  filters: UniversityFilters;
  sort: UniversitySort;
}

type TuitionByUniversity = Readonly<Record<string, number>> | ReadonlyMap<string, number>;

const degreeLevels: readonly DegreeLevel[] = [
  'bachelor',
  'master',
  'phd',
  'associate',
];

function valueOf(input: ListingQueryInput, key: string): string | undefined {
  const value = input[key];
  return typeof value === 'string' ? value : undefined;
}

function tuitionValue(value: string | undefined): number | undefined {
  if (value === undefined || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export function parseListingQuery(input: ListingQueryInput): ParsedListingQuery {
  const city = valueOf(input, 'city');
  const degree = valueOf(input, 'degree');
  const language = valueOf(input, 'language');
  const type = valueOf(input, 'type');
  const search = valueOf(input, 'search');
  const maxTuitionUSD = tuitionValue(valueOf(input, 'maxTuition'));
  const sortValue = valueOf(input, 'sort');
  const sort: UniversitySort =
    sortValue === 'name' ||
    sortValue === 'tuition' ||
    sortValue === 'ranking'
      ? sortValue
      : 'relevance';

  const filters: UniversityFilters = {};
  if (city) filters.citySlug = city;
  if (degreeLevels.includes(degree as DegreeLevel)) {
    filters.degreeLevel = degree as DegreeLevel;
  }
  if (language === 'en' || language === 'tr') filters.language = language;
  if (type === 'state') filters.isState = true;
  if (type === 'private') filters.isState = false;
  if (search) filters.search = search;
  if (maxTuitionUSD !== undefined) filters.maxTuitionUSD = maxTuitionUSD;

  return { filters, sort };
}

function tuitionFor(
  universityId: string,
  tuitionByUniversity: TuitionByUniversity | undefined,
): number | undefined {
  if (!tuitionByUniversity) return undefined;
  const value = tuitionByUniversity instanceof Map
    ? tuitionByUniversity.get(universityId)
    : (tuitionByUniversity as Readonly<Record<string, number>>)[universityId];
  return value !== undefined && Number.isFinite(value) && value > 0 ? value : undefined;
}

export function sortUniversities(
  universities: readonly University[],
  sort: UniversitySort,
  tuitionByUniversity?: TuitionByUniversity,
): University[] {
  return universities
    .map((university, index) => ({ university, index }))
    .sort((a, b) => {
      let comparison = 0;
      if (sort === 'name') comparison = a.university.name.localeCompare(b.university.name);
      if (sort === 'ranking') comparison = a.university.ranking - b.university.ranking;
      if (sort === 'tuition') {
        const aTuition = tuitionFor(a.university.id, tuitionByUniversity);
        const bTuition = tuitionFor(b.university.id, tuitionByUniversity);
        if (aTuition === undefined && bTuition !== undefined) return 1;
        if (aTuition !== undefined && bTuition === undefined) return -1;
        comparison = (aTuition ?? 0) - (bTuition ?? 0);
      }
      return comparison || a.index - b.index;
    })
    .map(({ university }) => university);
}
