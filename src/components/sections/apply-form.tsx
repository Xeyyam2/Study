'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  GraduationCap,
  Loader2,
  Send,
  SlidersHorizontal,
  User,
} from 'lucide-react';
import type { Country, DegreeLevel, LocalizedString } from '@/types';
import type { AppLocale } from '@/i18n/routing';
import { leadSchema, type LeadInput } from '@/lib/validations/lead';
import { submitLead } from '@/app/actions/leads';
import { uploadApplyDocument } from '@/app/actions/upload-apply-document';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/** Minimal university shape passed from the server. */
type UniversityOption = { id: string; slug: string; name: string };

/** Programs may or may not carry a `universityId`; when present the program
 *  select filters by the chosen university. */
type ProgramOption = {
  id: string;
  slug: string;
  name: LocalizedString;
  degreeLevel?: DegreeLevel;
  universityId?: string;
};

interface ApplyFormProps {
  locale: AppLocale;
  countries: Country[];
  universities: UniversityOption[];
  programs: ProgramOption[];
  universitySlug?: string;
}

/** Document URL fields that double as upload-status keys. */
type DocField =
  | 'passportUrl'
  | 'diplomaUrl'
  | 'photoUrl'
  | 'motivationLetterUrl';

type UploadStatus = 'idle' | 'uploading' | 'done' | 'error';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const FILE_ACCEPT = '.pdf,.jpg,.jpeg,.png';

