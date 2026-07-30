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

export interface UniversityRepository {
  list(filters?: UniversityFilters): Promise<University[]>;
  getFeatured(limit?: number): Promise<University[]>;
  getBySlug(slug: string): Promise<University | null>;
  getDetail(slug: string): Promise<UniversityDetail | null>;
  getRelated(slug: string, limit?: number): Promise<University[]>;
  getMinTuitionUSD(universityId: string): number;
  getRating(universityId: string): { rating: number; count: number };
}

export interface CityRepository {
  list(): Promise<City[]>;
  getBySlug(slug: string): Promise<City | null>;
  getByUniversityId(universityId: string): City | null;
}

export interface CountryRepository {
  list(): Promise<Country[]>;
  getBySlug(slug: string): Promise<Country | null>;
}

export interface ProgramRepository {
  list(): Promise<Program[]>;
  getCategories(): ProgramCategory[];
  getCombinations(): ProgramCombination[];
  getByCategoryAndCity(
    category: string,
    citySlug: string,
  ): {
    category: ProgramCategory | null;
    city: City | null;
    programs: Array<Program & { university: University; tuitionFee: number; language: InstructionLanguage }>;
    universityCount: number;
    minTuitionUSD: number;
  };
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

export interface DataLayer {
  universities: UniversityRepository;
  cities: CityRepository;
  countries: CountryRepository;
  programs: ProgramRepository;
  reviews: ReviewRepository;
  faqs: FaqRepository;
  scholarships: ScholarshipRepository;
  blog: BlogRepository;
}

export type { DegreeLevel };
