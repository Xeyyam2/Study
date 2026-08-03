import Image from 'next/image';
import { MapPin, BadgeCheck, Star } from 'lucide-react';
import type { University } from '@/types';
import type { AppLocale } from '@/i18n/routing';
import { data } from '@/lib/data';
import { cn, formatCurrency } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UniversityCardProps {
  university: University;
  locale: AppLocale;
  priority?: boolean;
  minTuition?: number;
}

export async function UniversityCard({
  university,
  locale,
  priority,
  minTuition: suppliedMinTuition,
}: UniversityCardProps) {
  const [city, minTuition, { rating, count }] = await Promise.all([
    data.cities.getByUniversityId(university.id),
    suppliedMinTuition === undefined
      ? data.universities.getMinTuitionUSD(university.id)
      : Promise.resolve(suppliedMinTuition),
    data.universities.getRating(university.id),
  ]);

  return (
    <Link
      href={`/universities/${university.slug}`}
      className="group block focus-visible:outline-none"
    >
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-flat-hover">
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-low">
          <Image
            src={university.heroImage}
            alt={university.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute right-3 top-3">
            <Badge
              variant="verified"
              className="gap-1 bg-card/90 backdrop-blur"
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              YÖK
            </Badge>
          </div>
          <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-md bg-card/90 font-display text-sm font-bold text-primary backdrop-blur">
            {university.logoText}
          </div>
        </div>

        <div className="space-y-2.5 p-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-semibold leading-snug text-foreground">
              {university.name}
            </h3>
            <Badge variant={university.isState ? 'tertiary' : 'cta'}>
              {university.isState ? 'State' : 'Private'}
            </Badge>
          </div>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden />
            {city?.name[locale] ?? 'Turkey'}
          </p>

          {count > 0 && (
            <p className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-cta text-cta" aria-hidden />
              <span className="font-semibold tabular-nums">
                {rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">({count})</span>
            </p>
          )}

          <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
            <Stat
              label="Tuition"
              value={
                minTuition
                  ? `from ${formatCurrency(minTuition, 'USD', locale)}`
                  : '—'
              }
            />
            <Stat label="Rank" value={`#${university.ranking}`} />
            <Stat label="Founded" value={String(university.foundedYear)} />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className={cn('space-y-0.5')}>
      <div className="truncate text-xs font-semibold text-foreground">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
