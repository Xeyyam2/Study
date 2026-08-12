import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  MapPin,
  CalendarDays,
  Users,
  ShieldCheck,
  Languages,
  Trophy,
  Home as HomeIcon,
  Star,
  BadgeCheck,
  GraduationCap,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { data } from '@/lib/data';
import type { AppLocale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/alternates';
import {
  collegeOrUniversityJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
  reviewJsonLd,
} from '@/lib/seo/json-ld';
import { JsonLd } from '@/components/seo/json-ld';
import { GeoBlock } from '@/components/seo/geo-block';
import { isGeoLocale } from '@/lib/seo/geo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { UniversityCard } from '@/components/sections/university-card';
import { formatCurrency, formatNumber } from '@/lib/utils';

// ISR — content rarely changes; rebuild only every hour (or on-demand revalidation).
// No generateStaticParams: pages are rendered on-demand (first visit) and cached.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const university = await data.universities.getBySlug(slug);
  if (!university) return {};
  const t = await getTranslations({ locale, namespace: 'UniversityDetail' });
  return buildPageMetadata({
    locale,
    path: `/universities/${slug}`,
    title: t('metaTitle', { name: university.name }),
    description: t('metaDescription', { name: university.name }),
    image: university.heroImage,
  });
}

export default async function UniversityDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: 'UniversityDetail' });
  const showGeo = isGeoLocale(locale);
  // Only load the Geo translator for supported locales — the Geo namespace
  // doesn't exist in the other 14 message files and getTranslations throws.
  const tg = showGeo ? await getTranslations({ locale, namespace: 'Geo' }) : null;

  const detail = await data.universities.getDetail(slug);
  if (!detail) notFound();

  const [related, reviews, uniFaqs, generalFaqs] = await Promise.all([
    data.universities.getRelated(slug, 3),
    data.reviews.byUniversity(detail.id),
    data.faqs.byUniversity(detail.id),
    data.faqs.general(),
  ]);
  const relatedMetadata = await data.universities.getListingMetadata(
    related.map((r) => r.id),
  );
  const faqs = [...uniFaqs, ...generalFaqs].slice(0, 8);
  const [rating, minTuition] = await Promise.all([
    data.universities.getRating(detail.id),
    data.universities.getMinTuitionUSD(detail.id),
  ]);
  const city = detail.city;
  const uniShortAnswer = tg
    ? tg('universityShortAnswer', {
        name: detail.name,
        type: detail.isState ? t('typeState') : t('typePrivate'),
        city: city?.name[appLocale] ?? '',
        year: detail.foundedYear,
        languages: detail.languages.map((l) => l.toUpperCase()).join(', '),
        tuition: minTuition ? formatCurrency(minTuition, 'USD', locale) : '—',
        accreditation: detail.accreditation,
        students: formatNumber(detail.studentCount, locale),
      })
    : '';
  const whatIsQuestion = tg ? tg('whatIsUniversityTitle', { name: detail.name }) : '';
  const definitionFaq = tg
    ? [
        {
          id: 'what-is-definition',
          entityType: 'general' as const,
          entityId: detail.id,
          question: { [appLocale]: whatIsQuestion } as import('@/types').LocalizedString,
          answer: { [appLocale]: uniShortAnswer } as import('@/types').LocalizedString,
        },
      ]
    : [];

  const wa = `https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(
    `Hello, I'm interested in ${detail.name}`,
  )}`;

  const facts = [
    { icon: CalendarDays, label: t('founded'), value: String(detail.foundedYear) },
    { icon: Users, label: t('students'), value: formatNumber(detail.studentCount, locale) },
    { icon: Trophy, label: t('ranking'), value: `#${detail.ranking}` },
    { icon: ShieldCheck, label: t('accreditation'), value: detail.accreditation },
    { icon: Languages, label: t('languages'), value: detail.languages.map((l) => l.toUpperCase()).join(' / ') },
    { icon: GraduationCap, label: t('type'), value: detail.isState ? t('typeState') : t('typePrivate') },
  ];

  return (
    <article>
      <JsonLd
        data={[
          collegeOrUniversityJsonLd(detail, appLocale, rating),
          faqPageJsonLd([...definitionFaq, ...faqs], appLocale),
          breadcrumbJsonLd([
            { name: t('home'), url: `${siteConfig.url}/${locale}` },
            { name: t('universities'), url: `${siteConfig.url}/${locale}/universities` },
            { name: detail.name, url: `${siteConfig.url}/${locale}/universities/${slug}` },
          ]),
          // S2: self-serving Review markup is against Google guidelines — emit
          // only when an independent review source is explicitly enabled.
          ...(process.env.NEXT_PUBLIC_ENABLE_REVIEW_JSONLD === 'true' && reviews.length > 0
            ? reviewJsonLd(reviews.slice(0, 5), appLocale, detail.name)
            : []),
        ]}
      />

      {/* 1. Hero */}
      <section className="relative">
        <div className="relative h-[320px] w-full overflow-hidden bg-surface-dim sm:h-[420px]">
          <Image
            src={detail.heroImage}
            alt={detail.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/10" />
        </div>
        <div className="container-page relative -mt-28 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/80">
            <Link href="/" className="hover:underline">
              {t('home')}
            </Link>
            <span>/</span>
            <Link href="/universities" className="hover:underline">
              {t('universities')}
            </Link>
          </div>
          <div className="mt-3 flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-border bg-card font-display text-xl font-bold text-primary shadow-flat-plus sm:h-20 sm:w-20">
              {detail.logoText}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={detail.isState ? 'tertiary' : 'cta'}>
                  {detail.isState ? t('typeState') : t('typePrivate')}
                </Badge>
                <Badge variant="verified" className="gap-1">
                  <BadgeCheck className="h-3.5 w-3.5" /> {detail.accreditation}
                </Badge>
              </div>
              <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-4xl">
                {detail.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/90">
                {city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {city.name[appLocale]}
                  </span>
                )}
                {rating.count > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-cta text-cta" />
                    <span className="font-semibold">{rating.rating.toFixed(1)}</span>
                    <span className="text-white/70">
                      ({rating.count} {t('reviews')})
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page layout-sticky-sidebar pb-section-lg">
        <div className="space-y-12">
          {/* 1b. GEO block — extractable short answer for AI engines (4 locales only) */}
          {showGeo && tg && (
            <GeoBlock
              locale={appLocale}
              shortAnswer={tg('universityShortAnswer', {
                name: detail.name,
                type: detail.isState ? t('typeState') : t('typePrivate'),
                city: city?.name[appLocale] ?? '',
                year: detail.foundedYear,
                languages: detail.languages.map((l) => l.toUpperCase()).join(', '),
                tuition: minTuition ? formatCurrency(minTuition, 'USD', locale) : '—',
                accreditation: detail.accreditation,
                students: formatNumber(detail.studentCount, locale),
              })}
              summary={[
                { label: t('founded'), value: String(detail.foundedYear) },
                { label: t('students'), value: formatNumber(detail.studentCount, locale) },
                ...(city ? [{ label: t('city'), value: city.name[appLocale] ?? '' }] : []),
                { label: t('type'), value: detail.isState ? t('typeState') : t('typePrivate') },
                { label: t('languages'), value: detail.languages.map((l) => l.toUpperCase()).join(' / ') },
                ...(minTuition ? [{ label: t('tuitionFrom'), value: formatCurrency(minTuition, 'USD', locale) }] : []),
                { label: t('accreditation'), value: detail.accreditation },
              ]}
              pros={[tg('pros1'), tg('pros2'), tg('pros3'), tg('pros4')]}
              cons={[tg('cons1'), tg('cons2')]}
            />
          )}

          {/* 1c. "What is...?" definition block — AEO (4 GEO locales only) */}
          {showGeo && tg && (
            <section className="rounded-lg border border-border bg-surface-low p-5 sm:p-6">
              <h2 className="mb-2 font-display text-headline-md text-foreground">
                {whatIsQuestion}
              </h2>
              <p className="text-sm leading-relaxed text-foreground sm:text-[15px]">
                {uniShortAnswer}
              </p>
            </section>
          )}

          {/* 2. Quick facts */}
          <Section title={t('factsTitle')}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="bg-card p-4">
                  <f.icon className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </p>
                  <p className="font-display font-semibold text-foreground">
                    {f.value}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* About */}
          <Section title={t('aboutTitle')}>
            <p className="max-w-3xl leading-relaxed text-foreground">
              {detail.description[appLocale]}
            </p>
          </Section>

          {/* 3+5. Programs & tuition */}
          <Section title={t('programsTitle')}>
            {detail.programs.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('programName')}</TableHead>
                      <TableHead>{t('degree')}</TableHead>
                      <TableHead>{t('language')}</TableHead>
                      <TableHead>{t('duration')}</TableHead>
                      <TableHead className="text-right">{t('tuition')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detail.programs.map((up) => (
                      <TableRow key={up.id}>
                        <TableCell className="font-medium">
                          {up.program.name[appLocale]}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {t(`degrees.${up.program.degreeLevel}`)}
                          </Badge>
                        </TableCell>
                        <TableCell className="uppercase">{up.language}</TableCell>
                        <TableCell>
                          {up.program.durationYears} {t('years')}
                        </TableCell>
                        <TableCell className="text-right font-semibold tabular-nums">
                          {formatCurrency(up.tuitionFee, up.currency, locale)}
                          <span className="block text-[10px] font-normal text-muted-foreground">
                            /{t('year')}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t('programsNone')}</p>
            )}
          </Section>

          {/* 4. Scholarships */}
          <Section title={t('scholarshipsTitle')}>
            {detail.scholarships.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {detail.scholarships.map((s) => (
                  <Card key={s.id}>
                    <CardContent className="space-y-2 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-semibold text-foreground">
                          {s.name[appLocale]}
                        </h3>
                        <Badge variant="cta">{s.percentage}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {s.requirements[appLocale]}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t('scholarshipsNone')}</p>
            )}
          </Section>

          {/* 6. Dormitory */}
          <Section title={t('dormitoryTitle')}>
            {detail.dormitories.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {detail.dormitories.map((d) => (
                  <Card key={d.id}>
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-primary">
                        <HomeIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-foreground">
                          {formatCurrency(d.pricePerMonth, d.currency, locale)}
                          <span className="text-sm font-normal text-muted-foreground">
                            {' '}
                            / {t('month')}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t('capacity')}: {formatNumber(d.capacity, locale)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t('dormitoryNone')}</p>
            )}
          </Section>

          {/* 7. Gallery */}
          {detail.gallery.length > 0 && (
            <Section title={t('galleryTitle')}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {detail.gallery.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border"
                  >
                    <Image
                      src={src}
                      alt={`${detail.name} ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* 8. Reviews */}
          <Section
            title={t('reviewsTitle')}
            action={
              rating.count > 0 ? (
                <span className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-cta text-cta" />
                  <span className="font-semibold">{rating.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">
                    ({rating.count})
                  </span>
                </span>
              ) : null
            }
          >
            {reviews.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {reviews.map((r) => (
                  <Card key={r.id}>
                    <CardContent className="space-y-3 p-5">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={
                              i < r.rating
                                ? 'h-4 w-4 fill-cta text-cta'
                                : 'h-4 w-4 text-border'
                            }
                          />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">
                        “{r.text[appLocale]}”
                      </p>
                      <div className="flex items-center gap-3 border-t border-border pt-3">
                        <Avatar>
                          <AvatarFallback>{r.authorInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="flex items-center gap-1 text-sm font-semibold">
                            {r.authorName}
                            {r.verified && (
                              <BadgeCheck className="h-4 w-4 text-verified" />
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {r.authorCountry} · {r.programStudied[appLocale]}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t('reviewsNone')}</p>
            )}
          </Section>

          {/* 9. FAQ */}
          <Section title={t('faqTitle')}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f) => (
                <AccordionItem key={f.id} value={f.id}>
                  <AccordionTrigger>{f.question[appLocale]}</AccordionTrigger>
                  <AccordionContent>{f.answer[appLocale]}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Section>

          {/* 10. Related */}
          {related.length > 0 && (
            <Section title={t('relatedTitle')}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((u) => (
                  <UniversityCard
                    key={u.id}
                    university={u}
                    locale={appLocale}
                    listingMetadata={relatedMetadata.get(u.id)}
                  />
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Sticky apply sidebar */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card className="shadow-flat-hover">
            <CardHeader>
              <CardTitle className="text-base">{t('applyTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-surface-low p-4 text-center">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t('tuitionFrom')}
                </p>
                <p className="font-display text-2xl font-bold text-primary tabular-nums">
                  {minTuition
                    ? formatCurrency(minTuition, 'USD', locale)
                    : '—'}
                </p>
                <p className="text-xs text-muted-foreground">/ {t('year')}</p>
              </div>
              <Button asChild variant="cta" className="w-full gap-2">
                <Link href="/apply">
                  {t('applyCta')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full gap-2">
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  {t('whatsappCta')}
                </a>
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {t('applyNote')}
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* 11. Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 p-3 backdrop-blur md:hidden">
        <div className="container-page flex items-center gap-3 pe-20">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">{t('tuitionFrom')}</p>
            <p className="font-display text-sm font-bold text-primary">
              {minTuition ? formatCurrency(minTuition, 'USD', locale) : '—'}
              <span className="text-xs font-normal text-muted-foreground">
                {' '}/ {t('year')}
              </span>
            </p>
          </div>
          <Button asChild variant="cta" className="gap-2">
            <Link href="/apply">
              {t('applyCta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-display text-headline-md text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
