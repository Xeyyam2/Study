import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SearchX } from 'lucide-react';
import { data } from '@/lib/data';
import type { AppLocale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/alternates';
import { UniversityFilters } from '@/components/sections/university-filters';
import { UniversityCard } from '@/components/sections/university-card';
import { FadeIn } from '@/components/motion/fade-in';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'UniversitiesPage' });
  return buildPageMetadata({
    locale,
    path: '/universities',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

function str(v: string | string[] | undefined): string | undefined {
  return typeof v === 'string' ? v : undefined;
}

export default async function UniversitiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: 'UniversitiesPage' });

  const type = str(sp.type);
  const filters = {
    citySlug: str(sp.city),
    degreeLevel: str(sp.degree) as
      | 'bachelor'
      | 'master'
      | 'phd'
      | 'associate'
      | undefined,
    language: str(sp.language) as 'en' | 'tr' | undefined,
    isState: type === 'state' ? true : type === 'private' ? false : undefined,
    search: str(sp.search),
  };

  const [universities, cities] = await Promise.all([
    data.universities.list(filters),
    data.cities.list(),
  ]);

  const filterLabels = {
    filtersTitle: t('filters'),
    search: t('searchPlaceholder'),
    city: t('city'),
    allCities: t('allCities'),
    degree: t('degree'),
    allDegrees: t('allDegrees'),
    language: t('language'),
    allLanguages: t('allLanguages'),
    type: t('type'),
    allTypes: t('allTypes'),
    state: t('state'),
    private: t('private'),
    bachelor: t('bachelor'),
    master: t('master'),
    phd: t('phd'),
    associate: t('associate'),
    reset: t('reset'),
  };

  return (
    <div className="container-page py-section-md">
      <header className="mb-8">
        <h1 className="font-display text-headline-xl text-foreground">
          {t('title')}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </header>

      <Suspense fallback={<div className="h-24 rounded-lg border border-border bg-card" />}>
        <UniversityFilters
          locale={appLocale}
          cities={cities}
          labels={filterLabels}
        />
      </Suspense>

      <div className="mt-4 text-sm text-muted-foreground">
        {t('results', { count: universities.length })}
      </div>

      {universities.length > 0 ? (
        <FadeIn className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((u) => (
            <UniversityCard key={u.id} university={u} locale={appLocale} />
          ))}
        </FadeIn>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-display text-lg font-semibold text-foreground">
            {t('emptyTitle')}
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {t('emptySubtitle')}
          </p>
        </div>
      )}
    </div>
  );
}
