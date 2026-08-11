'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { GraduationCap, Menu, X } from 'lucide-react';
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

// Session is resolved CLIENT-SIDE via /api/me so the marketing layout never
// reads cookies() — keeping every marketing page statically renderable (ISR).
// A small placeholder avoids a sign-in flash while the session is loading.
export function Header() {
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

  // Resolve the student session client-side (Supabase + dev fallback handled
  // server-side in /api/me). Runs once on mount.
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
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Auto-open the profile drawer after a Google OAuth redirect (?auth=success).
  // Uses window.location (not useSearchParams) to avoid the Suspense boundary
  // requirement during static rendering.
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

  // Compact auth control: avatar (signed in) or Google sign-in (signed out).
  // Rendered both in the desktop bar and the mobile menu.
  function AuthControl() {
    if (loading) {
      return <span className="inline-block h-8 w-8 rounded-full bg-muted" aria-hidden />;
    }
    if (session) {
      return (
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-full p-1 pr-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          aria-label={session.profile.fullName}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {initial}
          </span>
          <span className="hidden max-w-[8rem] truncate md:inline">
            {session.profile.fullName}
          </span>
        </button>
      );
    }
    return <GoogleSignInButton redirectTo={redirectTo} />;
  }

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
              className="rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
            <Link href="/dashboard/login">{t('apply')}</Link>
          </Button>
          <div className="hidden shrink-0 sm:block">
            {AuthControl()}
          </div>
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
            {/* Sign-in / profile entry on mobile (was missing). */}
            <div className="mt-3">
              {AuthControl()}
            </div>
            <div className="mt-3">
              <LocaleSwitcher />
            </div>
          </nav>
        </div>
      )}

      {session && (
        <StudentProfileDrawer
          session={session}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        />
      )}
    </header>
  );
}
