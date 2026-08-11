import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig, fullyTranslatedLocales } from '@/config/site';

/**
 * Map a bare language code to an RFC 5646/BCP-47 language-region tag for
 * `og:locale` (e.g. `en` → `en_US`). Facebook/OG consumers expect the region
 * suffix; a bare code is treated as invalid by some scrapers.
 */
const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  az: 'az_AZ',
  ru: 'ru_RU',
  de: 'de_DE',
  fr: 'fr_FR',
  fa: 'fa_IR',
  ar: 'ar_SA',
  tk: 'tk_TM',
  kk: 'kk_KZ',
  ky: 'ky_KG',
  zh: 'zh_CN',
  bg: 'bg_BG',
  ur: 'ur_PK',
  uz: 'uz_UZ',
  sw: 'sw_TZ',
  so: 'so_SO',
  id: 'id_ID',
};

function ogLocale(locale: string): string {
  return OG_LOCALE_MAP[locale] ?? `${locale}_${locale.toUpperCase()}`;
}

/**
 * Path is the URL path WITHOUT the locale prefix, always starting with '/'.
 * e.g. '/', '/universities', '/universities/bahcesehir-university'
 */
function localizedUrl(locale: string, path: string): string {
  const suffix = path === '/' ? '' : path;
  return `${siteConfig.url}/${locale}${suffix}`;
}

export function buildAlternates(path: string): Pick<Metadata, 'alternates'> {
  const languages: Record<string, string> = {};
  // Only announce hreflang for fully-translated locales. Pointing crawlers at
  // the six stub locales (bg/id/so/ur/uz/sw) would advertise near-empty pages
  // as alternates, which is a "thin content" signal that can hurt the complete
  // locales' rankings.
  for (const locale of fullyTranslatedLocales) {
    // S9: Region-qualify hreflang tags (en → en-US) so Google can pick the
    // right variant for region-targeted searches. Bare language codes still
    // work, but BCP-47 language-region tags are the recommended format.
    const regionTag = OG_LOCALE_MAP[locale] ?? locale;
    languages[regionTag] = localizedUrl(locale, path);
  }
  languages['x-default'] = localizedUrl(routing.defaultLocale, path);
  return { alternates: { languages } };
}

export function canonical(locale: string, path: string): string {
  return localizedUrl(locale, path);
}

export interface PageMetaInput {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image,
  noIndex,
  keywords,
}: PageMetaInput): Metadata {
  const url = canonical(locale, path);

  const defaultKeywords = [
    'study in turkey',
    'turkish universities',
    'study abroad',
    'university admission turkey',
    'scholarships turkey',
  ];

  // Only set explicit OG/Twitter images when a real per-page image is supplied.
  // Otherwise omit them so the file-based `opengraph-image.tsx` generator
  // applies (Next uses it for both og:image and twitter:image). Hardcoding
  // siteConfig.ogImage here previously pointed every share at a 404.
  const ogImage = image
    ? { images: [{ url: image, width: 1200, height: 630, alt: title }] }
    : {};

  return {
    title,
    description,
    keywords: keywords?.length ? keywords : defaultKeywords,
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: url,
      languages: buildAlternates(path).alternates?.languages,
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: ogLocale(locale),
      ...ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
