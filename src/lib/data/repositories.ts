import type {
  BlogPost,
  City,
  Country,
  DegreeLevel,
  Faq,
  InstructionLanguage,
  Program,
  ProgramCategory,
  ProgramCombination,
  Review,
  Scholarship,
  University,
  UniversityDetail,
  UniversityFilters,
} from '@/types';

export interface UniversityListingMetadata {
  city: City | null;
  minTuitionUSD?: number;
  rating: number;
  count: number;
}

export interface UniversityRepository {
  list(filters?: UniversityFilters): Promise<University[]>;
  getFeatured(limit?: number): Promise<University[]>;
  getBySlug(slug: string): Promise<University | null>;
  getDetail(slug: string): Promise<UniversityDetail | null>;
  getRelated(slug: string, limit?: number): Promise<University[]>;
  getMinTuitionUSD(universityId: string): Promise<number>;
  getRating(universityId: string): Promise<{ rating: number; count: number }>;
  getListingMetadata(
    universityIds: readonly string[],
  ): Promise<ReadonlyMap<string, UniversityListingMetadata>>;
}

export interface CityRepository {
  list(): Promise<City[]>;
  getBySlug(slug: string): Promise<City | null>;
  getByUniversityId(universityId: string): Promise<City | null>;
}

export interface CountryRepository {
  list(): Promise<Country[]>;
  getBySlug(slug: string): Promise<Country | null>;
}

export interface ProgramCategoryDetail {
  category: ProgramCategory | null;
  programs: Array<
    Program & {
      university: University;
      city: City;
      tuitionFee: number;
      language: InstructionLanguage;
      scholarshipAvailable: boolean;
    }
  >;
  citySlugs: string[];
  universityCount: number;
  minTuitionUSD: number;
  uniqueLanguages: string[];
}

export interface ProgramRepository {
  list(): Promise<Program[]>;
  getCategories(): Promise<ProgramCategory[]>;
  getCombinations(): Promise<ProgramCombination[]>;
  /** Every university×program row (with city + tuition) — for the /programs listing. */
  getAllPrograms(): Promise<ProgramCategoryDetail['programs']>;
  getByCategory(category: string): Promise<ProgramCategoryDetail>;
  getByCategoryAndCity(
    category: string,
    citySlug: string,
  ): Promise<{
    category: ProgramCategory | null;
    city: City | null;
    programs: Array<Program & { university: University; tuitionFee: number; language: InstructionLanguage }>;
    universityCount: number;
    minTuitionUSD: number;
  }>;
}

export interface ReviewRepository {
  byUniversity(universityId: string): Promise<Review[]>;
}

export interface FaqRepository {
  general(): Promise<Faq[]>;
  byUniversity(universityId: string): Promise<Faq[]>;
}

export interface ScholarshipRepository {
  byUniversity(universityId: string): Promise<Scholarship[]>;
}

export interface BlogRepository {
  list(): Promise<BlogPost[]>;
  getBySlug(slug: string): Promise<BlogPost | null>;
}

export interface SearchRepository {
  /** Full-text + fuzzy search across universities, programs, cities. Returns ranked results. */
  search(query: string, limit?: number): Promise<SearchResult[]>;
}

export interface SearchResult {
  type: 'university' | 'program' | 'city';
  id: string;
  slug: string;
  /** Primary label (university name / program slug / city slug) — i18n resolved by the UI. */
  label: string;
  /** Optional secondary text (e.g. university accreditation, city country). */
  hint?: string;
  /** Locale-aware name when available (cities/programs have i18n; universities are plain text). */
  nameI18n?: Record<string, string>;
}

export interface DataLayer {
  universities: UniversityRepository;
  cities: CityRepository;
  countries: CountryRepository;
  programs: ProgramRepository;
  reviews: ReviewRepository;
  faqs: FaqRepository;
  scholarships: ScholarshipRepository;
  blog: BlogRepository;
  search: SearchRepository;
}

export type { DegreeLevel };
