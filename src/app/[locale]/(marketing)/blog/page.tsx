import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Clock, ArrowRight } from 'lucide-react';
import { data } from '@/lib/data';
import type { AppLocale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { buildPageMetadata } from '@/lib/seo/alternates';
import { FadeIn } from '@/components/motion/fade-in';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { lx } from '@/lib/i18n/lx';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  return buildPageMetadata({
    locale,
    path: '/blog',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: 'Blog' });

  const posts = await data.blog.list();

  return (
    <div className="container-page py-section-md">
      <header className="mb-10">
        <h1 className="font-display text-headline-xl text-foreground">
          {t('title')}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t('subtitle')}</p>
      </header>

      <FadeIn className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-flat-hover">
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-low">
                <Image
                  src={post.coverImage}
                  alt={lx(post.title, appLocale)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="space-y-3 p-5">
                <Badge variant="tertiary">{lx(post.category, appLocale)}</Badge>
                <h2 className="font-display text-lg font-semibold leading-snug text-foreground">
                  {lx(post.title, appLocale)}
                </h2>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {lx(post.excerpt, appLocale)}
                </p>
                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {t('minRead', { min: post.readingMinutes })}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    {t('readMore')}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </FadeIn>
    </div>
  );
}
