import { describe, it, expect } from "vitest";
import { data } from "@/lib/data";

describe("UniversityRepository (seed)", () => {
  it("lists all seed universities", async () => {
    const list = await data.universities.list();
    expect(list.length).toBeGreaterThanOrEqual(10);
  });

  it("returns featured universities", async () => {
    const featured = await data.universities.getFeatured(4);
    expect(featured.length).toBeLessThanOrEqual(4);
    expect(featured.every((u) => u.featured)).toBe(true);
  });

  it("filters by city", async () => {
    const istanbul = await data.universities.list({ citySlug: "istanbul" });
    expect(istanbul.length).toBeGreaterThan(0);
    expect(istanbul.every((u) => u.cityId === "c-istanbul")).toBe(true);
  });

  it("filters by degree level", async () => {
    const masters = await data.universities.list({ degreeLevel: "master" });
    expect(masters.length).toBeGreaterThan(0);
  });

  it("treats a zero maximum tuition as an invalid filter", async () => {
    const all = await data.universities.list();
    expect(await data.universities.list({ maxTuitionUSD: 0 })).toEqual(all);
  });

  it("returns null for unknown slug", async () => {
    expect(await data.universities.getBySlug("does-not-exist")).toBeNull();
  });

  it("getDetail enriches with programs and city", async () => {
    const detail = await data.universities.getDetail("bahcesehir-university");
    expect(detail).not.toBeNull();
    expect(detail!.programs.length).toBeGreaterThan(0);
    expect(detail!.city?.slug).toBe("istanbul");
  });

  it("uses a locally-hosted campus image for mapped universities", async () => {
    const uni = await data.universities.getBySlug("bahcesehir-university");
    expect(uni?.heroImage).toBe(
      "/images/universities/bahcesehir-university/hero.webp",
    );
  });

  it("computes min tuition", async () => {
    expect(
      await data.universities.getMinTuitionUSD("u-bahcesehir"),
    ).toBeGreaterThan(0);
  });

  it("computes aggregate rating", async () => {
    const r = await data.universities.getRating("u-bahcesehir");
    expect(r.count).toBeGreaterThan(0);
    expect(r.rating).toBeGreaterThan(0);
    expect(r.rating).toBeLessThanOrEqual(5);
  });

  it("returns listing metadata for a batch of universities", async () => {
    const metadata = await data.universities.getListingMetadata([
      "u-bahcesehir",
      "u-itu",
      "missing-university",
    ]);

    expect(metadata.get("u-bahcesehir")).toMatchObject({
      city: expect.objectContaining({ slug: "istanbul" }),
      minTuitionUSD: 3500,
      originalFeeUSD: 3850,
      rating: expect.any(Number),
      count: expect.any(Number),
    });
    expect(metadata.get("u-itu")?.minTuitionUSD).toBe(1200);
    expect(metadata.has("missing-university")).toBe(false);
  });

  it("returns no listing metadata for an empty ID batch", async () => {
    expect(await data.universities.getListingMetadata([])).toEqual(new Map());
  });

  it("returns related universities excluding self", async () => {
    const related = await data.universities.getRelated("bahcesehir-university");
    expect(related.every((u) => u.slug !== "bahcesehir-university")).toBe(true);
  });
});

describe("ProgramRepository (seed)", () => {
  it("exposes categories", async () => {
    expect((await data.programs.getCategories()).length).toBeGreaterThan(0);
  });

  it("builds programmatic combinations", async () => {
    const combos = await data.programs.getCombinations();
    expect(combos.length).toBeGreaterThan(0);
    for (const c of combos) {
      expect(c.universityCount).toBeGreaterThan(0);
      expect(c.minTuitionUSD).toBeGreaterThan(0);
    }
  });

  it("lists every university×program row with university and city", async () => {
    const all = await data.programs.getAllPrograms();
    expect(all.length).toBeGreaterThan(0);
    for (const p of all) {
      expect(p.university).toBeDefined();
      expect(p.city).toBeDefined();
      expect(typeof p.tuitionFee).toBe("number");
    }
  });

  it("resolves a category+city combination", async () => {
    const result = await data.programs.getByCategoryAndCity(
      "computer-science",
      "istanbul",
    );
    expect(result.city?.slug).toBe("istanbul");
    expect(result.programs.length).toBeGreaterThan(0);
  });

  it("counts all program offerings", async () => {
    const total = await data.programs.countAll();
    const all = await data.programs.getAllPrograms();
    expect(total).toBeGreaterThan(0);
    expect(total).toBe(all.length);
  });

  it("lists a page with totals", async () => {
    const page = await data.programs.listPage(1, 10);
    expect(page.programs.length).toBeLessThanOrEqual(10);
    expect(page.total).toBeGreaterThan(0);
    expect(page.page).toBe(1);
    expect(page.perPage).toBe(10);
    expect(page.totalPages).toBe(Math.ceil(page.total / 10));
  });

  it("pages forward with stable ordering", async () => {
    const a = await data.programs.listPage(1, 10);
    const b = await data.programs.listPage(2, 10);
    expect(a.programs.length).toBeGreaterThan(0);
    expect(b.programs.length).toBeGreaterThan(0);
    // Sorted by tuition asc — page 2 first item must be >= page 1 last item.
    const lastPage1 = a.programs[a.programs.length - 1];
    const firstPage2 = b.programs[0];
    expect(firstPage2.tuitionFee).toBeGreaterThanOrEqual(lastPage1.tuitionFee);
    // No overlap between pages.
    const ids1 = new Set(a.programs.map((p) => `${p.id}-${p.university.id}`));
    expect(
      b.programs.every((p) => !ids1.has(`${p.id}-${p.university.id}`)),
    ).toBe(true);
  });

  it("filters by category and city with pagination", async () => {
    const page = await data.programs.listPage(1, 10, {
      category: "computer-science",
    });
    expect(page.programs.length).toBeGreaterThan(0);
    expect(
      page.programs.every((p) => p.categorySlug === "computer-science"),
    ).toBe(true);
  });

  it("filters by search across program and university names", async () => {
    const page = await data.programs.listPage(1, 10, { search: "medicine" });
    expect(page.programs.length).toBeGreaterThan(0);
  });

  it("exposes originalFee on listing items", async () => {
    const page = await data.programs.listPage(1, 10);
    // The seed data has some entries with originalFee; verify the field exists on items.
    expect("originalFee" in (page.programs[0] ?? {})).toBe(true);
  });
});

describe("Supporting repositories", () => {
  it("lists cities and countries", async () => {
    expect((await data.cities.list()).length).toBeGreaterThan(0);
    expect((await data.countries.list()).length).toBeGreaterThan(0);
  });

  it("exposes monthly living cost per city", async () => {
    const cities = await data.cities.list();
    expect(cities.length).toBeGreaterThan(0);
    expect(
      cities.every((c) => typeof c.monthlyLivingCostUSD === "number"),
    ).toBe(true);
    const istanbul = cities.find((c) => c.slug === "istanbul");
    expect(istanbul?.monthlyLivingCostUSD).toBe(700);
  });

  it("returns general FAQs", async () => {
    expect((await data.faqs.general()).length).toBeGreaterThan(0);
  });

  it("returns blog posts sorted by date", async () => {
    const posts = await data.blog.list();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].publishedAt >= posts[1].publishedAt).toBe(true);
  });
});
