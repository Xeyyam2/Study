import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Plane, Banknote, Languages, MapPin } from 'lucide-react';
import { data } from '@/lib/data';
import type { AppLocale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { cityImage } from '@/lib/seed';
import { buildPageMetadata } from '@/lib/seo/alternates';
import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { JsonLd } from '@/components/seo/json-ld';
import { UniversityCard } from '@/components/sections/university-card';
import { FaqSection } from '@/components/sections/faq-section';
import { CTASection } from '@/components/sections/cta-section';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  const countries = await data.countries.list();
  return countries.map((c) => ({ country: c.slug }));
}

// ISR — content rarely changes; rebuild only every hour.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}): Promise<Metadata> {
  const { locale, country } = await params;
  const c = await data.countries.getBySlug(country);
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: 'CountryLanding' });
  const name = c.name[locale as AppLocale];
  return buildPageMetadata({
    locale,
    path: `/study-in-turkey-from-${country}`,
    title: t('metaTitle', { country: name }),
    description: t('metaDescription', { country: name }),
  });
}

export default async function CountryLandingPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: 'CountryLanding' });

  const c = await data.countries.getBySlug(country);
  if (!c) notFound();

  const name = c.name[appLocale];
  const featured = await data.universities.getFeatured(3);
  const path = `/study-in-turkey-from-${country}`;

  const info = [
    {
      icon: Plane,
      title: t('visaTitle'),
      body: t('visaBody', { country: name }),
    },
    {
      icon: Banknote,
      title: t('currencyTitle'),
      body: t('currencyBody', { country: name }),
    },
    {
      icon: Languages,
      title: t('languageTitle'),
      body: t('languageBody', { country: name }),
    },
  ];

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t('home'), url: `${siteConfig.url}/${locale}` },
          {
            name: t('title', { country: name }),
            url: `${siteConfig.url}/${locale}${path}`,
          },
        ])}
      />

      <section className="relative overflow-hidden border-b border-border bg-surface-low">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${cityImage.istanbul})` }}
          aria-hidden
        />
        <div className="container-page relative py-section-md">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:underline">
              {t('home')}
            </Link>
            <span>/</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {name}
            </span>
          </div>
          <Badge variant="cta" className="mt-4 gap-1 text-sm">
            <span aria-hidden>{c.flag}</span>
            {t('fromCountry', { country: name })}
          </Badge>
          <h1 className="mt-4 max-w-2xl font-display text-headline-xl text-foreground">
            {t('title', { country: name })}
          </h1>
          <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">
            {t('subtitle', { country: name })}
          </p>
        </div>
      </section>

      <div className="container-page py-section-md">
        <div className="grid gap-6 md:grid-cols-3">
          {info.map((item) => (
            <Card key={item.title}>
              <CardContent className="space-y-3 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="font-display text-headline-md text-foreground">
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <section className="section-padding bg-surface-low">
        <div className="container-page">
          <h2 className="mb-6 font-display text-headline-xl text-foreground">
            {t('popularTitle')}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((u) => (
              <UniversityCard key={u.id} university={u} locale={appLocale} />
            ))}
          </div>
        </div>
      </section>

      <FaqSection locale={appLocale} />
      <CTASection />
    </div>
  );
}
