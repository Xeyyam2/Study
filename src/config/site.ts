export const siteConfig = {
  // Brand placeholder — change `name` to the real brand at any time (Study.md uses "X").
  name: 'StudyHub',
  shortName: 'StudyHub',
  legalName: 'StudyHub',
  // Canonical/OG/sitemap/JSON-LD URLs derive from this. Override in production
  // via NEXT_PUBLIC_SITE_URL; the placeholder is a dev-only fallback.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://studyhub.example').replace(/\/$/, ''),
  ogImage: '/og.png',
  tagline: {
    en: 'Study in Turkey — Your guided path from application to arrival',
    tr: 'Türkiye’de Eğitim — Başvurudan varişe kadar rehberlik edilen yol',
    az: 'Türkiyədə Təhsil — Müraciətdən gəlişə qədər rəhbərlik olunan yol',
    ru: 'Учеба в Турции — Направляемый путь от подачи заявки до приезда',
  },
  description: {
    en: 'Compare accredited Turkish universities, programs, tuition and scholarships. Apply with expert guidance — visa support included.',
    tr: 'Türkiye’nin akredite üniversitelerini, bölümlerini, ücretlerini ve burslarını karşılaştırın. Uzman rehberlikle başvurun — vize desteği dahil.',
    az: 'Akreditə olunmuş Türkiyə universitetlərini, proqramları, tədris haqqını və təqaüdləri müqayisə edin. Ekspert rəhbərliyi ilə müraciət edin — viza dəstəyi daxil.',
    ru: 'Сравнивайте аккредитованные турецкие университеты, программы, стоимость и стипендии. Подавайте заявку с экспертным сопровождением — включая визовую поддержку.',
  },
  locale: {
    default: 'en',
    locales: ['en', 'tr', 'az', 'ru', 'de', 'fr', 'fa', 'ar', 'tk', 'kk', 'ky', 'zh', 'bg', 'ur', 'uz', 'sw', 'so', 'id'] as const,
  },
  contact: {
    email: 'hello@studyhub.example',
    phone: '+90 850 000 00 00',
    whatsapp: {
      number: '905000000000',
      display: '+90 500 000 00 00',
      message: "Hello! I'd like to learn about studying in Turkey.",
    },
    telegram: {
      handle: 'studyhub',
      url: 'https://t.me/studyhub',
    },
    address: {
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      az: 'İstanbul, Türkiyə',
      ru: 'Стамбул, Турция',
    },
  },
  // TODO(5.1): These are placeholder URLs that resolve to 404 pages. Replace
  // with the real social media profile URLs before going live — they are
  // surfaced as sameAs links in the Organization JSON-LD and in the footer.
  social: {
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    telegram: 'https://telegram.org/',
    tiktok: 'https://tiktok.com/',
  },
} as const;

export type Locale = (typeof siteConfig.locale.locales)[number];

export const locales = siteConfig.locale.locales as readonly Locale[];
export const defaultLocale = siteConfig.locale.default as Locale;

/**
 * Locales with a complete message file. Six locales (bg/id/so/ur/uz/sw) are
 * near-empty stubs (~41-42 lines, ~10% translated) and are excluded from the
 * sitemap and hreflang alternates so search engines don't flag the site for
 * "thin content", which would drag down the ranking of the fully-translated
 * pages too. The stub pages still render if visited directly; they're simply
 * not promoted for indexing.
 *
 * When a stub locale is fully translated, remove it from this exclusion list
 * and it re-enters the sitemap/hreflang automatically.
 */
const INCOMPLETE_LOCALES: ReadonlySet<string> = new Set([
  'bg',
  'id',
  'so',
  'ur',
  'uz',
  'sw',
]);

/** Locales that have a complete message file (used by sitemap + hreflang). */
export const fullyTranslatedLocales: readonly Locale[] = locales.filter(
  (l) => !INCOMPLETE_LOCALES.has(l),
);

/** True for the near-empty stub locales. Such pages render if visited directly
 *  but must be marked noindex so they aren't flagged as thin content. */
export function isIncompleteLocale(locale: string): boolean {
  return INCOMPLETE_LOCALES.has(locale);
}
