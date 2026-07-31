import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { routing, isRtl, isLocale, type AppLocale } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/json-ld';
import { Analytics } from '@/components/seo/analytics';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/json-ld';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: {
      default: t('title'),
      template: `%s | ${siteConfig.name}`,
    },
    description: t('description'),
    metadataBase: new URL(siteConfig.url),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  const direction = isRtl(locale) ? 'rtl' : 'ltr';
  const appLocale = locale as AppLocale;

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${GeistSans.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(appLocale)]} />
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-flat-hover"
          >
            {tCommon('skipToContent')}
          </a>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
