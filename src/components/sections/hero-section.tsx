'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const t = useTranslations('HomePage.hero');
  const router = useRouter();
  const [query, setQuery] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/universities${query ? `?search=${encodeURIComponent(query)}` : ''}`);
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface-low to-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(12,86,208,0.12) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />
      <div className="container-page relative grid items-center gap-10 py-section-md lg:grid-cols-2 lg:py-section-lg">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t('badge')}
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-xl text-body-lg text-muted-foreground">
            {t('subtitle')}
          </p>

          <form onSubmit={onSubmit} className="mt-7 flex max-w-lg flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
                className="h-12 w-full rounded border border-input bg-card pl-10 pr-3 text-sm shadow-flat-plus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <Button type="submit" size="lg" className="gap-2">
              {t('search')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <Trust>{t('trust1')}</Trust>
            <Trust>{t('trust2')}</Trust>
            <Trust>{t('trust3')}</Trust>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border shadow-flat-hover">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80)',
              }}
              role="img"
              aria-label={t('imageAlt')}
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-lg border border-border bg-card p-4 shadow-flat-hover">
            <p className="font-display text-2xl font-bold text-primary">12+</p>
            <p className="text-xs text-muted-foreground">{t('universities')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-verified" aria-hidden />
      {children}
    </span>
  );
}
