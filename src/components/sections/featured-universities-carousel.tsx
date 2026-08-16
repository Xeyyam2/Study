"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Calendar,
  MapPin,
  Star,
  Users,
} from "lucide-react";
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
/** Auto-advance interval in ms (0 = no autoplay). */
const AUTOPLAY_MS = 4000;

/**
 * StudyLeo-style "Popular Universities" carousel. Each card is a full-width
 * image with name/location/rating overlaid and an "Apply Now" button below.
 * The carousel auto-advances, and the prev/next arrows sit OUTSIDE the card
 * area (at the edges of the track) so they never cover the cards.
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
  const [paused, setPaused] = useState(false);

  const pages = Math.max(1, Math.ceil(cards.length / perPage));
  const trackGap = 24; // gap-6
  const pageOffset = perPage * CARD_WIDTH + (perPage - 1) * trackGap;

  // Infinite loop: prev/next wrap around — the first page is never "stuck"
  // and the arrows are never disabled.
  const go = useCallback(
    (next: number) => {
      setPage(((next % pages) + pages) % pages);
    },
    [pages],
  );

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

  // Keep the page in range (wrap) when the layout (or card count) changes.
  useEffect(() => {
    setPage((p) => ((p % pages) + pages) % pages);
  }, [pages, perPage]);

  // Slide the track when the active page changes.
  useEffect(() => {
    slideTo(page * pageOffset);
  }, [page, pageOffset, slideTo]);

  // Auto-advance every AUTOPLAY_MS, pausing on hover/touch.
  useEffect(() => {
    if (paused || pages <= 1) return;
    const id = setInterval(() => {
      setPage((p) => (p >= pages - 1 ? 0 : p + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, pages]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Infinite loop: arrows never disable — prev at page 0 wraps to the
          last page and next at the last page wraps to page 0. */}
      {pages > 1 && (
        <>
          <div className="absolute -start-6 top-1/2 z-30 hidden -translate-y-1/2 lg:flex">
            <ArrowButton onClick={() => go(page - 1)} ariaLabel={labels.prev}>
              <ArrowLeft className="h-5 w-5" />
            </ArrowButton>
          </div>
          <div className="absolute -end-6 top-1/2 z-30 hidden -translate-y-1/2 lg:flex">
            <ArrowButton onClick={() => go(page + 1)} ariaLabel={labels.next}>
              <ArrowRight className="h-5 w-5" />
            </ArrowButton>
          </div>
        </>
      )}

      <div ref={viewportRef} className="relative overflow-hidden px-1">
        <div
          ref={trackRef}
          className="flex touch-pan-y gap-6 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onPointerDown={(e) => {
            touchX.current = e.clientX;
            setPaused(true);
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
      </div>

      {pages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
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
    <article className="flex w-[280px] flex-col gap-2 sm:w-[320px]">
      <Link
        href={`/universities/${card.slug}`}
        aria-label={card.name}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <Image
          src={card.heroImage}
          alt={card.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          priority={priority}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

        <Badge
          variant="verified"
          className="absolute start-2 top-2 gap-1 bg-card/90 backdrop-blur"
        >
          <BadgeCheck className="h-3.5 w-3.5" />
          {labels.verified}
        </Badge>

        <div className="absolute inset-x-0 bottom-0 rounded-lg p-3">
          <h3 className="line-clamp-2 text-base font-medium text-white">
            {card.name}
          </h3>
          <p className="line-clamp-2 text-sm text-white/80">
            <MapPin className="me-1 inline h-3.5 w-3.5" aria-hidden />
            {card.cityName}, {labels.turkey}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-xs font-medium text-white">
              <Star className="h-3.5 w-3.5 fill-cta text-cta" aria-hidden />
              {card.reviewCount > 0 ? card.rating.toFixed(1) : "—"}
            </span>
            {card.reviewCount > 0 && (
              <span className="text-xs text-white/80">
                ({card.reviewCount})
              </span>
            )}
            <span className="ms-auto">
              <Badge
                variant={card.isState ? "secondary" : "cta"}
                className="text-xs"
              >
                {card.isState ? labels.state : labels.private}
              </Badge>
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm font-medium text-white/80">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {card.foundedYear}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" aria-hidden />
              {formatNumber(card.studentCount, "en")}+
            </span>
          </div>
        </div>
      </Link>

      <Button asChild variant="cta" className="w-full">
        <Link href={`/apply?university=${card.slug}`}>{labels.applyNow}</Link>
      </Button>
    </article>
  );
}

function ArrowButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-flat-plus transition-colors hover:bg-accent"
    >
      {children}
    </button>
  );
}
