import { defineRouting } from 'next-intl/routing';
import { siteConfig } from '@/config/site';

export const routing = defineRouting({
  locales: [...siteConfig.locale.locales],
  defaultLocale: siteConfig.locale.default,
  localePrefix: 'always',
});

export type AppLocale = (typeof routing.locales)[number];

export const localeLabels: Record<AppLocale, { native: string; flag: string }> = {
  en: { native: 'EN', flag: '🇬🇧' },
  tr: { native: 'TR', flag: '🇹🇷' },
  az: { native: 'AZ', flag: '🇦🇿' },
  ru: { native: 'RU', flag: '🇷🇺' },
  de: { native: 'DE', flag: '🇩🇪' },
  fr: { native: 'FR', flag: '🇫🇷' },
  fa: { native: 'FA', flag: '🇮🇷' },
  ar: { native: 'AR', flag: '🇸🇦' },
  tk: { native: 'TK', flag: '🇹🇲' },
  kk: { native: 'KK', flag: '🇰🇿' },
  ky: { native: 'KG', flag: '🇰🇬' },
  zh: { native: 'CN', flag: '🇨🇳' },
  bg: { native: 'BG', flag: '🇧🇬' },
  ur: { native: 'PK', flag: '🇵🇰' },
  uz: { native: 'UZ', flag: '🇺🇿' },
  sw: { native: 'TZ', flag: '🇹🇿' },
  so: { native: 'SO', flag: '🇸🇴' },
  id: { native: 'ID', flag: '🇮🇩' },
};

export const isRtl = (locale: string): boolean =>
  locale === 'ar' || locale === 'fa' || locale === 'ur';

export const isLocale = (locale: string): locale is AppLocale =>
  (routing.locales as readonly string[]).includes(locale);
