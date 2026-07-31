import type {
  BlogPost,
  City,
  Country,
  Dormitory,
  Faq,
  Program,
  ProgramCategory,
  ProgramCombination,
  Review,
  Scholarship,
  University,
  UniversityDetail,
  UniversityFilters,
  UniversityProgram,
} from '@/types';
import {
  seedBlog,
  seedCities,
  seedCountries,
  seedDormitories,
  seedFaqs,
  seedPrograms,
  seedReviews,
  seedScholarships,
  seedUniversities,
  seedUniversityPrograms,
  seedCategories,
} from '@/lib/seed';
import type {
  BlogRepository,
  CityRepository,
  CountryRepository,
  DataLayer,
  FaqRepository,
  ProgramRepository,
  ReviewRepository,
  ScholarshipRepository,
  UniversityRepository,
} from './repositories';

const delay = <T>(value: T): Promise<T> => Promise.resolve(value);

class SeedUniversityRepository implements UniversityRepository {
  async list(filters: UniversityFilters = {}): Promise<University[]> {
    const cityBySlug = new Map(seedCities.map((c) => [c.slug, c.id]));

    return delay(
      seedUniversities.filter((u) => {
        if (filters.citySlug && u.cityId !== cityBySlug.get(filters.citySlug))
          return false;
        if (typeof filters.isState === 'boolean' && u.isState !== filters.isState)
          return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          if (!u.name.toLowerCase().includes(q) && !u.slug.includes(q))
            return false;
        }
        if (filters.degreeLevel) {
          const has = seedUniversityPrograms.some((up) => {
            if (up.universityId !== u.id) return false;
            const p = seedPrograms.find((pr) => pr.id === up.programId);
            return p?.degreeLevel === filters.degreeLevel;
          });
          if (!has) return false;
        }
        if (filters.language) {
          const has =
            u.languages.includes(filters.language) ||
            seedUniversityPrograms.some(
              (up) =>
                up.universityId === u.id && up.language === filters.language,
            );
          if (!has) return false;
        }
        if (filters.maxTuitionUSD !== undefined) {
          const min = seedUniversityPrograms
            .filter((up) => up.universityId === u.id && up.currency === 'USD')
            .map((up) => up.tuitionFee);
          const m = min.length ? Math.min(...min) : 0;
          if (m > filters.maxTuitionUSD) return false;
        }
        return true;
      }),
    );
  }

  async getFeatured(limit = 4): Promise<University[]> {
    return delay(
      seedUniversities.filter((u) => u.featured).slice(0, limit),
    );
  }

  async getBySlug(slug: string): Promise<University | null> {
    return delay(seedUniversities.find((u) => u.slug === slug) ?? null);
  }

  async getDetail(slug: string): Promise<UniversityDetail | null> {
    const university = await this.getBySlug(slug);
    if (!university) return null;

    const city = seedCities.find((c) => c.id === university.cityId) ?? undefined;
    const programs = this._programsFor(university.id);
    const scholarships = seedScholarships.filter(
      (s) => s.universityId === university.id,
    );
    const dormitories = seedDormitories.filter(
      (d) => d.universityId === university.id,
    );

    return delay({
      ...university,
      city,
      programs,
      scholarships,
      dormitories,
    });
  }

  async getRelated(slug: string, limit = 3): Promise<University[]> {
    const current = await this.getBySlug(slug);
    if (!current) return delay([]);
    const sameCity = seedUniversities.filter(
      (u) => u.cityId === current.cityId && u.id !== current.id,
    );
    const others = seedUniversities.filter(
      (u) => u.id !== current.id && u.cityId !== current.cityId,
    );
    return delay([...sameCity, ...others].slice(0, limit));
  }

  getMinTuitionUSD(universityId: string): Promise<number> {
    const fees = seedUniversityPrograms
      .filter((up) => up.universityId === universityId && up.currency === 'USD')
      .map((up) => up.tuitionFee);
    return Promise.resolve(fees.length ? Math.min(...fees) : 0);
  }

  async getRating(universityId: string): Promise<{ rating: number; count: number }> {
    const rs = seedReviews.filter((r) => r.universityId === universityId);
    if (!rs.length) return { rating: 0, count: 0 };
    const sum = rs.reduce((acc, r) => acc + r.rating, 0);
    return { rating: Math.round((sum / rs.length) * 10) / 10, count: rs.length };
  }

  private _programsFor(universityId: string) {
    return seedUniversityPrograms
      .filter((up) => up.universityId === universityId)
      .map((up) => ({
        ...up,
        program: seedPrograms.find((p) => p.id === up.programId)!,
      }))
      .filter((up) => Boolean(up.program))
      .sort((a, b) => a.tuitionFee - b.tuitionFee);
  }
}

class SeedCityRepository implements CityRepository {
  async list(): Promise<City[]> {
    return delay(seedCities);
  }
  async getBySlug(slug: string): Promise<City | null> {
    return delay(seedCities.find((c) => c.slug === slug) ?? null);
  }
  async getByUniversityId(universityId: string): Promise<City | null> {
    const u = seedUniversities.find((un) => un.id === universityId);
    if (!u) return null;
    return seedCities.find((c) => c.id === u.cityId) ?? null;
  }
}

