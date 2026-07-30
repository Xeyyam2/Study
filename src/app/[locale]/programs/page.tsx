import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { MapPin, ArrowRight } from 'lucide-react';
import { data } from '@/lib/data';
import type { AppLocale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { buildPageMetadata } from '@/lib/seo/alternates';
import { FadeIn } from '@/components/motion/fade-in';
import { formatCurrency } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProgramsIndex' });
  return buildPageMetadata({
    locale,
    path: '/programs',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: 'ProgramsIndex' });

  const categories = data.programs.getCategories();
  const combinations = data.programs.getCombinations();
  const cities = await data.cities.list();
  const cityBySlug = new Map(cities.map((c) => [c.slug, c]));

  return (
    <div className="container-page py-section-md">
      <header className="mb-10">
        <h1 className="font-display text-headline-xl text-foreground">
          {t('title')}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </header>

      <div className="space-y-10">
        {categories.map((cat) => {
          const combos = combinations.filter(
            (c) => c.categorySlug === cat.slug,
          );
          if (combos.length === 0) return null;

          return (
            <FadeIn key={cat.slug}>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-headline-md text-foreground">
                  {cat.name[appLocale]}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {combos.length} {t('cities')}
                </span>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {combos.map((c) => {
                  const city = cityBySlug.get(c.citySlug);
                  return (
                    <Link
                      key={`${c.categorySlug}-${c.citySlug}`}
                      href={`/programs/${c.categorySlug}/${c.citySlug}`}
                      className="group flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-flat-hover"
                    >
                      <div>
                        <p className="flex items-center gap-1 font-display font-semibold text-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          {city?.name[appLocale] ?? c.citySlug}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {t('universities', { count: c.universityCount })} ·{' '}
                          {t('from')}{' '}
                          {formatCurrency(c.minTuitionUSD, 'USD', locale)}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                  );
                })}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
