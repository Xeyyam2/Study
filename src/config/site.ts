export const siteConfig = {
  // Brand placeholder — change `name` to the real brand at any time (Study.md uses "X").
  name: 'StudyHub',
  shortName: 'StudyHub',
  legalName: 'StudyHub',
  url: 'https://studyhub.example',
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
    locales: ['en', 'tr', 'az', 'ru'] as const,
  },
  contact: {
    email: 'hello@studyhub.example',
    phone: '+90 850 000 00 00',
    whatsapp: {
      number: '905000000000',
      display: '+90 500 000 00 00',
      message: "Hello! I'd like to learn about studying in Turkey.",
    },
    address: {
      en: 'Istanbul, Turkey',
      tr: 'İstanbul, Türkiye',
      az: 'İstanbul, Türkiyə',
      ru: 'Стамбул, Турция',
    },
  },
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
