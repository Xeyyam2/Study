"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AppLocale } from "@/i18n/routing";
import { lx } from "@/lib/i18n/lx";

export interface BlogCarouselItem {
  id: string;
  slug: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  category: Record<string, string>;
  coverImage: string;
  readingMinutes: number;
}

interface BlogCarouselProps {
  items: BlogCarouselItem[];
  locale: AppLocale;
  labels: {
    minRead: string;
    readMore: string;
    prev: string;
    next: string;
  };
}

/** How many cards fit per page at each viewport width. */
const BLOG_PAGE_BREAKPOINTS = [
  { min: 1280, perPage: 3 },
  { min: 768, perPage: 2 },
  { min: 0, perPage: 1 },
];

const BLOG_CARD_WIDTH = 360;
const BLOG_TRACK_GAP = 24;

/**
 * StudyLeo-style directional infinite blog carousel: cards repeat 3x, arrows
 * never disable and always scroll in their direction; the edge snap-back to
 * the middle copy is invisible.
 */
export function BlogCarousel({ items, locale, labels }: BlogCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const [perPage, setPerPage] = useState(3);
  const [vp, setVp] = useState(() => Math.ceil(items.length / 3));

  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const pageOffset = perPage * BLOG_CARD_WIDTH + (perPage - 1) * BLOG_TRACK_GAP;
  const trackItems = [...items, ...items, ...items];

  const go = useCallback((next: number) => setVp(next), []);

  // Measure the viewport to decide how many cards fit per page.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const compute = () => {
      const match = BLOG_PAGE_BREAKPOINTS.find((b) => el.clientWidth >= b.min);
      setPerPage(match ? match.perPage : 1);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Re-center on the middle copy when the page count changes (resize).
  useEffect(() => {
    setVp(pages);
    elScrollTo(trackRef.current, pages * pageOffset, false);
  }, [pages, perPage, pageOffset]);

  // Slide the track; at either edge, invisibly snap back to the middle copy.
  useEffect(() => {
    if (vp >= 2 * pages) {
      elScrollTo(trackRef.current, pages * pageOffset, false);
      setVp(pages);
    } else if (vp < pages) {
      elScrollTo(trackRef.current, (2 * pages - 1) * pageOffset, false);
      setVp(2 * pages - 1);
    } else {
      elScrollTo(trackRef.current, vp * pageOffset, true);
    }
  }, [vp, pages, pageOffset]);

  return (
    <div className="relative">
      {pages > 1 && (
        <>
          <div className="absolute -start-5 top-1/2 z-30 hidden -translate-y-1/2 lg:flex">
            <button
              type="button"
              onClick={() => go(vp - 1)}
              aria-label={labels.prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-flat-plus transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute -end-5 top-1/2 z-30 hidden -translate-y-1/2 lg:flex">
            <button
              type="button"
              onClick={() => go(vp + 1)}
              aria-label={labels.next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-flat-plus transition-colors hover:bg-accent"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </>
      )}

      <div ref={viewportRef} className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex touch-pan-y gap-6 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onPointerDown={(e) => {
            touchX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (touchX.current == null) return;
            const dx = e.clientX - touchX.current;
            if (Math.abs(dx) > 48) go(vp + (dx < 0 ? 1 : -1));
            touchX.current = null;
          }}
          onPointerCancel={() => {
            touchX.current = null;
          }}
          onPointerLeave={() => {
            touchX.current = null;
          }}
        >
          {trackItems.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="w-[320px] shrink-0 sm:w-[360px]"
            >
              <Link href={`/blog/${item.slug}`} className="group block h-full">
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-flat-hover">
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-low">
                    <Image
                      src={item.coverImage}
                      alt={lx(item.title, locale)}
                      fill
                      sizes="(max-width: 768px) 90vw, 360px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="space-y-3 p-5">
                    <Badge variant="tertiary">
                      {lx(item.category, locale)}
                    </Badge>
                    <h3 className="line-clamp-2 font-display text-lg font-semibold leading-snug text-foreground">
                      {lx(item.title, locale)}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {lx(item.excerpt, locale)}
                    </p>
                    <div className="flex items-center gap-1 pt-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {labels.minRead.replace(
                        "{min}",
                        String(item.readingMinutes),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function elScrollTo(el: HTMLDivElement | null, left: number, smooth: boolean) {
  if (el) el.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
}
