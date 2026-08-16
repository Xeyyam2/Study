import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { data } from "@/lib/data";
import type { AppLocale } from "@/i18n/routing";

interface UniversityLogoMarqueeProps {
  locale: AppLocale;
}

/**
 * StudyHub-style logo strip: all university logos with an image scroll
 * infinitely (LTR). The track is rendered twice and translated by -50% so the
 * loop is seamless. `prefers-reduced-motion` is respected via globals.css.
 */
export async function UniversityLogoMarquee({
  locale,
}: UniversityLogoMarqueeProps) {
  const t = await getTranslations({ locale, namespace: "HomePage.featured" });

  const all = await data.universities.list();
  const withLogo = all.filter((u): u is typeof u & { logoImage: string } =>
    Boolean(u.logoImage),
  );

  if (withLogo.length === 0) return null;

  return (
    <section className="bg-surface-low pb-4 md:pb-6">
      <div className="container-page">
        <p className="mb-4 text-center font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("trustedBy")}
        </p>
        <div
          className="relative overflow-hidden rounded-2xl border border-border-low py-2.5 md:py-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          }}
        >
          <ul
            className="flex w-max min-w-full shrink-0 flex-nowrap items-center gap-6 md:gap-10 animate-marquee"
            style={{ "--marquee-duration": "40s" } as CSSProperties}
          >
            {[...withLogo, ...withLogo].map((u, i) => (
              <li
                key={`${u.slug}-${i}`}
                className="relative flex size-16 shrink-0 items-center justify-center md:size-24"
              >
                <Image
                  src={u.logoImage}
                  alt={`${u.name} logo`}
                  width={96}
                  height={96}
                  className="max-h-full w-auto max-w-full object-contain transition-transform duration-300 hover:scale-110"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
