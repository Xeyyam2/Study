/**
 * GEO (Generative Engine Optimization) locale guard.
 *
 * The `Geo` i18n namespace (short-answer paragraphs, pros/cons, how-to steps)
 * is currently translated into only 4 locales (en/tr/az/ru). Rendering a
 * `Geo.*` message key in any other locale would raise a `MISSING_MESSAGE`
 * error in next-intl. Components that consume `Geo.*` keys must therefore
 * short-circuit when the active locale is not a GEO locale.
 *
 * When the `Geo` namespace is expanded to all 18 locales, simply append the
 * new codes to `GEO_LOCALES` — every consumer updates automatically.
 */

/** Locales that have a `Geo` message namespace in their messages JSON. */
export const GEO_LOCALES = ['en', 'tr', 'az', 'ru'] as const;

/** True when the locale has GEO/AEO content translations available. */
export function isGeoLocale(locale: string): boolean {
  return (GEO_LOCALES as readonly string[]).includes(locale);
}
