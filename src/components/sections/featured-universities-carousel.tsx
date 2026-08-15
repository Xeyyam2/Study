"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BadgeCheck, MapPin, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatNumber } from "@/lib/utils";

export interface FeaturedUniversityCardData {
  id: string;
  slug: string;
  name: string;
  logoText: string;
  heroImage: string;
  cityName: string;
  rating: number;
  reviewCount: number;
  foundedYear: number;
  studentCount: number;
  isState: boolean;
}

interface FeaturedUniversitiesCarouselProps {
  cards: FeaturedUniversityCardData[];
  labels: {
    applyNow: string;
    state: string;
    private: string;
    verified: string;
    prev: string;
    next: string;
    turkey: string;
    students: string;
  };
}

/** How many cards fit per slide at each viewport width. */
const PAGE_BREAKPOINTS = [
  { min: 1280, perPage: 4 },
  { min: 1024, perPage: 3 },
  { min: 640, perPage: 2 },
  { min: 0, perPage: 1 },
];

/**
 * StudyLeo-style "Popular Universities" carousel. Cards sit in a responsive
 * grid (all equal width/height) and the arrows/dots switch between whole pages
 * of cards — one click replaces the visible set, exactly like a classic
 * carousel. Touch swipe is supported on the track.
 */
export function FeaturedUniversitiesCarousel({
  cards,
  labels,
}: FeaturedUniversitiesCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(0);

  const pages = Math.max(1, Math.ceil(cards.length / perPage));

  // Measure the viewport to decide how many cards fit per slide.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const compute = () => {
      const match = PAGE_BREAKPOINTS.find((b) => el.clientWidth >= b.min);
      setPerPage(match ? match.perPage : 1);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Keep the current page valid when the layout (or card count) changes.
  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, pages - 1)));
  }, [pages, perPage]);

  const go = useCallback(
    (next: number) => {
      setPage(Math.max(0, Math.min(pages - 1, next)));
    },
    [pages],
  );

  const start = page * perPage;
  const visible = cards.slice(start, start + perPage);

  return (
    <div>
      <div
        ref={viewportRef}
        className="relative touch-pan-y"
        onPointerDown={(e) => {
          touchX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (touchX.current == null) return;
          const dx = e.clientX - touchX.current;
          if (Math.abs(dx) > 48) go(page + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
        onPointerCancel={() => {
          touchX.current = null;
        }}
        onPointerLeave={() => {
          touchX.current = null;
        }}
      >
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))`,
          }}
        >
          {visible.map((card, i) => (
            <CarouselCard
              key={card.id}
              card={card}
              labels={labels}
              priority={page === 0 && i < 2}
            />
          ))}
        </div>

        {pages > 1 && (
          <>
            <div className="absolute inset-y-0 -start-4 z-30 flex items-center">
              <ArrowButton
                onClick={() => go(page - 1)}
                disabled={page === 0}
                ariaLabel={labels.prev}
              >
                <ArrowLeft className="h-5 w-5" />
              </ArrowButton>
            </div>
            <div className="absolute inset-y-0 -end-4 z-30 flex items-center">
              <ArrowButton
                onClick={() => go(page + 1)}
                disabled={page >= pages - 1}
                ariaLabel={labels.next}
              >
                <ArrowRight className="h-5 w-5" />
              </ArrowButton>
            </div>
          </>
        )}
      </div>

      {pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1}`}
              aria-current={i === page}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === page
                  ? "w-6 bg-primary"
                  : "w-2 bg-border hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CarouselCard({
  card,
  labels,
  priority,
}: {
  card: FeaturedUniversityCardData;
  labels: FeaturedUniversitiesCarouselProps["labels"];
  priority: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow duration-300 hover:shadow-flat-hover">
      {/* Whole card links to the university detail page. */}
      <Link
        href={`/universities/${card.slug}`}
        aria-label={card.name}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-surface-low">
        <Image
          src={card.heroImage}
          alt={card.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute end-3 top-3">
          <Badge variant="verified" className="gap-1 bg-card/90 backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5" />
            {labels.verified}
          </Badge>
        </div>
        <div className="absolute start-3 top-3 flex h-10 w-10 items-center justify-center rounded-md bg-card/90 font-display text-sm font-bold text-primary backdrop-blur">
          {card.logoText}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="flex items-center gap-1 text-xs font-medium text-white/90">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {card.cityName}, {labels.turkey}
          </div>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug drop-shadow-sm">
            {card.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          {card.reviewCount > 0 ? (
            <p className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-cta text-cta" aria-hidden />
              <span className="font-semibold tabular-nums">
                {card.rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({card.reviewCount})
              </span>
            </p>
          ) : (
            <span aria-hidden className="h-5" />
          )}

          <Badge
            variant={card.isState ? "tertiary" : "cta"}
            className="shrink-0"
          >
            {card.isState ? labels.state : labels.private}
          </Badge>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {card.foundedYear}
          </span>
          <span>
            {formatNumber(card.studentCount, "en")}+{" "}
            <span className="text-muted-foreground">{labels.students}</span>
          </span>
        </div>

        <Button
          asChild
          variant="cta"
          size="sm"
          className="relative z-20 mt-4 w-full"
        >
          <Link href={`/apply?university=${card.slug}`}>{labels.applyNow}</Link>
        </Button>
      </div>
    </article>
  );
}

function ArrowButton({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-flat-plus transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}
