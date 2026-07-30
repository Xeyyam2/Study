import { defineRouting } from 'next-intl/routing';
import { siteConfig } from '@/config/site';

export const routing = defineRouting({
  locales: [...siteConfig.locale.locales],
  defaultLocale: siteConfig.locale.default,
  localePrefix: 'always',
});

export type AppLocale = (typeof routing.locales)[number];

export const localeLabels: Record<AppLocale, { native: string; flag: string }> = {
  en: { native: 'English', flag: '🇬🇧' },
  tr: { native: 'Türkçe', flag: '🇹🇷' },
  az: { native: 'Azərbaycanca', flag: '🇦🇿' },
  ru: { native: 'Русский', flag: '🇷🇺' },
};

export const isRtl = (locale: string): boolean =>
  locale === 'ar' || locale === 'fa' || locale === 'ur';

export const isLocale = (locale: string): locale is AppLocale =>
  (routing.locales as readonly string[]).includes(locale);
