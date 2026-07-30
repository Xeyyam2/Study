import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Clock, ArrowLeft, Calendar } from 'lucide-react';
import { data } from '@/lib/data';
import type { AppLocale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/alternates';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { JsonLd } from '@/components/seo/json-ld';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  const posts = await data.blog.list();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await data.blog.getBySlug(slug);
  if (!post) return {};
  const t = await getTranslations({ locale, namespace: 'Blog' });
  return buildPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: t('metaDetailTitle', { title: post.title[locale as AppLocale] }),
    description: post.excerpt[locale as AppLocale],
    image: post.coverImage,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: 'Blog' });

  const post = await data.blog.getBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;

  return (
    <article>
      <JsonLd
        data={[
          articleJsonLd(post, appLocale),
          breadcrumbJsonLd([
            { name: t('home'), url: `${siteConfig.url}/${locale}` },
            { name: t('blog'), url: `${siteConfig.url}/${locale}/blog` },
            { name: post.title[appLocale], url: `${siteConfig.url}/${locale}${path}` },
          ]),
        ]}
      />

      <div className="container-page max-w-3xl py-section-md">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Link>

        <div className="mt-6">
          <Badge variant="tertiary">{post.category[appLocale]}</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {post.title[appLocale]}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {t('minRead', { min: post.readingMinutes })}
            </span>
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-border">
          <Image
            src={post.coverImage}
            alt={post.title[appLocale]}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="prose mt-8 max-w-none">
          {post.content[appLocale]
            .split('\n')
            .filter(Boolean)
            .map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed text-foreground">
                {para}
              </p>
            ))}
        </div>

        <div className="mt-12 rounded-lg border border-primary-container bg-surface-low p-6 text-center">
          <p className="font-display text-lg font-semibold text-foreground">
            {t('ctaTitle')}
          </p>
          <Button asChild variant="cta" className="mt-4">
            <Link href="/apply">{t('ctaButton')}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
