'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { GraduationCap, Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { LocaleSwitcher } from './locale-switcher';

const navItems = [
  { key: 'universities', href: '/universities' },
  { key: 'programs', href: '/programs' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const t = useTranslations('Nav');
  const tCommon = useTranslations('Common');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold text-primary"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" aria-hidden />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <Button asChild variant="cta" size="sm" className="hidden sm:inline-flex">
            <Link href="/apply">{t('apply')}</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded text-foreground hover:bg-accent md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={tCommon('menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-card md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            <Link
              href="/"
              className="rounded px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
            >
              {t('home')}
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
              >
                {t(item.key)}
              </Link>
            ))}
            <Button asChild variant="cta" className="mt-2">
              <Link href="/apply">{t('apply')}</Link>
            </Button>
            <div className="mt-3">
              <LocaleSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
