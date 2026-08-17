"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Search, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { lx } from "@/lib/i18n/lx";
import {
  useSearchSuggest,
  searchHitRoute,
  type SearchHit,
} from "@/lib/hooks/use-search-suggest";

export function HeroSection({ universityCount }: { universityCount: number }) {
  const t = useTranslations("HomePage.hero");
  const locale = useLocale();
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);
  const {
    query,
    setQuery,
    hits,
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    onInputKeyDown,
    enterHit,
  } = useSearchSuggest();

  // Close suggestions when clicking outside.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [setOpen]);

  function go(hit: SearchHit) {
    setOpen(false);
    router.push(searchHitRoute(hit));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hit = enterHit();
    if (hit) {
      go(hit);
      return;
    }
    router.push(
      `/universities${query ? `?search=${encodeURIComponent(query)}` : ""}`,
    );
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    onInputKeyDown(e);
  }

  function hitLabel(hit: SearchHit) {
    if (hit.nameI18n) return lx(hit.nameI18n, locale) || hit.label;
    return hit.label;
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface-low to-background">
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid bg-[length:28px_28px] opacity-[0.4]"
        aria-hidden
      />
      <div className="container-page relative grid items-center gap-10 py-section-md lg:grid-cols-2 lg:py-section-lg">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t("badge")}
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-body-lg text-muted-foreground">
            {t("subtitle")}
          </p>

          <form
            onSubmit={onSubmit}
            className="relative mt-7 flex max-w-lg flex-col gap-2 sm:flex-row"
          >
            <div className="relative flex-1" ref={boxRef}>
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKey}
                onFocus={() => hits.length && setOpen(true)}
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchPlaceholder")}
                // eslint-disable-next-line jsx-a11y/role-supports-aria-props
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls="hero-search-listbox"
                aria-activedescendant={
                  open && hits.length ? `hero-option-${activeIndex}` : undefined
                }
                className="h-12 w-full rounded border border-input bg-card ps-10 pe-3 text-sm shadow-flat-plus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {open && hits.length > 0 && (
                <ul
                  id="hero-search-listbox"
                  role="listbox"
                  className="absolute z-40 mt-1 w-full overflow-hidden rounded border border-border bg-card shadow-flat-hover"
                >
                  {hits.map((h, i) => (
                    <li
                      key={`${h.type}-${h.id}`}
                      id={`hero-option-${i}`}
                      role="option"
                      aria-selected={i === activeIndex}
                    >
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => go(h)}
                        className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                          i === activeIndex ? "bg-surface-low" : ""
                        }`}
                      >
                        <span className="font-medium text-foreground">
                          {hitLabel(h)}
                        </span>
                        <span className="text-xs uppercase text-muted-foreground">
                          {h.type}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button type="submit" size="lg" className="gap-2">
              {t("search")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <Trust>{t("trust1")}</Trust>
            <Trust>{t("trust2")}</Trust>
            <Trust>{t("trust3")}</Trust>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border shadow-flat-hover">
            <Image
              src="/images/hero-graduation.webp"
              alt={t("imageAlt")}
              fill
              priority
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDQwIDUwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTNlOGY4Ii8+PC9zdmc+"
              sizes="(max-width: 1200px) 50vw, 480px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -start-5 rounded-lg border border-border bg-card p-4 shadow-flat-hover">
            <p className="font-display text-2xl font-bold text-primary">
              {universityCount}+
            </p>
            <p className="text-xs text-muted-foreground">{t("universities")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-verified" aria-hidden />
      {children}
    </span>
  );
}
