import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Globe2, MapPin } from "lucide-react";
import { data } from "@/lib/data";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/alternates";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { CTASection } from "@/components/sections/cta-section";

// ISR — country catalog rarely changes; rebuild hourly like the country pages.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CountryHub" });
  return buildPageMetadata({
    locale,
    path: "/study-in-turkey-from",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function CountryHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "CountryHub" });

  const countries = await data.countries.list();
  // Stable alphabetical order (by English name) regardless of seed order.
  const sorted = [...countries].sort((a, b) =>
    (a.name.en ?? a.slug).localeCompare(b.name.en ?? b.slug),
  );

  const path = "/study-in-turkey-from";
  const hubUrl = `${siteConfig.url}/${locale}${path}`;

  return (
    <div>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: t("home"), url: `${siteConfig.url}/${locale}` },
            { name: t("title"), url: hubUrl },
          ]),
          collectionPageJsonLd(
            t("title"),
            hubUrl,
            sorted.map((c) => ({
              name: c.name[appLocale] ?? c.name.en ?? c.slug,
              url: `${siteConfig.url}/${locale}${path}/${c.slug}`,
            })),
          ),
        ]}
      />

      <section className="relative overflow-hidden border-b border-border bg-surface-low">
        <div className="container-page py-section-md">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:underline">
              {t("home")}
            </Link>
            <span>/</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {t("breadcrumbLabel")}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-headline-xl text-foreground">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <div className="container-page py-section-md">
        {/* GEO-friendly extractable intro for AI answer engines. */}
        <p className="mb-section-md max-w-3xl text-body-lg leading-relaxed text-foreground">
          {t("intro")}
        </p>

        <h2 className="mb-6 flex items-center gap-2 font-display text-headline-lg text-foreground">
          <Globe2 className="h-6 w-6 text-primary" aria-hidden />
          {t("countriesHeading")}
        </h2>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {sorted.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/study-in-turkey-from/${c.slug}`}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span aria-hidden className="text-lg leading-none">
                  {c.flag}
                </span>
                <span className="truncate">
                  {c.name[appLocale] ?? c.name.en ?? c.slug}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <CTASection />
    </div>
  );
}