export function ApplyForm({
  locale,
  countries,
  universities,
  programs,
  universitySlug,
}: ApplyFormProps) {
  const t = useTranslations('Apply');
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploads, setUploads] = useState<Record<DocField, UploadStatus>>({
    passportUrl: 'idle',
    diplomaUrl: 'idle',
    photoUrl: 'idle',
    motivationLetterUrl: 'idle',
  });

  // Pre-select the university when the form is reached from a university page.
  const preselected = universitySlug
    ? universities.find((u) => u.slug === universitySlug)
    : undefined;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      locale,
      universityId: preselected?.id ?? '',
      universitySlug: universitySlug ?? '',
      programId: '',
      degreeLevel: '',
      instructionLanguage: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      whatsapp: '',
      country: '',
      nationality: '',
      dateOfBirth: '',
      gender: '',
      passportUrl: '',
      diplomaUrl: '',
      photoUrl: '',
      motivationLetterUrl: '',
      scholarshipInterest: false,
      dormitory: false,
      intake: '',
      message: '',
      website: '',
    },
  });

  const selectedUniversityId = watch('universityId');
  const degreeLevel = watch('degreeLevel') ?? '';
  const instructionLanguage = watch('instructionLanguage') ?? '';

  // When programs carry a university linkage the select is filtered by the
  // chosen university; otherwise every program is offered.
  const programsLinked = programs.some((p) => p.universityId);
  const visiblePrograms = programsLinked
    ? programs.filter((p) => p.universityId === selectedUniversityId)
    : programs;
  const programLocked = programsLinked && !selectedUniversityId;

  function resolveProgramName(p: ProgramOption): string {
    return p.name[locale] ?? p.name.en ?? p.slug;
  }

  async function onSubmit(values: LeadInput) {
    setFormError(null);
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
    } else if (res.errors._form?.length) {
      setFormError(res.errors._form[0]);
    }
  }

  async function handleUpload(field: DocField, fieldname: string, file?: File) {
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setUploads((s) => ({ ...s, [field]: 'error' }));
      return;
    }
    setUploads((s) => ({ ...s, [field]: 'uploading' }));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fieldname', fieldname);
    const res = await uploadApplyDocument(formData);
    if (res.ok) {
      setValue(field, res.url);
      setUploads((s) => ({ ...s, [field]: 'done' }));
    } else {
      setUploads((s) => ({ ...s, [field]: 'error' }));
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

  const degreeOptions = [
    { value: 'bachelor', label: t('degreeBachelor') },
    { value: 'master', label: t('degreeMaster') },
    { value: 'associate', label: t('degreeAssociate') },
    { value: 'phd', label: t('degreePhd') },
  ] as const;

  const languageOptions = [
    { value: 'english', label: t('langEnglish') },
    { value: 'turkish', label: t('langTurkish') },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot — must stay empty. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register('website')}
      />

      {/* Track uploaded document URLs so they submit with the lead. */}
      <input type="hidden" {...register('passportUrl')} />
      <input type="hidden" {...register('diplomaUrl')} />
      <input type="hidden" {...register('photoUrl')} />
      <input type="hidden" {...register('motivationLetterUrl')} />

      {/* ── Section 1 — Education selection ────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-headline-sm">
            <GraduationCap className="h-5 w-5 text-primary" />
            {t('sectionEducation')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label={t('university')} error={errors.universityId?.message}>
            <select
              aria-invalid={!!errors.universityId}
              className={selectClass}
              {...register('universityId', {
                onChange: (e) => {
                  const u = universities.find((x) => x.id === e.target.value);
                  setValue('universitySlug', u?.slug ?? '');
                  setValue('programId', '');
                },
              })}
            >
              <option value="" disabled>
                {t('universityPlaceholder')}
              </option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label={t('program')}>
            <select
              disabled={programLocked}
              className={cn(selectClass, programLocked && 'opacity-60')}
              {...register('programId')}
            >
              <option value="">
                {programLocked ? t('programSelectUniversityFirst') : t('programPlaceholder')}
              </option>
              {visiblePrograms.map((p) => (
                <option key={p.id} value={p.id}>
                  {resolveProgramName(p)}
                </option>
              ))}
            </select>
          </Field>

          <Field label={t('degreeLevel')}>
            <Segmented
              label={t('degreeLevel')}
              value={degreeLevel}
              options={degreeOptions}
              onSelect={(v) =>
                setValue('degreeLevel', v as LeadInput['degreeLevel'], {
                  shouldValidate: true,
                })
              }
            />
          </Field>

          <Field label={t('instructionLanguage')}>
            <Segmented
              label={t('instructionLanguage')}
              value={instructionLanguage}
              options={languageOptions}
              onSelect={(v) =>
                setValue('instructionLanguage', v as LeadInput['instructionLanguage'], {
                  shouldValidate: true,
                })
              }
            />
          </Field>
        </CardContent>
      </Card>

      {/* ── Section 2 — Personal information ───────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-headline-sm">
            <User className="h-5 w-5 text-primary" />
            {t('sectionPersonal')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <Field
              label={t('whatsapp')}
              error={errors.whatsapp?.message}
              hint={t('whatsappHint')}
            >
              <Input
                type="tel"
                autoComplete="tel"
                aria-invalid={!!errors.whatsapp}
                {...register('whatsapp')}
              />
            </Field>
          </div>

          <Field label={t('dateOfBirth')}>
            <Input type="date" {...register('dateOfBirth')} />
          </Field>

          <Field label={t('gender')}>
            <select className={selectClass} defaultValue="" {...register('gender')}>
              <option value="" disabled>
                {t('genderPlaceholder')}
              </option>
              <option value="male">{t('genderMale')}</option>
              <option value="female">{t('genderFemale')}</option>
              <option value="other">{t('genderOther')}</option>
              <option value="prefer-not">{t('genderPreferNot')}</option>
            </select>
          </Field>

          <Field label={t('country')} error={errors.country?.message}>
            <select
              aria-invalid={!!errors.country}
              defaultValue=""
              className={selectClass}
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
        </CardContent>
      </Card>

      {/* ── Section 3 — Documents ──────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-headline-sm">
            <FileText className="h-5 w-5 text-primary" />
            {t('sectionDocuments')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DocumentField
            label={t('passport')}
            hint={t('fileHint')}
            status={uploads.passportUrl}
            onChange={(file) => handleUpload('passportUrl', 'passport', file)}
          />
          <DocumentField
            label={t('diploma')}
            hint={t('fileHint')}
            status={uploads.diplomaUrl}
            onChange={(file) => handleUpload('diplomaUrl', 'diploma', file)}
          />
          <DocumentField
            label={t('photo')}
            hint={t('fileHint')}
            status={uploads.photoUrl}
            onChange={(file) => handleUpload('photoUrl', 'photo', file)}
          />
          <DocumentField
            label={t('motivationLetter')}
            hint={`${t('optional')} · ${t('fileHint')}`}
            status={uploads.motivationLetterUrl}
            onChange={(file) => handleUpload('motivationLetterUrl', 'motivation-letter', file)}
          />
        </CardContent>
      </Card>

      {/* ── Section 4 — Preferences & submit ───────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-headline-sm">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            {t('sectionPreferences')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CheckboxField
            label={t('scholarshipInterest')}
            {...register('scholarshipInterest')}
          />
          <CheckboxField label={t('dormitory')} {...register('dormitory')} />

          <Field label={t('intake')}>
            <select className={selectClass} defaultValue="" {...register('intake')}>
              <option value="" disabled>
                {t('intakePlaceholder')}
              </option>
              <option value="fall">{t('intakeFall')}</option>
              <option value="spring">{t('intakeSpring')}</option>
            </select>
          </Field>

          <Field label={t('message')} hint={t('optional')}>
            <Textarea rows={4} {...register('message')} placeholder={t('messagePlaceholder')} />
          </Field>

          {formError && (
            <p role="alert" className="text-sm text-destructive">
              {formError}
            </p>
          )}

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

          <p className="text-center text-xs text-muted-foreground">{t('privacy')}</p>
        </CardContent>
      </Card>
    </form>
  );
}

const selectClass =
  'flex h-10 w-full rounded border border-input bg-card px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed';

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

/** Segmented button group used for degree level & instruction language. */
function Segmented<T extends string>({
  value,
  options,
  onSelect,
  label,
}: {
  value: string;
  options: ReadonlyArray<{ value: T; label: string }>;
  onSelect: (value: T) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid auto-cols-fr grid-flow-col gap-1 rounded-md border border-input bg-accent/30 p-1"
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(opt.value)}
            className={cn(
              'flex items-center justify-center rounded px-3 py-2 text-sm font-medium transition-colors',
              selected
                ? 'bg-card text-foreground shadow-flat-plus'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function DocumentField({
  label,
  hint,
  status,
  onChange,
}: {
  label: string;
  hint?: string;
  status: UploadStatus;
  onChange: (file: File | undefined) => void;
}) {
  const t = useTranslations('Apply');
  const statusLabel =
    status === 'done'
      ? t('uploadDone')
      : status === 'uploading'
        ? t('uploading')
        : status === 'error'
          ? t('uploadError')
          : '';
  const statusClass =
    status === 'done'
      ? 'text-verified'
      : status === 'error'
        ? 'text-destructive'
        : 'text-muted-foreground';
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <Label>{label}</Label>
        {statusLabel && (
          <span className={cn('flex items-center gap-1 text-xs', statusClass)}>
            {status === 'uploading' && <Loader2 className="h-3 w-3 animate-spin" />}
            {status === 'done' && <CheckCircle2 className="h-3 w-3" />}
            {status === 'error' && <AlertCircle className="h-3 w-3" />}
            {statusLabel}
          </span>
        )}
      </div>
      <Input type="file" accept={FILE_ACCEPT} onChange={(e) => onChange(e.target.files?.[0])} />
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}

function CheckboxField({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card p-3 text-sm">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
        {...props}
      />
      <span className="text-foreground">{label}</span>
    </label>
  );
}
