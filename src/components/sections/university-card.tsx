import Image from "next/image";
import { MapPin, BadgeCheck, Star } from "lucide-react";
import type { University } from "@/types";
import type { AppLocale } from "@/i18n/routing";
import type { UniversityListingMetadata } from "@/lib/data/repositories";
import { data } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UniversityCardLabels {
  verified: string;
  state: string;
  private: string;
  turkey: string;
  from: string;
  tuition: string;
  rank: string;
  founded: string;
}

interface UniversityCardProps {
  university: University;
  locale: AppLocale;
  priority?: boolean;
  minTuition?: number;
  /** List price — when > minTuition, render it strikethrough next to the fee. */
  originalFee?: number;
  listingMetadata?: UniversityListingMetadata;
  labels?: UniversityCardLabels;
  footer?: React.ReactNode;
}

const DEFAULT_LABELS: UniversityCardLabels = {
  verified: "YÖK",
  state: "State",
  private: "Private",
  turkey: "Turkey",
  from: "from",
  tuition: "Tuition",
  rank: "Rank",
  founded: "Founded",
};

export async function UniversityCard({
  university,
  locale,
  priority,
  minTuition: suppliedMinTuition,
  originalFee: suppliedOriginalFee,
  listingMetadata,
  labels = DEFAULT_LABELS,
  footer,
}: UniversityCardProps) {
  const [city, minTuition, originalFee, rating, count] = listingMetadata
    ? [
        listingMetadata.city,
        suppliedMinTuition ?? listingMetadata.minTuitionUSD,
        suppliedOriginalFee ?? listingMetadata.originalFeeUSD,
        listingMetadata.rating,
        listingMetadata.count,
      ]
    : // C7: batch the per-card metadata into one query (getListingMetadata)
      // instead of three separate calls (city + minTuition + rating).
      await data.universities.getListingMetadata([university.id]).then((m) => {
        const meta = m.get(university.id);
        return [
          meta?.city ?? null,
          suppliedMinTuition ?? meta?.minTuitionUSD,
          suppliedOriginalFee ?? meta?.originalFeeUSD,
          meta?.rating ?? 0,
          meta?.count ?? 0,
        ] as const;
      });

  return (
    <Link
      href={`/universities/${university.slug}`}
      className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
          <div className="absolute end-3 top-3">
            <Badge
              variant="verified"
              className="gap-1 bg-card/90 backdrop-blur"
            >
              <BadgeCheck className="h-3.5 w-3.5" />
              {labels.verified}
            </Badge>
          </div>
          <div className="absolute start-3 top-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-card/90 backdrop-blur">
            {university.logoImage ? (
              <Image
                src={university.logoImage}
                alt={`${university.name} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : (
              <span className="font-display text-sm font-bold text-primary">
                {university.logoText}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2.5 p-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-semibold leading-snug text-foreground">
              {university.name}
            </h3>
            <Badge variant={university.isState ? "tertiary" : "cta"}>
              {university.isState ? labels.state : labels.private}
            </Badge>
          </div>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden />
            {city?.name[locale] ?? labels.turkey}
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
              label={labels.tuition}
              value={
                minTuition
                  ? `${labels.from} ${formatCurrency(minTuition, "USD", locale)}`
                  : "—"
              }
              sub={
                originalFee && minTuition && originalFee > minTuition
                  ? formatCurrency(originalFee, "USD", locale)
                  : undefined
              }
            />
            <Stat label={labels.rank} value={`#${university.ranking}`} />
            <Stat
              label={labels.founded}
              value={String(university.foundedYear)}
            />
          </div>

          {footer}
        </div>
      </Card>
    </Link>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className={cn("space-y-0.5")}>
      <div className="truncate text-xs font-semibold text-foreground">
        {value}
        {sub && (
          <span className="ms-1 text-xs font-normal text-muted-foreground line-through">
            {sub}
          </span>
        )}
      </div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
