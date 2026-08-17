/**
 * GEO (Generative Engine Optimization) locale guard.
 *
 * The `Geo` i18n namespace (short-answer paragraphs, pros/cons, how-to steps)
 * exists in every locale's messages JSON. Four locales (en/tr/az/ru) carry
 * human translations; the other fourteen are EN fallbacks seeded by
 * scripts/backfill-i18n.mjs (the project's documented convention — real
 * translations can follow). Rendering the extractable GEO blocks in every
 * locale means AI answer engines (ChatGPT, Perplexity, Gemini, Claude) can
 * cite the site's short answers regardless of the visitor's language.
 */

/** Locales that have a `Geo` message namespace in their messages JSON. */
export const GEO_LOCALES = [
  "en",
  "tr",
  "az",
  "ru",
  "de",
  "fr",
  "fa",
  "ar",
  "tk",
  "kk",
  "ky",
  "zh",
  "bg",
  "ur",
  "uz",
  "sw",
  "so",
  "id",
] as const;

/** True when the locale has GEO/AEO content translations available. */
export function isGeoLocale(locale: string): boolean {
  return (GEO_LOCALES as readonly string[]).includes(locale);
}
