import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { AppLocale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo/alternates';
import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { CategorySection } from '@/components/sections/category-section';
import { FeaturedUniversities } from '@/components/sections/featured-universities';
import { CostCalculator } from '@/components/sections/cost-calculator';
import { SuccessStories } from '@/components/sections/success-stories';
import { FaqSection } from '@/components/sections/faq-section';
import { CTASection } from '@/components/sections/cta-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta.home' });
  return buildPageMetadata({
    locale,
    path: '/',
    title: t('title'),
    description: t('description'),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;

  return (
    <>
      <HeroSection />
      <StatsSection locale={appLocale} />
      <CategorySection locale={appLocale} />
      <FeaturedUniversities locale={appLocale} />
      <CostCalculator />
      <SuccessStories locale={appLocale} />
      <FaqSection locale={appLocale} />
      <CTASection />
    </>
  );
}
