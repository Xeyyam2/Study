import { getTranslations } from 'next-intl/server';
import { data } from '@/lib/data';
import { formatNumber } from '@/lib/utils';
import type { AppLocale } from '@/i18n/routing';
import { FadeIn } from '@/components/motion/fade-in';

interface StatsSectionProps {
  locale: AppLocale;
}

export async function StatsSection({ locale }: StatsSectionProps) {
  const t = await getTranslations('HomePage.stats');
  const [universities, programs, countries] = await Promise.all([
    data.universities.list(),
    data.programs.list(),
    data.countries.list(),
  ]);
  const studentsPlaced = universities.reduce(
    (acc, u) => acc + u.studentCount,
    0,
  );

  const stats = [
    { value: universities.length, suffix: '+', label: t('universities') },
    { value: programs.length, suffix: '+', label: t('programs') },
    { value: countries.length, suffix: '+', label: t('countries') },
    { value: studentsPlaced, suffix: '', label: t('students') },
  ];

  return (
    <section className="border-b border-border bg-card">
      <FadeIn className="container-page grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
              {formatNumber(s.value, locale)}
              {s.suffix}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </FadeIn>
    </section>
  );
}
