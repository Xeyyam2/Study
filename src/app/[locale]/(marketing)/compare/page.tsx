import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { data } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo/alternates";
import { formatCurrency } from "@/lib/utils";

// P2: CompareTool is client-only (useSearchParams + Radix Select) — a dynamic
// import splits its JS into a separate chunk. SSR stays on; useSearchParams is
// handled by the surrounding Suspense boundary.
const CompareTool = dynamic(() =>
  import("@/components/sections/compare-tool").then((m) => m.CompareTool),
);
import type { CompareItem } from "@/components/sections/compare-tool";

// PERF/SEO: ISR so comparison data stays current.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Compare" });
  return buildPageMetadata({
    locale,
    path: "/compare",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Compare" });

  const [universities, cities] = await Promise.all([
    data.universities.list(),
    data.cities.list(),
  ]);
  const cityById = new Map(cities.map((c) => [c.id, c]));

  // C6: batch min-tuition in one query via getListingMetadata instead of an
  // N+1 getMinTuitionUSD call per university.
  const metadata = await data.universities.getListingMetadata(
    universities.map((u) => u.id),
  );

  const items: CompareItem[] = universities.map((u) => {
    const m = metadata.get(u.id);
    return {
      id: u.id,
      name: u.name,
      logoText: u.logoText,
      logoImage: u.logoImage,
      cityName: cityById.get(u.cityId)?.name[locale as never] ?? "—",
      tuition: formatCurrency(m?.minTuitionUSD ?? 0, "USD", locale),
      ranking: u.ranking,
      studentCount: u.studentCount,
      isState: u.isState,
      languages: u.languages,
      foundedYear: u.foundedYear,
    };
  });

  return (
    <div className="container-page py-section-md">
      <header className="mb-8">
        <h1 className="font-display text-headline-xl text-foreground">
          {t("title")}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
      </header>

      {/* F8: Suspense required for useSearchParams in CompareTool */}
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <CompareTool items={items} />
      </Suspense>
    </div>
  );
}
