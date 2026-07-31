import type { AppLocale } from '@/i18n/routing';

export type LocalizedString = Partial<Record<AppLocale, string>>;

export type DegreeLevel = 'bachelor' | 'master' | 'phd' | 'associate';

export type ProgramCategorySlug =
  | 'medicine'
  | 'engineering'
  | 'computer-science'
  | 'business'
  | 'law'
  | 'architecture'
  | 'dentistry'
  | 'arts';

export interface ProgramCategory {
  slug: ProgramCategorySlug;
  name: LocalizedString;
  icon?: string;
}

export interface Country {
  code: string;
  slug: string;
  name: LocalizedString;
  flag: string;
}

export interface City {
  id: string;
  slug: string;
  name: LocalizedString;
  countryId: string;
}

export interface University {
  id: string;
  name: string;
  slug: string;
  cityId: string;
  foundedYear: number;
  studentCount: number;
  ranking: number;
  accreditation: string;
  isState: boolean;
  logoText: string;
  heroImage: string;
  gallery: string[];
  tagline: LocalizedString;
  description: LocalizedString;
  languages: string[];
  featured?: boolean;
}

export interface Program {
  id: string;
  slug: string;
  name: LocalizedString;
  degreeLevel: DegreeLevel;
  categorySlug: ProgramCategorySlug;
  durationYears: number;
}

export type InstructionLanguage = 'tr' | 'en';

export interface UniversityProgram {
  id: string;
  universityId: string;
  programId: string;
  language: InstructionLanguage;
  tuitionFee: number;
  currency: 'USD' | 'TRY';
  scholarshipAvailable: boolean;
}

export interface Scholarship {
  id: string;
  universityId: string;
  name: LocalizedString;
  percentage: number;
  requirements: LocalizedString;
}

export interface Dormitory {
  id: string;
  universityId: string;
  capacity: number;
  pricePerMonth: number;
  currency: 'USD' | 'TRY';
  photos: string[];
}

export interface Review {
  id: string;
  universityId: string;
  authorName: string;
  authorCountry: string;
  authorInitials: string;
  rating: number;
  text: LocalizedString;
  verified: boolean;
  programStudied: LocalizedString;
  year: number;
}

export type FaqEntityType = 'university' | 'general';

export interface Faq {
  id: string;
  entityType: FaqEntityType;
  entityId: string;
  question: LocalizedString;
  answer: LocalizedString;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  author: string;
  publishedAt: string;
  coverImage: string;
  category: LocalizedString;
  readingMinutes: number;
}

export interface UniversityFilters {
  citySlug?: string;
  degreeLevel?: DegreeLevel;
  language?: InstructionLanguage;
  isState?: boolean;
  search?: string;
  maxTuitionUSD?: number;
}

export interface UniversityDetail extends University {
  city?: City;
  programs: Array<UniversityProgram & { program: Program }>;
  scholarships: Scholarship[];
  dormitories: Dormitory[];
}

export interface ProgramCombination {
  categorySlug: ProgramCategorySlug;
  citySlug: string;
  programIds: string[];
  universityCount: number;
  minTuitionUSD: number;
}
