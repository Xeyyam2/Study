import { getTranslations } from "next-intl/server";
import { ArrowRight, GraduationCap } from "lucide-react";
import { data } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

interface WhyStudyTurkeyProps {
  locale: AppLocale;
}

/** AEO: extractable definition block + real-data stats for the "study in Turkey" head query. */
export async function WhyStudyTurkey({ locale }: WhyStudyTurkeyProps) {
  const t = await getTranslations("HomePage.whyStudy");
  const [universities, programs] = await Promise.all([
    data.universities.list(),
    data.programs.getAllPrograms(),
  ]);

  const stateTuition = programs
    .filter((p) => p.university.isState)
    .reduce((min, p) => Math.min(min, p.tuitionFee), Number.MAX_SAFE_INTEGER);
  const englishPrograms = programs.filter((p) => p.language === "en").length;
  const stateCount = universities.filter((u) => u.isState).length;

  const stats = [
    {
      value: universities.length,
      suffix: "+",
      label: t("universitiesLabel"),
    },
    {
      value: Number.isFinite(stateTuition) ? stateTuition : 600,
      prefix: "$",
      suffix: "/yr",
      label: t("stateTuitionLabel"),
    },
    {
      value: englishPrograms,
      suffix: "+",
      label: t("englishProgramsLabel"),
    },
    { value: "100", suffix: "%", label: t("scholarshipLabel") },
  ];

  return (
    <section
      className="section-padding bg-surface-low"
      aria-label={t("eyebrow")}
    >
      <FadeIn className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-cta">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 font-display text-headline-xl text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            {t("shortAnswer")}
          </p>
          <Button asChild variant="cta" className="mt-6">
            <Link href="/universities">
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" aria-hidden />
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </p>
              </div>
              <p className="mt-2 font-display text-3xl font-bold text-foreground">
                {s.prefix ?? ""}
                {formatNumber(s.value as number, locale)}
                {s.suffix}
              </p>
              {s.label === t("stateTuitionLabel") && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("stateUniversitiesNote", {
                    count: formatNumber(stateCount, locale),
                  })}
                </p>
              )}
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
