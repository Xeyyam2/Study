import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  Building2,
  GraduationCap,
  Wallet,
  ArrowRight,
} from 'lucide-react';
import { data } from '@/lib/data';
import type { AppLocale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/alternates';
import { breadcrumbJsonLd, courseListJsonLd } from '@/lib/seo/json-ld';
import { JsonLd } from '@/components/seo/json-ld';
import { GeoBlock } from '@/components/seo/geo-block';
import { UniversityCard } from '@/components/sections/university-card';
import { FaqSection } from '@/components/sections/faq-section';
import { CTASection } from '@/components/sections/cta-section';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

export async function generateStaticParams() {
  const combos = await data.programs.getCombinations();
  return combos.map((c) => ({
    category: c.categorySlug,
    city: c.citySlug,
  }));
}

// ISR — content rarely changes; rebuild only every hour (or on-demand revalidation).
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; city: string }>;
}): Promise<Metadata> {
  const { locale, category, city } = await params;
  const result = await data.programs.getByCategoryAndCity(category, city);
  if (!result.category || !result.city) return {};
  const t = await getTranslations({ locale, namespace: 'ProgramCombination' });
  const title = t('metaTitle', {
    category: result.category.name[locale as AppLocale],
    city: result.city.name[locale as AppLocale],
  });
  return buildPageMetadata({
    locale,
    path: `/programs/${category}/${city}`,
    title,
    description: t('metaDescription', {
      category: result.category.name[locale as AppLocale],
      city: result.city.name[locale as AppLocale],
    }),
  });
}

export default async function ProgramCombinationPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; city: string }>;
}) {
  const { locale, category, city } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: 'ProgramCombination' });
  const tg = await getTranslations({ locale, namespace: 'Geo' });

  const result = await data.programs.getByCategoryAndCity(category, city);
  if (!result.category || !result.city || result.programs.length === 0)
    notFound();

  const { category: cat, city: cityObj, programs } = result;
  const universities = Array.from(
    new Map(programs.map((p) => [p.university.id, p.university])).values(),
  );
  const uniqueLanguages = [...new Set(programs.map((p) => p.language))]
    .map((l) => l.toUpperCase())
    .join(', ');

  const path = `/programs/${category}/${city}`;
  const title = t('title', {
    category: cat.name[appLocale],
    city: cityObj.name[appLocale],
  });

  return (
    <div>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: t('home'), url: `${siteConfig.url}/${locale}` },
            { name: t('programs'), url: `${siteConfig.url}/${locale}/programs` },
            { name: title, url: `${siteConfig.url}/${locale}${path}` },
          ]),
          courseListJsonLd(
            programs.map((p) => ({
              name: `${p.name[appLocale]} — ${p.university.name}`,
              url: `${siteConfig.url}/${locale}/universities/${p.university.slug}`,
              fee: p.tuitionFee,
            })),
          ),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border bg-surface-low">
        <div className="container-page py-section-md">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:underline">
              {t('home')}
            </Link>
            <span>/</span>
            <Link href="/programs" className="hover:underline">
              {t('programs')}
            </Link>
          </div>
          <h1 className="mt-3 font-display text-headline-xl text-foreground">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t('subtitle', {
              category: cat.name[appLocale],
              city: cityObj.name[appLocale],
            })}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              icon={GraduationCap}
              label={t('programsLabel')}
              value={String(programs.length)}
            />
            <StatCard
              icon={Building2}
              label={t('universitiesLabel')}
              value={String(universities.length)}
            />
            <StatCard
              icon={Wallet}
              label={t('fromLabel')}
              value={formatCurrency(result.minTuitionUSD, 'USD', locale)}
            />
          </div>
        </div>
      </section>

      <div className="container-page py-section-md">
        {/* GEO block — extractable short answer for AI engines (4 locales only) */}
        <GeoBlock
          locale={appLocale}
          shortAnswer={tg('programShortAnswer', {
            category: cat.name[appLocale] ?? '',
            city: cityObj.name[appLocale] ?? '',
          })}
          summary={[
            { label: t('categoryLabel'), value: cat.name[appLocale] ?? '' },
            { label: t('cityLabel'), value: cityObj.name[appLocale] ?? '' },
            { label: t('programsLabel'), value: String(programs.length) },
            { label: t('universitiesLabel'), value: String(universities.length) },
            { label: t('fromLabel'), value: formatCurrency(result.minTuitionUSD, 'USD', locale) },
            { label: t('language'), value: uniqueLanguages },
          ]}
          pros={[tg('pros1'), tg('pros2'), tg('pros3'), tg('pros4')]}
          cons={[tg('cons1'), tg('cons2')]}
          className="mb-section-md"
        />

        {/* Programs table */}
        <section className="mb-section-md">
          <h2 className="mb-4 font-display text-headline-md text-foreground">
            {t('programsTitle')}
          </h2>
          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('programName')}</TableHead>
                  <TableHead>{t('university')}</TableHead>
                  <TableHead>{t('degree')}</TableHead>
                  <TableHead>{t('language')}</TableHead>
                  <TableHead className="text-right">{t('tuition')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programs.map((p) => (
                  <TableRow key={`${p.id}-${p.university.id}`}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/universities/${p.university.slug}`}
                        className="text-primary hover:underline"
                      >
                        {p.name[appLocale]}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {p.university.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {t(`degree.${p.degreeLevel}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="uppercase">{p.language}</TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">
                      {formatCurrency(p.tuitionFee, 'USD', locale)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Universities */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-headline-md text-foreground">
              {t('universitiesTitle')}
            </h2>
            <Link
              href="/universities"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              {t('viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((u) => (
              <UniversityCard key={u.id} university={u} locale={appLocale} />
            ))}
          </div>
        </section>
      </div>

      <FaqSection locale={appLocale} />
      <CTASection />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-2 font-display text-2xl font-bold text-foreground tabular-nums">
        {value}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
