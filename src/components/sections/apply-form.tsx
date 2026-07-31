'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import type { Country } from '@/types';
import type { AppLocale } from '@/i18n/routing';
import { leadSchema, type LeadInput } from '@/lib/validations/lead';
import { submitLead } from '@/app/actions/leads';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ApplyFormProps {
  locale: AppLocale;
  countries: Country[];
  universitySlug?: string;
}

export function ApplyForm({
  locale,
  countries,
  universitySlug,
}: ApplyFormProps) {
  const t = useTranslations('Apply');
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      locale,
      universitySlug: universitySlug ?? '',
      whatsapp: '',
      programInterest: '',
      message: '',
      website: '',
    },
  });

  async function onSubmit(values: LeadInput) {
    const res = await submitLead(values);
    if (res.ok) {
      setDone(true);
      // Conversion tracking — fire only if GA is loaded.
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'lead_submitted', {
          event_category: 'engagement',
          event_label: universitySlug ? `university:${universitySlug}` : 'apply_page',
        });
      }
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-verified/30 bg-verified/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-verified" />
        <h3 className="mt-4 font-display text-headline-md text-foreground">
          {t('successTitle')}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {t('successBody')}
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setDone(false)}>
          {t('successAnother')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register('website')}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('firstName')} error={errors.firstName?.message}>
          <Input
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            {...register('firstName')}
          />
        </Field>
        <Field label={t('lastName')} error={errors.lastName?.message}>
          <Input
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            {...register('lastName')}
          />
        </Field>
      </div>

      <Field label={t('email')} error={errors.email?.message}>
        <Input
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('phone')} error={errors.phone?.message}>
          <Input
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
        </Field>
        <Field label={t('whatsapp')} error={errors.whatsapp?.message} hint={t('whatsappHint')}>
          <Input
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.whatsapp}
            {...register('whatsapp')}
          />
        </Field>
      </div>

      <Field label={t('country')} error={errors.country?.message}>
        <select
          aria-invalid={!!errors.country}
          defaultValue=""
          className="flex h-10 w-full rounded border border-input bg-card px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register('country')}
        >
          <option value="" disabled>
            {t('countryPlaceholder')}
          </option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name[locale]}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('programInterest')} hint={t('optional')}>
        <Input {...register('programInterest')} placeholder={t('programPlaceholder')} />
      </Field>

      <Field label={t('message')} hint={t('optional')}>
        <Textarea rows={4} {...register('message')} placeholder={t('messagePlaceholder')} />
      </Field>

      <Button
        type="submit"
        variant="cta"
        size="lg"
        className="w-full gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {t('submit')}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        {t('privacy')}
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <Label>{label}</Label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
