import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, ArrowRight, SearchX } from "lucide-react";
import { data } from "@/lib/data";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo/alternates";
import { FadeIn } from "@/components/motion/fade-in";
import { formatCurrency } from "@/lib/utils";
import { ProgramFilters } from "@/components/sections/program-filters";
import { ProgramSortSelect } from "@/components/sections/program-sort-select";
import {
  filterProgramCombinations,
  parseProgramListingQuery,
  sortProgramCombinations,
} from "@/lib/programs/listing-query";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProgramsIndex" });
  return buildPageMetadata({
    locale,
    path: "/programs",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ProgramsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "ProgramsIndex" });

  const [categories, combinations, cities] = await Promise.all([
    data.programs.getCategories(),
    data.programs.getCombinations(),
    data.cities.list(),
  ]);
  const query = parseProgramListingQuery(sp);
  const listedCombinations = sortProgramCombinations(
    filterProgramCombinations(
      combinations,
      categories,
      cities,
      query,
      appLocale,
    ),
    categories,
    cities,
    query.sort,
    appLocale,
  );
  const cityBySlug = new Map(cities.map((c) => [c.slug, c]));

  return (
    <div className="container-page py-section-md">
      <header className="mb-8">
        <h1 className="font-display text-headline-xl text-foreground">
          {t("title")}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
        <Suspense
          fallback={
            <div className="hidden h-[28rem] animate-pulse rounded-lg border border-border bg-card p-5 lg:block" />
          }
        >
          <ProgramFilters
            locale={appLocale}
            categories={categories}
            cities={cities}
            labels={{
              filtersTitle: t("filters"),
              search: t("searchPlaceholder"),
              category: t("category"),
              allCategories: t("allCategories"),
              city: t("city"),
              allCities: t("allCities"),
              reset: t("reset"),
              close: t("close"),
              activeFilters: t("activeFilters"),
            }}
          />
        </Suspense>
        <main>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>{t("results", { count: listedCombinations.length })}</span>
            <ProgramSortSelect
              locale={appLocale}
              value={query.sort}
              labels={{
                sort: t("sort"),
                relevance: t("sortRelevance"),
                name: t("sortName"),
                tuition: t("sortTuition"),
              }}
            />
          </div>
          {listedCombinations.length > 0 ? (
            <FadeIn className="mt-4 grid gap-4 sm:grid-cols-2">
              {listedCombinations.map((c) => {
                const city = cityBySlug.get(c.citySlug);
                const category = categories.find(
                  (item) => item.slug === c.categorySlug,
                );
                return (
                  <Link
                    key={`${c.categorySlug}-${c.citySlug}`}
                    href={`/programs/${c.categorySlug}/${c.citySlug}`}
                    className="group flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-flat-hover"
                  >
                    <div>
                      <p className="font-display font-semibold text-foreground">
                        {category?.name[appLocale] ?? c.categorySlug}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        {city?.name[appLocale] ?? c.citySlug}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {t("universities", { count: c.universityCount })} ·{" "}
                        {t("from")}{" "}
                        {formatCurrency(c.minTuitionUSD, "USD", locale)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </FadeIn>
          ) : (
            <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
              <SearchX className="h-10 w-10 text-muted-foreground" />
              <p className="mt-4 font-display text-lg font-semibold text-foreground">
                {t("emptyTitle")}
              </p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {t("emptySubtitle")}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
