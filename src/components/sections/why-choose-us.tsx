import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

interface WhyChooseUsProps {
  locale: AppLocale;
}

/**
 * StudyLeo-style "Why Choose Us" grid: 6 horizontal cards, each with a pastel
 * tint, a 120×120 illustration on the left (object-contain) and a title +
 * short description on the right. Same layout as StudyLeo's footer cards.
 */
const cards = [
  {
    image: "/images/why-us/card-1.png",
    tint: "bg-why-us-blue",
    titleKey: "scholarshipsTitle",
    bodyKey: "scholarshipsBody",
  },
  {
    image: "/images/why-us/card-2.png",
    tint: "bg-why-us-beige",
    titleKey: "freeApplicationTitle",
    bodyKey: "freeApplicationBody",
  },
  {
    image: "/images/why-us/card-3.png",
    tint: "bg-why-us-amber",
    titleKey: "admissionTitle",
    bodyKey: "admissionBody",
  },
  {
    image: "/images/why-us/card-4.png",
    tint: "bg-why-us-pink",
    titleKey: "cheapestTitle",
    bodyKey: "cheapestBody",
  },
  {
    image: "/images/why-us/card-5.png",
    tint: "bg-why-us-green",
    titleKey: "acceptanceTitle",
    bodyKey: "acceptanceBody",
  },
  {
    image: "/images/why-us/card-6.png",
    tint: "bg-why-us-sky",
    titleKey: "freeTitle",
    bodyKey: "freeBody",
  },
] as const;

export async function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const t = await getTranslations({ locale, namespace: "HomePage.whyUs" });

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

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {cards.map((card) => {
            const title = t(card.titleKey);
            return (
              <article
                key={title}
                className={`flex items-center gap-4 rounded-2xl p-4 ${card.tint}`}
              >
                <Image
                  src={card.image}
                  alt={title}
                  width={120}
                  height={120}
                  loading="lazy"
                  className="aspect-square size-30 object-contain"
                />
                <div className="w-[70%] text-sm text-foreground">
                  <span className="mb-2 block font-display text-base font-medium md:text-xl">
                    {title}
                  </span>
                  {t(card.bodyKey)}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
