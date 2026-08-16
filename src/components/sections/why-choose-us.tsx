import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

interface WhyChooseUsProps {
  locale: AppLocale;
}

/**
 * StudyLeo-style "Why Choose Us" grid: 6 cards, each with an image on top and
 * a title + short description. Uses existing local campus photos.
 */
export async function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const t = await getTranslations({ locale, namespace: "HomePage.whyUs" });

  const items = [
    {
      image: "/images/universities/istanbul-technical-university/hero.webp",
      title: t("scholarshipsTitle"),
      body: t("scholarshipsBody"),
    },
    {
      image: "/images/universities/bogazici-university/hero.webp",
      title: t("freeApplicationTitle"),
      body: t("freeApplicationBody"),
    },
    {
      image: "/images/universities/middle-east-technical-university/hero.webp",
      title: t("admissionTitle"),
      body: t("admissionBody"),
    },
    {
      image: "/images/universities/ankara-university/hero.webp",
      title: t("cheapestTitle"),
      body: t("cheapestBody"),
    },
    {
      image: "/images/universities/yildiz-technical-university/hero.webp",
      title: t("acceptanceTitle"),
      body: t("acceptanceBody"),
    },
    {
      image: "/images/universities/ege-university/hero.webp",
      title: t("freeTitle"),
      body: t("freeBody"),
    },
  ];

  return (
    <section className="section-padding bg-surface-low">
      <div className="container-page">
        <p className="text-center font-display text-sm font-semibold uppercase tracking-wide text-cta">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-center font-display text-headline-xl text-foreground">
          {t("title")}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
          {t("subtitle")}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-lg border border-border bg-card shadow-flat-plus transition-shadow hover:shadow-flat-hover"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-low">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5 p-5">
                <h3 className="font-display text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
