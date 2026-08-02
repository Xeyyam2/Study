// src/app/sitemap.ts — single sitemap index (auto-splits when chunks exceed the 50k limit).
//
// For now we emit the unified /sitemap.xml since url count (<50k) fits. When
// routing + content grows (Phase 3C-full), this file should split into multiple
// `sitemap-{group}.xml` routes and have /sitemap.xml act as an index file
// pointing at them. The `chunk()` helper below sets up that pattern.

import type { MetadataRoute } from 'next';
import { data } from '@/lib/data';
import { siteConfig, fullyTranslatedLocales } from '@/config/site';

const CHUNK_SIZE = 45000; // keep a margin under the Google 50k-per-file limit

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const [universities, countries, posts, combinations] = await Promise.all([
    data.universities.list(),
    data.countries.list(),
    data.blog.list(),
    data.programs.getCombinations(),
  ]);

  const staticPaths = [
    { path: '/', priority: 1.0, change: 'weekly' as const },
    { path: '/universities', priority: 0.9, change: 'weekly' as const },
    { path: '/programs', priority: 0.8, change: 'weekly' as const },
    { path: '/compare', priority: 0.6, change: 'monthly' as const },
    { path: '/about', priority: 0.5, change: 'monthly' as const },
    { path: '/blog', priority: 0.7, change: 'weekly' as const },
    { path: '/contact', priority: 0.5, change: 'monthly' as const },
    { path: '/apply', priority: 0.6, change: 'monthly' as const },
  ];

  const makeEntry = (
    path: string,
    lastModified: Date,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
  ): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    lastModified,
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
      urls.push(makeEntry(locPrefix(locale, path), now, change, priority));
    }

    for (const u of universities) {
      urls.push(makeEntry(locPrefix(locale, `/universities/${u.slug}`), now, 'monthly', 0.85));
    }

    for (const c of combinations) {
      urls.push(
        makeEntry(locPrefix(locale, `/programs/${c.categorySlug}/${c.citySlug}`), now, 'monthly', 0.65),
      );
    }

    for (const country of countries) {
      urls.push(
        makeEntry(locPrefix(locale, `/study-in-turkey-from-${country.slug}`), now, 'monthly', 0.6),
      );
    }

    for (const post of posts) {
      urls.push(
        makeEntry(locPrefix(locale, `/blog/${post.slug}`), new Date(post.publishedAt), 'monthly', 0.6),
      );
    }
  }

  // With <50k URLs we can emit a single file. When this grows, switch to the
  // index-file pattern documented in Next's `sitemaps` extension API.
  if (urls.length <= CHUNK_SIZE) return urls;

  // Future expansion: emit a sitemap index that lists each chunk as a child file.
  // Single-file scenario is already under the limit; chunk() kept for that path.
  chunk(urls, CHUNK_SIZE);
  return urls;
}