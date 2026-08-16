import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { data } from "@/lib/data";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { BlogCarousel } from "./blog-carousel";

interface BlogCarouselSectionProps {
  locale: AppLocale;
}

// The DB holds some shared/mismatched cover images, so every post that appears
// in the carousel is mapped to its own unique local cover file.
const UNIQUE_COVERS: Record<string, string> = {
  "study-medicine-in-turkey-tuition-costs":
    "/images/blog/study-medicine-in-turkey-tuition-costs/cover.webp",
  "yos-exam-preparation-guide":
    "/images/blog/yos-exam-preparation-guide/cover.webp",
  "cost-of-living-in-istanbul-for-students":
    "/images/blog/cost-of-living-by-region-in-turkey/cover.webp",
  "student-life-in-izmir": "/images/blog/student-life-in-izmir/cover.webp",
  "scholarships-at-turkish-universities":
    "/images/blog/scholarships-at-turkish-universities/cover.webp",
  "how-to-apply-to-turkish-universities":
    "/images/universities/marmara-university/gallery-1.webp",
  "turkish-student-visa-and-residence-guide":
    "/images/blog/turkish-student-visa-and-residence-guide/cover.webp",
  "english-taught-engineering-programs-turkey":
    "/images/blog/english-taught-engineering-programs-turkey/cover.webp",
};

export async function BlogCarouselSection({
  locale,
}: BlogCarouselSectionProps) {
  const t = await getTranslations({ locale, namespace: "HomePage.blog" });

  const posts = await data.blog.list();
  if (posts.length === 0) return null;

  // Only show posts that have their own unique cover (8 curated posts) so no
  // two cards share the same image.
  const items = posts
    .filter((p) => UNIQUE_COVERS[p.slug])
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      coverImage: UNIQUE_COVERS[p.slug],
      readingMinutes: p.readingMinutes,
    }));

  return (
    <section className="section-padding bg-surface-low">
      <div className="container-page">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-cta">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 font-display text-headline-xl text-foreground">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <BlogCarousel
          items={items}
          locale={locale}
          labels={{
            minRead: t("minRead"),
            readMore: t("readMore"),
            prev: t("prev"),
            next: t("next"),
          }}
        />
      </div>
    </section>
  );
}
