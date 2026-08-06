import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig, fullyTranslatedLocales } from '@/config/site';

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
    languages[locale] = localizedUrl(locale, path);
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
  const ogImage = image ?? siteConfig.ogImage;
  const url = canonical(locale, path);

  const defaultKeywords = [
    'study in turkey',
    'turkish universities',
    'study abroad',
    'university admission turkey',
    'scholarships turkey',
  ];

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
      locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
