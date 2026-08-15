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

/** How many fixed-width cards fit per page at each viewport width. */
const PAGE_BREAKPOINTS = [
  { min: 1280, perPage: 4 },
  { min: 1024, perPage: 3 },
  { min: 640, perPage: 2 },
  { min: 0, perPage: 1 },
];

/** Card width in px — matches the original compact card size. */
const CARD_WIDTH = 320;

/**
 * StudyLeo-style "Popular Universities" carousel. Cards keep the original
 * fixed width/height; arrows and dots switch whole pages of cards, and the
 * track slides to the active page (touch swipe works too).
 */
export function FeaturedUniversitiesCarousel({
  cards,
  labels,
}: FeaturedUniversitiesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(0);

  const pages = Math.max(1, Math.ceil(cards.length / perPage));
  const trackGap = 24; // gap-6
  const pageOffset = perPage * CARD_WIDTH + (perPage - 1) * trackGap;

  const slideTo = useCallback((target: number) => {
    const el = trackRef.current;
    if (el) el.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  // Measure the viewport to decide how many fixed-width cards fit per page.
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

  // Keep the page in range when the layout (or card count) changes.
  useEffect(() => {
    const next = Math.min(page, Math.max(0, pages - 1));
    setPage(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, perPage]);

  // Slide the track when the active page changes.
  useEffect(() => {
    slideTo(page * pageOffset);
  }, [page, pageOffset, slideTo]);

  const go = useCallback(
    (next: number) => {
      setPage(Math.max(0, Math.min(pages - 1, next)));
    },
    [pages],
  );

  return (
    <div>
      <div ref={viewportRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex touch-pan-y gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
          {cards.map((card, i) => (
            <div key={card.id} className="shrink-0 snap-start">
              <CarouselCard
                card={card}
                labels={labels}
                priority={page === 0 && i < 2}
              />
            </div>
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
    <article className="group relative flex h-full w-[280px] flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow duration-300 hover:shadow-flat-hover sm:w-[320px]">
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
          sizes="280px"
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
