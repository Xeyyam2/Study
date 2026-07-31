import { siteConfig } from '@/config/site';
import type {
  BlogPost,
  Faq,
  Review as UniversityReview,
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

/**
 * Generic ItemList of universities — for the universities listing page and
 * any page that shows a ranked/curated set of universities.
 */
export function itemListJsonLd(
  items: Array<{ name: string; url: string; description?: string }>,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) =>
      L('ListItem', {
        position: i + 1,
        item: {
          '@type': 'CollegeOrUniversity',
          name: item.name,
          url: item.url,
          ...(item.description ? { description: item.description } : {}),
        },
      }),
    ),
  };
}

/**
 * HowTo schema — step-by-step guide (e.g. "How to apply to a Turkish university").
 * AEO core: Google AI Overview sources HowTo schemas for answer extraction.
 */
export function howToJsonLd(
  steps: Array<{ name: string; text: string }>,
  opts?: { name?: string; description?: string },
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts?.name ?? 'How to study in Turkey',
    description: opts?.description ?? '',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/**
 * Individual Review schema — emitted alongside AggregateRating on university
 * detail pages so review snippets appear in search results.
 */
export function reviewJsonLd(
  reviews: UniversityReview[],
  locale: AppLocale,
  universitySlug: string,
): JsonLd[] {
  return reviews.map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'CollegeOrUniversity',
      name: universitySlug,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { '@type': 'Person', name: r.authorName },
    reviewBody: r.text[locale],
    datePublished: String(r.year),
  }));
}

/**
 * AboutPage schema — for the /about route.
 */
export function aboutPageJsonLd(locale: AppLocale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${siteConfig.name}`,
    url: `${siteConfig.url}/${locale}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description.en,
    },
  };
}

/**
 * ContactPage schema — for the /contact route.
 */
export function contactPageJsonLd(locale: AppLocale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${siteConfig.url}/${locale}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        availableLanguage: ['English', 'Turkish', 'Azerbaijani', 'Russian'],
      },
    },
  };
}

/**
 * CollectionPage schema — for listing/index pages (blog list, universities list).
 */
export function collectionPageJsonLd(
  name: string,
  url: string,
  items: Array<{ name: string; url: string }>,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url,
    hasPart: items.map((item) => ({
      '@type': 'WebPage',
      name: item.name,
      url: item.url,
    })),
  };
}

/**
 * Service schema — for the /apply page (free consultation/application support).
 */
export function serviceJsonLd(locale: AppLocale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'University Application Support',
    serviceType: 'Education consulting',
    provider: { '@type': 'Organization', name: siteConfig.name },
    areaServed: 'TR',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free application support and consultation',
    },
    url: `${siteConfig.url}/${locale}/apply`,
  };
}
