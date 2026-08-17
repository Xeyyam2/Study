import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Search, SearchX, ArrowRight } from "lucide-react";
import { data } from "@/lib/data";
import { universityHeroImages } from "@/lib/seed/university-images";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo/alternates";
import { lx } from "@/lib/i18n/lx";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// ISR — search results come from the live DB; rebuild periodically.
export const revalidate = 3600;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const t = await getTranslations({ locale, namespace: "Search" });
  return buildPageMetadata({
    locale,
    path: sp.q ? `/search?q=${encodeURIComponent(sp.q)}` : "/search",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const SEARCH_LIMIT = 12;

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "Search" });

  const q = (sp.q ?? "").trim();
  const results = q ? await data.search.search(q, SEARCH_LIMIT) : [];
  const universities = results.filter((r) => r.type === "university");
  const programs = results.filter((r) => r.type === "program");
  const cities = results.filter((r) => r.type === "city");

  return (
    <>
      <div className="container-page py-section-md">
        <header className="mb-8">
          <h1 className="font-display text-headline-xl text-foreground">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </header>

        {/* Search box */}
        <form
          action={`/${locale}/search`}
          method="get"
          className="relative mx-auto max-w-2xl"
        >
          <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder={t("placeholder")}
            aria-label={t("placeholder")}
            className="h-14 w-full rounded-2xl border border-border bg-card ps-12 pe-32 text-base shadow-flat-plus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button
            type="submit"
            className="absolute end-2 top-1/2 h-10 -translate-y-1/2 gap-2 px-5"
          >
            {t("search")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </form>

        {/* Results */}
        {q && (
          <div className="mt-10 space-y-10">
            <p className="text-sm text-muted-foreground">
              {t("results", { count: results.length, query: q })}
            </p>

            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
                <SearchX className="h-12 w-12 text-muted-foreground" />
                <h2 className="mt-4 font-display text-headline-md text-foreground">
                  {t("emptyTitle")}
                </h2>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  {t("emptySubtitle")}
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <Link href="/universities">{t("viewAllUniversities")}</Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Universities */}
                {universities.length > 0 && (
                  <section>
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h2 className="font-display text-headline-md text-foreground">
                        {t("universities")}
                      </h2>
                      <Link
                        href="/universities"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        {t("viewAllUniversities")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {universities.map((u) => (
                        <Link
                          key={u.id}
                          href={`/universities/${u.slug}`}
                          className="group block"
                        >
                          <Card className="h-full overflow-hidden transition-shadow hover:shadow-flat-hover">
                            <div className="relative aspect-[16/9] bg-surface-low">
                              <Image
                                src={
                                  universityHeroImages[u.slug] ??
                                  "/images/hero-graduation.webp"
                                }
                                alt={u.label}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-display font-semibold text-foreground">
                                {u.label}
                              </h3>
                              {u.hint && (
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {u.hint}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Programs */}
                {programs.length > 0 && (
                  <section>
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h2 className="font-display text-headline-md text-foreground">
                        {t("programs")}
                      </h2>
                      <Link
                        href="/programs"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        {t("viewAllPrograms")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-border">
                      {programs.map((p) => (
                        <Link
                          key={p.id}
                          href="/programs"
                          className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 last:border-0 hover:bg-surface-low"
                        >
                          <span className="font-medium text-foreground">
                            {lx(p.nameI18n ?? {}, appLocale) || p.label}
                          </span>
                          {p.hint && (
                            <Badge variant="secondary">{p.hint}</Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Cities */}
                {cities.length > 0 && (
                  <section>
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h2 className="font-display text-headline-md text-foreground">
                        {t("cities")}
                      </h2>
                      <Link
                        href="/universities"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        {t("viewAllUniversities")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cities.map((c) => (
                        <Link
                          key={c.id}
                          href={`/universities?search=${encodeURIComponent(c.slug)}`}
                          className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-low"
                        >
                          {lx(c.nameI18n ?? {}, appLocale) || c.label}
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* StudyLeo-style Why Choose Us right above the footer. */}
      <Suspense fallback={<div className="section-padding h-96" aria-hidden />}>
        <WhyChooseUs locale={appLocale} />
      </Suspense>
    </>
  );
}
