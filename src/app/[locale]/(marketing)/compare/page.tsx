import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { data } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo/alternates';
import { CompareTool, type CompareItem } from '@/components/sections/compare-tool';
import { formatCurrency } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Compare' });
  return buildPageMetadata({
    locale,
    path: '/compare',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Compare' });

  const [universities, cities] = await Promise.all([
    data.universities.list(),
    data.cities.list(),
  ]);
  const cityById = new Map(cities.map((c) => [c.id, c]));

  const withTuition = await Promise.all(
    universities.map(async (u) => [u.id, await data.universities.getMinTuitionUSD(u.id)] as const),
  );
  const tuitionById = new Map(withTuition);

  const items: CompareItem[] = universities.map((u) => ({
    id: u.id,
    name: u.name,
    logoText: u.logoText,
    cityName: cityById.get(u.cityId)?.name[locale as never] ?? '—',
    tuition: formatCurrency(tuitionById.get(u.id) ?? 0, 'USD', locale),
    ranking: u.ranking,
    studentCount: u.studentCount,
    isState: u.isState,
    languages: u.languages,
    foundedYear: u.foundedYear,
  }));

  return (
    <div className="container-page py-section-md">
      <header className="mb-8">
        <h1 className="font-display text-headline-xl text-foreground">
          {t('title')}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t('subtitle')}</p>
      </header>

      {/* F8: Suspense required for useSearchParams in CompareTool */}
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <CompareTool items={items} />
      </Suspense>
    </div>
  );
}
