"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { lx } from "@/lib/i18n/lx";
import {
  useSearchSuggest,
  searchHitRoute,
  type SearchHit,
} from "@/lib/hooks/use-search-suggest";

/**
 * Header site search (icon → expanding input, per the 2026-08-17 design spec).
 *
 * Collapsed: a Search icon button left of the locale switcher. Expanded: an
 * inline input with a dropdown of universities/programs/cities from
 * `/api/search` (via the shared useSearchSuggest hook — the same debounced,
 * cached logic the hero uses). Enter/click navigates to the hit; Escape or an
 * outside click collapses and clears.
 */
export function HeaderSearch() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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
    reset,
  } = useSearchSuggest();

  // Focus the input whenever the search expands.
  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  // Collapse + clear when clicking outside the whole search area.
  useEffect(() => {
    if (!expanded) return;
    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        reset();
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [expanded, reset]);

  function go(hit: SearchHit) {
    router.push(searchHitRoute(hit));
    reset();
    setExpanded(false);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      reset();
      setExpanded(false);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const hit = enterHit();
      if (hit) go(hit);
      return;
    }
    onInputKeyDown(e);
  }

  function hitLabel(hit: SearchHit) {
    if (hit.nameI18n) return lx(hit.nameI18n, locale) || hit.label;
    return hit.label;
  }

  // Collapsed state — icon button (matches the locale switcher's size).
  if (!expanded) {
    return (
      <Button
        variant="outline"
        size="sm"
        aria-label={t("search")}
        aria-expanded={false}
        onClick={() => setExpanded(true)}
        className="shrink-0 px-2.5"
      >
        <Search className="h-4 w-4" aria-hidden />
      </Button>
    );
  }

  // Expanded state — input + dropdown.
  return (
    <div ref={boxRef} className="relative shrink-0">
      <div className="relative flex items-center">
        <Search
          className="pointer-events-none absolute start-2.5 h-4 w-4 text-muted-foreground"
          aria-hidden
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKey}
          onFocus={() => hits.length && setOpen(true)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("search")}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="header-search-listbox"
          aria-activedescendant={
            open && hits.length
              ? `header-search-option-${activeIndex}`
              : undefined
          }
          className="h-9 w-44 rounded border border-input bg-card ps-8 pe-8 text-sm shadow-flat-plus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-64"
        />
        <button
          type="button"
          onClick={() => {
            reset();
            setExpanded(false);
          }}
          aria-label={t("searchClose")}
          className="absolute end-2 flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      {open && query.trim().length >= 2 && (
        <ul
          id="header-search-listbox"
          role="listbox"
          className="absolute end-0 z-50 mt-1 max-h-80 w-72 overflow-y-auto rounded border border-border bg-card shadow-flat-hover sm:w-80"
        >
          {hits.length === 0 ? (
            <li
              className="px-3 py-2.5 text-sm text-muted-foreground"
              role="option"
              aria-selected={false}
              aria-disabled
            >
              {t("noResults")}
            </li>
          ) : (
            hits.map((h, i) => (
              <li
                key={`${h.type}-${h.id}`}
                id={`header-search-option-${i}`}
                role="option"
                aria-selected={i === activeIndex}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => go(h)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm",
                    i === activeIndex ? "bg-surface-low" : "",
                  )}
                >
                  <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                    {hitLabel(h)}
                  </span>
                  <span className="shrink-0 text-xs uppercase text-muted-foreground">
                    {h.type}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
