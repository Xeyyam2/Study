'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { type AppLocale } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { StudentProfileDrawer } from '@/components/student/StudentProfileDrawer';
import type { Profile } from '@/types/crm';
import { LocaleSwitcher } from './locale-switcher';

const navItems = [
  { key: 'universities', href: '/universities' },
  { key: 'programs', href: '/programs' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

interface HeaderSession {
  userId: string;
  profile: Profile;
}

// F2: Only the interactive parts of the header are client-side:
// mobile menu toggle, auth control (session fetch), profile drawer.
// The static shell (logo, desktop nav, apply button) is server-rendered.
export function HeaderInteractive() {
  const t = useTranslations('Nav');
  const tCommon = useTranslations('Common');
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [session, setSession] = useState<HeaderSession | null>(null);
  const [loading, setLoading] = useState(true);

  const redirectTo = `${siteConfig.url}/${locale}?auth=success`;
  const initial = (session?.profile.fullName.trim().charAt(0) || '?').toUpperCase();

  useEffect(() => {
    let active = true;
    fetch('/api/me', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        if (data && data.profile) setSession({ userId: data.userId, profile: data.profile });
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined' || !session) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') !== 'success') return;
    setDrawerOpen(true);
    params.delete('auth');
    const clean = params.toString();
    const path = window.location.pathname;
    window.history.replaceState({}, '', clean ? `${path}?${clean}` : path);
  }, [session]);

  function AuthControl() {
    if (loading) {
      return <span className="inline-block h-8 w-8 rounded-full bg-muted" aria-hidden />;
    }
    if (session) {
      return (
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-full p-1 pe-3 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-sm font-bold">
            {initial}
          </span>
          <span className="hidden sm:inline">{session.profile.fullName.split(' ')[0]}</span>
        </button>
      );
    }
    return <GoogleSignInButton redirectTo={redirectTo} />;
  }

  return (
    <>
      {/* Desktop auth control */}
      <div className="hidden shrink-0 sm:block">
        {AuthControl()}
      </div>

      {/* Mobile menu toggle */}
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

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-card md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            <Link
              href="/"
              className="rounded px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {t('home')}
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {t(item.key)}
              </Link>
            ))}
            <Button asChild variant="cta" className="mt-2">
              <Link href="/apply">{t('apply')}</Link>
            </Button>
            <div className="mt-3">{AuthControl()}</div>
            <div className="mt-3"><LocaleSwitcher /></div>
          </nav>
        </div>
      )}

      {/* Profile drawer */}
      {session && (
        <StudentProfileDrawer
          session={session}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        />
      )}
    </>
  );
}
