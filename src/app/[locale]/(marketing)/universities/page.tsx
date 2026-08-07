import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SearchX } from "lucide-react";
import { data } from "@/lib/data";
import type { AppLocale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/alternates";
import { collectionPageJsonLd, itemListJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { UniversityFilters } from "@/components/sections/university-filters";
import { UniversityCard } from "@/components/sections/university-card";
import { UniversitySortSelect } from "@/components/sections/university-sort-select";
import {
  parseListingQuery,
  sortUniversities,
} from "@/lib/universities/listing-query";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "UniversitiesPage" });
  return buildPageMetadata({
    locale,
    path: "/universities",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function UniversitiesPage({
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
  const t = await getTranslations({ locale, namespace: "UniversitiesPage" });

  const { filters, sort } = parseListingQuery(sp);

  const [universities, cities] = await Promise.all([
    data.universities.list(filters),
    data.cities.list(),
  ]);
  const listingMetadata = await data.universities.getListingMetadata(
    universities.map((university) => university.id),
  );
  const tuitionByUniversity =
    sort === "tuition"
      ? new Map(
          Array.from(listingMetadata.entries())
            .filter(([, metadata]) => metadata.minTuitionUSD !== undefined)
            .map(([id, metadata]) => [id, metadata.minTuitionUSD!] as const),
        )
      : undefined;
  const listedUniversities = sortUniversities(
    universities,
    sort,
    tuitionByUniversity,
  );

  const filterLabels = {
    filtersTitle: t("filters"),
    search: t("searchPlaceholder"),
    city: t("city"),
    allCities: t("allCities"),
    degree: t("degree"),
    allDegrees: t("allDegrees"),
    language: t("language"),
    allLanguages: t("allLanguages"),
    english: t("english"),
    turkish: t("turkish"),
    type: t("type"),
    allTypes: t("allTypes"),
    state: t("state"),
    private: t("private"),
    bachelor: t("bachelor"),
    master: t("master"),
    phd: t("phd"),
    associate: t("associate"),
    reset: t("reset"),
    close: t("close"),
    clearAll: t("clearAll"),
    maxTuition: t("maxTuition"),
    activeFilters: t("activeFilters"),
  };

  return (
    <div className="container-page py-section-md">
      <JsonLd
        data={[
          collectionPageJsonLd(
            t("title"),
            `${siteConfig.url}/${locale}/universities`,
            listedUniversities.map((u) => ({
              name: u.name,
              url: `${siteConfig.url}/${locale}/universities/${u.slug}`,
            })),
          ),
          itemListJsonLd(
            listedUniversities.map((u) => ({
              name: u.name,
              url: `${siteConfig.url}/${locale}/universities/${u.slug}`,
            })),
          ),
        ]}
      />
      <header className="mb-8">
        <h1 className="font-display text-headline-xl text-foreground">
          {t("title")}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
        <Suspense
          fallback={
            <div className="hidden h-[28rem] rounded-lg border border-border bg-card p-5 lg:block">
              <div className="h-5 w-2/3 animate-pulse rounded bg-surface-high" />
              <div className="mt-6 space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-10 animate-pulse rounded bg-surface-high"
                  />
                ))}
              </div>
            </div>
          }
        >
          <UniversityFilters
            locale={appLocale}
            cities={cities}
            labels={filterLabels}
          />
        </Suspense>

        <main>
          <div className="text-sm text-muted-foreground">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span>{t("results", { count: listedUniversities.length })}</span>
              <UniversitySortSelect
                locale={appLocale}
                value={sort}
                labels={{
                  sort: t("sort"),
                  relevance: t("sortRelevance"),
                  name: t("sortName"),
                  tuition: t("sortTuition"),
                  ranking: t("sortRanking"),
                }}
              />
            </div>
          </div>

          {listedUniversities.length > 0 ? (
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {listedUniversities.map((u) => (
                <UniversityCard
                  key={u.id}
                  university={u}
                  locale={appLocale}
                  listingMetadata={listingMetadata.get(u.id)}
                  labels={{
                    verified: t("verified"),
                    state: t("state"),
                    private: t("private"),
                    turkey: t("turkey"),
                    from: t("from"),
                    tuition: t("tuition"),
                    rank: t("rank"),
                    founded: t("founded"),
                  }}
                />
              ))}
            </div>
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
