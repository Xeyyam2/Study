'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { City, DegreeLevel } from '@/types';
import type { AppLocale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UniversityFiltersProps {
  locale: AppLocale;
  cities: City[];
  labels: {
    filtersTitle: string;
    search: string;
    city: string;
    allCities: string;
    degree: string;
    allDegrees: string;
    language: string;
    allLanguages: string;
    type: string;
    allTypes: string;
    state: string;
    private: string;
    bachelor: string;
    master: string;
    phd: string;
    associate: string;
    reset: string;
  };
}

const DEGREES: DegreeLevel[] = ['bachelor', 'master', 'phd', 'associate'];

export function UniversityFilters({
  locale,
  cities,
  labels,
}: UniversityFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.push(`/${locale}/universities${qs ? `?${qs}` : ''}`, { scroll: false });
  }

  const hasFilters = ['city', 'degree', 'language', 'type', 'search'].some(
    (k) => searchParams.get(k),
  );

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        {labels.filtersTitle}
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <div className="relative lg:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            defaultValue={searchParams.get('search') ?? ''}
            onChange={(e) => update('search', e.target.value || null)}
            placeholder={labels.search}
            aria-label={labels.search}
            className="h-10 w-full rounded border border-input bg-card pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <SelectField
          label={labels.city}
          value={searchParams.get('city') ?? 'all'}
          onChange={(v) => update('city', v)}
        >
          <SelectItem value="all">{labels.allCities}</SelectItem>
          {cities.map((c) => (
            <SelectItem key={c.id} value={c.slug}>
              {c.name[locale]}
            </SelectItem>
          ))}
        </SelectField>

        <SelectField
          label={labels.degree}
          value={searchParams.get('degree') ?? 'all'}
          onChange={(v) => update('degree', v)}
        >
          <SelectItem value="all">{labels.allDegrees}</SelectItem>
          {DEGREES.map((d) => (
            <SelectItem key={d} value={d}>
              {labels[d]}
            </SelectItem>
          ))}
        </SelectField>

        <SelectField
          label={labels.language}
          value={searchParams.get('language') ?? 'all'}
          onChange={(v) => update('language', v)}
        >
          <SelectItem value="all">{labels.allLanguages}</SelectItem>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="tr">Türkçe</SelectItem>
        </SelectField>

        <SelectField
          label={labels.type}
          value={searchParams.get('type') ?? 'all'}
          onChange={(v) => update('type', v)}
        >
          <SelectItem value="all">{labels.allTypes}</SelectItem>
          <SelectItem value="state">{labels.state}</SelectItem>
          <SelectItem value="private">{labels.private}</SelectItem>
        </SelectField>
      </div>

      {hasFilters && (
        <div className="mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground"
            onClick={() => router.push(`/${locale}/universities`, { scroll: false })}
          >
            <X className="h-4 w-4" />
            {labels.reset}
          </Button>
        </div>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </label>
  );
}
