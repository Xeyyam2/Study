import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { GraduationCap, MapPin, SearchX } from "lucide-react";
import { data } from "@/lib/data";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo/alternates";
import { formatCurrency } from "@/lib/utils";
import { ProgramFilters } from "@/components/sections/program-filters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  filterProgramCombinations,
  parseProgramListingQuery,
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

  const [categories, combinations, cities, allPrograms] = await Promise.all([
    data.programs.getCategories(),
    data.programs.getCombinations(),
    data.cities.list(),
    data.programs.getAllPrograms(),
  ]);
  const query = parseProgramListingQuery(sp);
  // Reuse the combination filter logic (category + city) to narrow programs.
  const activeCombos = filterProgramCombinations(
    combinations,
    categories,
    cities,
    query,
    appLocale,
  );
  const comboKeys = new Set(
    activeCombos.map((c) => `${c.categorySlug}|${c.citySlug}`),
  );
  const listedPrograms = allPrograms.filter((p) =>
    comboKeys.has(`${p.categorySlug}|${p.city.slug}`),
  );

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
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>{t("results", { count: listedPrograms.length })}</span>
          </div>

          {listedPrograms.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("university")}</TableHead>
                    <TableHead>{t("programName")}</TableHead>
                    <TableHead>{t("degree")}</TableHead>
                    <TableHead>{t("city")}</TableHead>
                    <TableHead>{t("language")}</TableHead>
                    <TableHead className="text-right">{t("tuition")}</TableHead>
                    <TableHead className="text-right">
                      <span className="sr-only">Apply</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listedPrograms.map((p) => (
                    <TableRow
                      key={`${p.id}-${p.university.id}`}
                      className="hover:bg-surface-low/60"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-card">
                            {p.university.logoImage ? (
                              <Image
                                src={p.university.logoImage}
                                alt={`${p.university.name} logo`}
                                width={32}
                                height={32}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-xs font-bold text-primary">
                                {p.university.logoText}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/universities/${p.university.slug}`}
                            className="max-w-[12rem] font-medium text-foreground hover:underline"
                          >
                            {p.university.name}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {p.name[appLocale] ?? p.slug}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {t(`degrees.${p.degreeLevel}`)}
                        </Badge>
                        <span className="ml-1 text-xs text-muted-foreground">
                          · {p.durationYears}y
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {p.city.name[appLocale] ?? p.city.slug}
                        </span>
                      </TableCell>
                      <TableCell className="uppercase">
                        {p.language}
                      </TableCell>
                      <TableCell className="text-right font-semibold tabular-nums text-foreground">
                        {formatCurrency(p.tuitionFee, "USD", locale)}
                        <span className="block text-xs font-normal text-muted-foreground">
                          / year
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm" variant="cta">
                          <Link href="/apply">Apply now</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
              <SearchX className="h-10 w-10 text-muted-foreground" />
              <GraduationCap className="mt-2 h-6 w-6 text-muted-foreground" />
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