class SeedCountryRepository implements CountryRepository {
  async list(): Promise<Country[]> {
    return delay(seedCountries);
  }
  async getBySlug(slug: string): Promise<Country | null> {
    return delay(seedCountries.find((c) => c.slug === slug) ?? null);
  }
}

class SeedProgramRepository implements ProgramRepository {
  async list(): Promise<Program[]> {
    return delay(seedPrograms);
  }
  async getCategories(): Promise<ProgramCategory[]> {
    return Promise.resolve(seedCategories);
  }

  async getCombinations(): Promise<ProgramCombination[]> {
    const map = new Map<string, ProgramCombination>();
    const universities = new Set<string>();
    for (const up of seedUniversityPrograms) {
      const program = seedPrograms.find((p) => p.id === up.programId);
      const uni = seedUniversities.find((u) => u.id === up.universityId);
      if (!program || !uni) continue;
      const city = seedCities.find((c) => c.id === uni.cityId);
      if (!city) continue;
      const key = `${program.categorySlug}|${city.slug}`;
      const existing = map.get(key);
      if (existing) {
        if (!existing.programIds.includes(program.id))
          existing.programIds.push(program.id);
        universities.add(uni.id);
        existing.universityCount = Math.max(
          existing.universityCount,
          this._uniCountFor(program.categorySlug, city.slug),
        );
        existing.minTuitionUSD = Math.min(existing.minTuitionUSD, up.tuitionFee);
      } else {
        map.set(key, {
          categorySlug: program.categorySlug,
          citySlug: city.slug,
          programIds: [program.id],
          universityCount: this._uniCountFor(program.categorySlug, city.slug),
          minTuitionUSD: up.tuitionFee,
        });
      }
    }
    return Array.from(map.values());
  }
  private _uniCountFor(category: string, citySlug: string): number {
    const city = seedCities.find((c) => c.slug === citySlug);
    if (!city) return 0;
    const uniIds = new Set<string>();
    for (const up of seedUniversityPrograms) {
      const p = seedPrograms.find((pr) => pr.id === up.programId);
      const u = seedUniversities.find((un) => un.id === up.universityId);
      if (p?.categorySlug === category && u?.cityId === city.id)
        uniIds.add(u.id);
    }
    return uniIds.size;
  }
  async getByCategoryAndCity(category: string, citySlug: string): Promise<{
    category: ProgramCategory | null;
    city: City | null;
    programs: Array<Program & { university: University; tuitionFee: number; language: import('@/types').InstructionLanguage }>;
    universityCount: number;
    minTuitionUSD: number;
  }> {
    const cat = seedCategories.find((c) => c.slug === category) ?? null;
    const city = seedCities.find((c) => c.slug === citySlug) ?? null;
    if (!city) {
      return {
        category: cat,
        city: null,
        programs: [],
        universityCount: 0,
        minTuitionUSD: 0,
      };
    }
    const items = seedUniversityPrograms
      .filter((up) => {
        const p = seedPrograms.find((pr) => pr.id === up.programId);
        const u = seedUniversities.find((un) => un.id === up.universityId);
        return p?.categorySlug === category && u?.cityId === city.id;
      })
      .map((up) => {
        const program = seedPrograms.find((p) => p.id === up.programId)!;
        const university = seedUniversities.find(
          (u) => u.id === up.universityId,
        )!;
        return {
          ...program,
          university,
          tuitionFee: up.tuitionFee,
          language: up.language,
        };
      })
      .sort((a, b) => a.tuitionFee - b.tuitionFee);

    return {
      category: cat,
      city,
      programs: items,
      universityCount: new Set(items.map((i) => i.university.id)).size,
      minTuitionUSD: items.length ? items[0].tuitionFee : 0,
    };
  }
}

class SeedReviewRepository implements ReviewRepository {
  async byUniversity(universityId: string): Promise<Review[]> {
    return delay(
      seedReviews.filter((r) => r.universityId === universityId),
    );
  }
}

class SeedFaqRepository implements FaqRepository {
  async general(): Promise<Faq[]> {
    return delay(seedFaqs.filter((f) => f.entityType === 'general'));
  }
  async byUniversity(universityId: string): Promise<Faq[]> {
    return delay(
      seedFaqs.filter(
        (f) => f.entityType === 'university' && f.entityId === universityId,
      ),
    );
  }
}

class SeedScholarshipRepository implements ScholarshipRepository {
  async byUniversity(universityId: string): Promise<Scholarship[]> {
    return delay(
      seedScholarships.filter((s) => s.universityId === universityId),
    );
  }
}

class SeedBlogRepository implements BlogRepository {
  async list(): Promise<BlogPost[]> {
    return delay(
      [...seedBlog].sort((a, b) =>
        b.publishedAt.localeCompare(a.publishedAt),
      ),
    );
  }
  async getBySlug(slug: string): Promise<BlogPost | null> {
    return delay(seedBlog.find((b) => b.slug === slug) ?? null);
  }
}

export function createSeedDataLayer(): DataLayer {
  return {
    universities: new SeedUniversityRepository(),
    cities: new SeedCityRepository(),
    countries: new SeedCountryRepository(),
    programs: new SeedProgramRepository(),
    reviews: new SeedReviewRepository(),
    faqs: new SeedFaqRepository(),
    scholarships: new SeedScholarshipRepository(),
    blog: new SeedBlogRepository(),
  };
}

// Type-only re-exports to keep imports tidy.
export type { Dormitory, UniversityProgram };
