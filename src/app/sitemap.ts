// src/app/sitemap.ts — single sitemap index (auto-splits when chunks exceed the 50k limit).
//
// For now we emit the unified /sitemap.xml since url count (<50k) fits. When
// routing + content grows (Phase 3C-full), this file should split into multiple
// `sitemap-{group}.xml` routes and have /sitemap.xml act as an index file.

import type { MetadataRoute } from 'next';
import { data } from '@/lib/data';
import { siteConfig, fullyTranslatedLocales } from '@/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const [universities, posts, combinations, countries, categories] = await Promise.all([
    data.universities.list(),
    data.blog.list(),
    data.programs.getCombinations(),
    data.countries.list(),
    data.programs.getCategories(),
  ]);

  const staticPaths = [
    { path: '/', priority: 1.0, change: 'weekly' as const },
    { path: '/universities', priority: 0.9, change: 'weekly' as const },
    { path: '/programs', priority: 0.8, change: 'weekly' as const },
    { path: '/compare', priority: 0.6, change: 'monthly' as const },
    { path: '/about', priority: 0.5, change: 'monthly' as const },
    { path: '/blog', priority: 0.7, change: 'weekly' as const },
    { path: '/contact', priority: 0.5, change: 'monthly' as const },
    { path: '/apply', priority: 0.8, change: 'monthly' as const },
  ];

  // `lastModified` is intentionally omitted for content without a real
  // `updatedAt` column (universities/categories/combinations/countries/static
  // paths). Emitting `new Date()` makes every deploy look like a full-site
  // change; Google ignores such churn and may devalue the field. Only blog
  // posts carry a real publish date.
  const makeEntry = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
    lastModified?: Date,
  ): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
  });

  const urls: MetadataRoute.Sitemap = [];
  const locPrefix = (loc: string, path: string) => `/${loc}${path === '/' ? '' : path}`;

  // Only emit URLs for fully-translated locales. The six stub locales
  // (bg/id/so/ur/uz/sw) are near-empty; indexing them would flag the site
  // for "thin content" and hurt the ranking of complete locales too.
  for (const locale of fullyTranslatedLocales) {
    for (const { path, priority, change } of staticPaths) {
      urls.push(makeEntry(locPrefix(locale, path), change, priority));
    }

    for (const u of universities) {
      urls.push(makeEntry(locPrefix(locale, `/universities/${u.slug}`), 'monthly', 0.85));
    }

    for (const cat of categories) {
      urls.push(makeEntry(locPrefix(locale, `/programs/${cat.slug}`), 'monthly', 0.7));
    }

    for (const c of combinations) {
      urls.push(
        makeEntry(locPrefix(locale, `/programs/${c.categorySlug}/${c.citySlug}`), 'monthly', 0.65),
      );
    }

    // "Study in Turkey from {country}" landing pages — high-intent geo funnels.
    for (const c of countries) {
      urls.push(
        makeEntry(locPrefix(locale, `/study-in-turkey-from/${c.slug}`), 'monthly', 0.7),
      );
    }

    for (const post of posts) {
      urls.push(
        makeEntry(
          locPrefix(locale, `/blog/${post.slug}`),
          'monthly',
          0.7,
          new Date(post.publishedAt),
        ),
      );
    }
  }

  // With <50k URLs we can emit a single file. When this grows, switch to the
  // index-file pattern documented in Next's `sitemaps` extension API.
  return urls;
}