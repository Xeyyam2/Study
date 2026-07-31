import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ShieldCheck, Clock, Headset } from 'lucide-react';
import { data } from '@/lib/data';
import type { AppLocale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/alternates';
import { serviceJsonLd } from '@/lib/seo/json-ld';
import { JsonLd } from '@/components/seo/json-ld';
import { ApplyForm } from '@/components/sections/apply-form';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Apply' });
  return buildPageMetadata({
    locale,
    path: '/apply',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: 'Apply' });
  const countries = await data.countries.list();

  const trust = [
    { icon: ShieldCheck, label: t('trust1') },
    { icon: Clock, label: t('trust2') },
    { icon: Headset, label: t('trust3') },
  ];

  return (
    <div className="container-page py-section-md">
      <JsonLd data={serviceJsonLd(appLocale)} />
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="font-display text-headline-xl text-foreground">
            {t('title')}
          </h1>
          <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>
        </header>

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {trust.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center"
            >
              <item.icon className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-flat-plus sm:p-8">
          <ApplyForm locale={appLocale} countries={countries} />
        </div>
      </div>
    </div>
  );
}
