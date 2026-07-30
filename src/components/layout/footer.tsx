import { getTranslations } from 'next-intl/server';
import { GraduationCap, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';

const studentLinks = [
  { key: 'universities', href: '/universities' },
  { key: 'programs', href: '/programs' },
  { key: 'apply', href: '/apply' },
  { key: 'blog', href: '/blog' },
] as const;

export async function Footer() {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Nav');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-section-lg border-t border-border bg-card">
      <div className="container-page grid gap-10 py-section-md md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-bold text-primary"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" aria-hidden />
            </span>
            {siteConfig.name}
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">{t('tagline')}</p>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('quickLinks')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-foreground hover:text-primary">
                {tNav('about')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-foreground hover:text-primary">
                {tNav('contact')}
              </Link>
            </li>
            <li>
              <Link href="/compare" className="text-foreground hover:text-primary">
                {tNav('compare')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('forStudents')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {studentLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-foreground hover:text-primary"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('contact')}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4 text-muted-foreground" aria-hidden />
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4 text-muted-foreground" aria-hidden />
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden />
              {t('address')}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {t('rights')}
          </p>
          <p className="max-w-md sm:text-right">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
