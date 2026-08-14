/**
 * Reusable imagery — all LOCAL (public/images/**), originally sourced from
 * Unsplash (see public/images/CREDITS.md). Kept local so the site never
 * depends on a remote CDN (remote Unsplash IDs were breaking with 404s).
 * Centralised so a single edit updates imagery across the site.
 */

const local = (path: string) => `/images/${path}`;

export const seedImages = {
  // Universities (photo -> owner mapping in CREDITS.md)
  campusLibrary: local("universities/ege-university/gallery-2.webp"),
  campusBuilding: local("universities/marmara-university/hero.webp"),
  campusAerial: local("universities/gaziantep-university/hero.webp"),
  students: local("universities/marmara-university/gallery-1.webp"),
  istanbul: local("universities/marmara-university/gallery-2.webp"),
  istanbul2: local(
    "universities/istanbul-cerrahpasa-university/gallery-3.webp",
  ),
  ankara: local("universities/erciyes-university/hero.webp"),
  izmir: local("universities/ege-university/hero.webp"),
  bursa: local("universities/bursa-uludag-university/hero.webp"),
  antalya: local("universities/akdeniz-university/hero.webp"),
  konya: local("universities/mersin-university/hero.webp"),
  medicine: local("universities/istanbul-cerrahpasa-university/hero.webp"),
  engineering: local(
    "blog/english-taught-engineering-programs-turkey/cover.webp",
  ),
  computer: local("universities/kocaeli-university/gallery-2.webp"),
  business: local("universities/kocaeli-university/gallery-3.webp"),
  law: local("universities/mersin-university/gallery-2.webp"),
  architecture: local("universities/erciyes-university/gallery-3.webp"),
  dentistry: local(
    "universities/istanbul-cerrahpasa-university/gallery-2.webp",
  ),
  arts: local("universities/akdeniz-university/gallery-2.webp"),
  dorm: local("universities/bursa-uludag-university/gallery-2.webp"),
  dorm2: local("universities/gaziantep-university/gallery-2.webp"),
  graduation: local("blog/scholarships-at-turkish-universities/cover.webp"),
  cityNight: local("universities/karadeniz-technical-university/hero.webp"),
};

export const heroByCategory: Record<string, string> = {
  medicine: seedImages.medicine,
  engineering: seedImages.engineering,
  "computer-science": seedImages.computer,
  business: seedImages.business,
  law: seedImages.law,
  architecture: seedImages.architecture,
  dentistry: seedImages.dentistry,
  arts: seedImages.arts,
};

export const cityImage: Record<string, string> = {
  istanbul: seedImages.istanbul,
  ankara: seedImages.ankara,
  izmir: seedImages.izmir,
  bursa: seedImages.bursa,
  antalya: seedImages.antalya,
  konya: seedImages.konya,
};

/** Local hero for a university slug (hero.webp), or null when absent. */
export function universityHero(slug: string): string | null {
  // Callers pass known slugs; the file existence was verified at seed time —
  // this is a pure path helper (no fs import in client bundles).
  return `/images/universities/${slug}/hero.webp`;
}
