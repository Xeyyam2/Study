import type { MetadataRoute } from 'next';
import { data } from '@/lib/data';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const [universities, countries, posts] = await Promise.all([
    data.universities.list(),
    data.countries.list(),
    data.blog.list(),
  ]);
  const combinations = data.programs.getCombinations();

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

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const { path, priority, change } of staticPaths) {
      urls.push({
        url: `${base}/${locale}${path === '/' ? '' : path}`,
        lastModified: now,
        changeFrequency: change,
        priority,
      });
    }

    for (const u of universities) {
      urls.push({
        url: `${base}/${locale}/universities/${u.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.85,
      });
    }

    for (const c of combinations) {
      urls.push({
        url: `${base}/${locale}/programs/${c.categorySlug}/${c.citySlug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
      });
    }

    for (const country of countries) {
      urls.push({
        url: `${base}/${locale}/study-in-turkey-from-${country.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }

    for (const post of posts) {
      urls.push({
        url: `${base}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return urls;
}
