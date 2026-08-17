import { data } from "@/lib/data";
import { siteConfig } from "@/config/site";

// /pricing.md — machine-readable pricing for AI agents (see the ai-seo skill:
// agents compare products programmatically before a human visits; opaque
// pricing gets filtered out of AI-mediated journeys). Generated from the real
// database (USD rows only) and ISR-cached so it stays current.
export const revalidate = 3600;

const usd = (n: number) => `USD ${Math.round(n).toLocaleString("en-US")}`;

export async function GET() {
  const [universities, combos, cities, categories] = await Promise.all([
    data.universities.list(),
    data.programs.getCombinations(),
    data.cities.list(),
    data.programs.getCategories(),
  ]);
  const catName = new Map<string, string>(
    categories.map((c) => [
      c.slug,
      (c.name as Record<string, string>).en ?? c.slug,
    ]),
  );

  // Per-university USD minimums (one batched query).
  const meta = await data.universities.getListingMetadata(
    universities.map((u) => u.id),
  );
  const priced = universities
    .map((u) => ({ u, min: meta.get(u.id)?.minTuitionUSD }))
    .filter(
      (x): x is { u: (typeof universities)[number]; min: number } =>
        typeof x.min === "number" && x.min > 0,
    );

  const state = priced.filter((x) => x.u.isState).map((x) => x.min);
  const priv = priced.filter((x) => !x.u.isState).map((x) => x.min);
  const range = (arr: number[]) =>
    arr.length ? `${usd(Math.min(...arr))}–${usd(Math.max(...arr))}` : "—";

  // Cheapest USD entry per program category.
  const catMin = new Map<string, number>();
  for (const c of combos) {
    if (c.minTuitionUSD <= 0) continue;
    catMin.set(
      c.categorySlug,
      Math.min(c.minTuitionUSD, catMin.get(c.categorySlug) ?? Infinity),
    );
  }
  const cats = [...catMin.entries()]
    .map(([slug, min]) => ({ name: catName.get(slug) ?? slug, min }))
    .sort((a, b) => a.min - b.min);

  const cheapest = [...priced].sort((a, b) => a.min - b.min).slice(0, 10);
  const overallMin = priced.length ? Math.min(...priced.map((x) => x.min)) : 0;

  const living = cities
    .filter((c) => c.monthlyLivingCostUSD)
    .map((c) => ({
      name:
        (c.name as Record<string, string>).en ??
        (c.name as Record<string, string>).az ??
        c.slug,
      cost: c.monthlyLivingCostUSD as number,
    }))
    .sort((a, b) => a.cost - b.cost);

  const base = siteConfig.url;
  const lines: string[] = [
    "# Pricing — Study in Turkey (StudyHub)",
    "",
    `> Real tuition, scholarship and living-cost data for international students at Turkish universities. Figures are USD and generated from the live database; always confirm the exact fee on the university page.`,
    "",
    `## Tuition at a glance (USD per year)`,
    `- Cheapest programs from ${usd(overallMin)}/year`,
    `- State universities: ${range(state)}/year`,
    `- Private universities: ${range(priv)}/year`,
    "",
    "## Cheapest programs by field (USD/year, from)",
    ...cats.map((c) => `- ${c.name}: from ${usd(c.min)}/year`),
    "",
    "## Cheapest universities (USD/year, from)",
    ...cheapest.map(
      (x) =>
        `- [${x.u.name}](${base}/en/universities/${x.u.slug}): from ${usd(x.min)}/year`,
    ),
    "",
    "## Living costs (USD per month)",
    ...living.map((c) => `- ${c.name}: ${usd(c.cost)}/month`),
    "",
    "## Scholarships",
    "- Tuition scholarships up to 100% at partner universities.",
    "- Merit discounts of 25–100% at most private universities.",
    "- T\u00FCrkiye Burslar\u0131 (government): full tuition, stipend and accommodation for eligible students.",
    "",
    "## What's included (all free)",
    "- Application: free",
    "- Consultation and guidance: free",
    "- Visa and residence-permit support: included after acceptance",
    "",
    "## Apply",
    `- [Apply for free](${base}/en/apply)`,
    `- [Compare universities](${base}/en/compare)`,
    `- [Browse all programs](${base}/en/programs)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
