import { getTranslations } from 'next-intl/server';
import {
  Stethoscope,
  Cog,
  Code2,
  Briefcase,
  Scale,
  Compass,
  Smile,
  Palette,
  ArrowRight,
} from 'lucide-react';
import { data } from '@/lib/data';
import { seedUniversityPrograms } from '@/lib/seed';
import type { AppLocale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { FadeIn } from '@/components/motion/fade-in';
import { formatCurrency } from '@/lib/utils';

const iconMap = {
  stethoscope: Stethoscope,
  cog: Cog,
  code: Code2,
  briefcase: Briefcase,
  scale: Scale,
  compass: Compass,
  smile: Smile,
  palette: Palette,
} as const;

interface CategorySectionProps {
  locale: AppLocale;
}

export async function CategorySection({ locale }: CategorySectionProps) {
  const t = await getTranslations('HomePage.categories');
  const [categories, programs] = await Promise.all([
    data.programs.getCategories(),
    data.programs.list(),
  ]);

  const programById = new Map(programs.map((p) => [p.id, p]));
  const minFeeByCategory: Record<string, number> = {};
  for (const up of seedUniversityPrograms) {
    if (up.currency !== 'USD') continue;
    const p = programById.get(up.programId);
    if (!p) continue;
    const cur = minFeeByCategory[p.categorySlug];
    if (cur === undefined || up.tuitionFee < cur)
      minFeeByCategory[p.categorySlug] = up.tuitionFee;
  }

  return (
    <section className="section-padding">
      <FadeIn className="container-page">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-cta">
              {t('eyebrow')}
            </p>
            <h2 className="mt-2 font-display text-headline-xl text-foreground">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {t('viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Code2;
            const count = programs.filter(
              (p) => p.categorySlug === cat.slug,
            ).length;
            const minFee = minFeeByCategory[cat.slug];

            return (
              <Link
                key={cat.slug}
                href={`/programs/${cat.slug}`}
                className="group rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-flat-hover"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {cat.name[locale]}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {count} {count === 1 ? t('program') : t('programs')}
                </p>
                {minFee && minFee > 0 ? (
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    {t('from')} {formatCurrency(minFee, 'USD', locale)}
                  </p>
                ) : null}
              </Link>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
