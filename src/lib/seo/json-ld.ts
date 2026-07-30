import { siteConfig } from '@/config/site';
import type {
  BlogPost,
  Faq,
  University,
} from '@/types';
import type { AppLocale } from '@/i18n/routing';

type JsonLd = Record<string, unknown>;

function L(key: string, value: unknown) {
  return { '@type': key, ...((value as object) ?? {}) };
}

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    description: siteConfig.description.en,
    sameAs: Object.values(siteConfig.social),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      availableLanguage: ['English', 'Turkish', 'Azerbaijani', 'Russian'],
    },
  };
}

export function websiteJsonLd(locale: AppLocale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/${locale}/universities?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: { '@type': 'Organization', name: siteConfig.name },
  };
}

export function collegeOrUniversityJsonLd(
  university: University,
  locale: AppLocale,
  rating: { rating: number; count: number },
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': ['CollegeOrUniversity', 'EducationalOrganization'],
    name: university.name,
    url: `${siteConfig.url}/${locale}/universities/${university.slug}`,
    image: university.heroImage,
    logo: `${siteConfig.url}/icon.svg`,
    foundingDate: String(university.foundedYear),
    award: university.accreditation,
    description: university.description[locale],
    inLanguage: university.languages,
    aggregateRating:
      rating.count > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: rating.rating,
            reviewCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
  };
}

export function faqPageJsonLd(faqs: Faq[], locale: AppLocale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question[locale],
      acceptedAnswer: { '@type': 'Answer', text: f.answer[locale] },
    })),
  };
}

export function articleJsonLd(post: BlogPost, locale: AppLocale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title[locale],
    description: post.excerpt[locale],
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    inLanguage: locale,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function courseListJsonLd(
  items: Array<{ name: string; url: string; fee: number }>,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) =>
      L('ListItem', {
        position: i + 1,
        item: {
          '@type': 'Course',
          name: item.name,
          url: item.url,
          provider: { '@type': 'Organization', name: siteConfig.name },
          offers: { '@type': 'Offer', price: item.fee, priceCurrency: 'USD' },
        },
      }),
    ),
  };
}
