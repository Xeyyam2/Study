import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { data } from '@/lib/data';
import type { AppLocale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { FadeIn } from '@/components/motion/fade-in';
import { UniversityCard } from './university-card';

interface FeaturedUniversitiesProps {
  locale: AppLocale;
}

export async function FeaturedUniversities({
  locale,
}: FeaturedUniversitiesProps) {
  const t = await getTranslations('HomePage.featured');
  const featured = await data.universities.getFeatured(4);

  return (
    <section className="section-padding bg-surface-low">
      <FadeIn className="container-page">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-cta">
              {t('eyebrow')}
            </p>
            <h2 className="mt-2 font-display text-headline-xl text-foreground">
              {t('title')}
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
          <Link
            href="/universities"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {t('viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((u, i) => (
            <UniversityCard
              key={u.id}
              university={u}
              locale={locale}
              priority={i < 2}
            />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
