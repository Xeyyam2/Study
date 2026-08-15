"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BadgeCheck, MapPin, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

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

/**
 * StudyLeo-style "Popular Universities" carousel: horizontally scrollable cards
 * with snap points and left/right arrow controls. Uses a scroll container (not a
 * carousel library) so it stays dependency-free, works with the existing
 * next-intl <Link>, and degrades gracefully to a plain swipeable row.
 */
export function FeaturedUniversitiesCarousel({
  cards,
  labels,
}: FeaturedUniversitiesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? Math.max(card.offsetWidth + 24, 280) : el.clientWidth;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <div
            key={card.id}
            data-card
            className="w-[280px] shrink-0 snap-start sm:w-[320px]"
          >
            <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow duration-300 hover:shadow-flat-hover">
              <Link
                href={`/universities/${card.slug}`}
                className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={card.name}
              />
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-low">
                <Image
                  src={card.heroImage}
                  alt={card.name}
                  fill
                  sizes="(max-width: 640px) 280px, 320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute end-3 top-3">
                  <Badge
                    variant="verified"
                    className="gap-1 bg-card/90 backdrop-blur"
                  >
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
                    <span className="text-muted-foreground">
                      {labels.students}
                    </span>
                  </span>
                </div>

                <Button
                  asChild
                  variant="cta"
                  size="sm"
                  className="relative z-20 mt-4 w-full"
                >
                  <Link href={`/apply?university=${card.slug}`}>
                    {labels.applyNow}
                  </Link>
                </Button>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 -start-3 hidden items-center lg:flex">
        <ArrowButton
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          ariaLabel={labels.prev}
          className="pointer-events-auto"
        >
          <ArrowLeft className="h-5 w-5" />
        </ArrowButton>
      </div>
      <div className="pointer-events-none absolute inset-y-0 -end-3 hidden items-center lg:flex">
        <ArrowButton
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          ariaLabel={labels.next}
          className="pointer-events-auto"
        >
          <ArrowRight className="h-5 w-5" />
        </ArrowButton>
      </div>
    </div>
  );
}

function ArrowButton({
  children,
  onClick,
  disabled,
  ariaLabel,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-flat-plus transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
