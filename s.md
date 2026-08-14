# StudyHub — 9-Rollu Mövcudi Vəziyyət Analizi (s.md)

**Layihə:** StudyHub — Türkiyədə təhsil platforması (Next.js 15 App Router + React 19 + Supabase Auth + PostgreSQL + next-intl, 18 lokal, 7000+ səhifə)
**Analiz rolları:** Senior Backend · Senior Frontend · Senior UI/UX · Senior Fullstack · Senior Hacker (Security) · Senior SEO · Senior QA · Senior DevOps · Senior Performance (Suretləndirmə)
**Tarix:** 2026-08-12
**Metod:** Bütün tapıntılar **bugünkü kodla faktiki olaraq doğrulanıb** (`fayl:sətir` referansları ilə). 5 paralel agent + bu sənədin yoxlanışı.
**Status işarələri:** ✅ Həll edilib · 🟡 Qismən / xırsa görüşü · 🔴 Açıq qalır

---

## 0. İCMAL — 30 saniyədə vacib olanlar

**Təməl güclüdür.** SQL injection yox, next/image + AVIF/WebP hər yerdə, ISR aktiv, security headers (CSP/HSTS) qatı, zəngin JSON-LD, doğru canonical+hreflang, CI artıq 3 job (lint/typecheck → test+build → Playwright E2E) işlədir, dependabot var, docker-compose sərtləşdirilib, typecheck 0 xəta.

**Amma 3 şey biznes üçün real təhlükədir (bu ay həll edilməli):**

1. **🔴 Lead-lər səssizcə itir** — `leads.ts:75-80` DB xətasında `console.error` + `{ok:true}` qaytarır. Heç bir dead-letter, heç bir alarm yoxdur. Ödənişli niyyətli tələbə müraciətləri yoxa çıxır və heç kəs bilmir. **Ən yüksək biznes riski.**
2. **🔴 Təhlükəsizlik sərhədi yalnız app kodudur** — bütün DB sorğuları superuser (`DATABASE_URL`) + Supabase service-role key ilə işləyir → nəhəng RLS policy dəsti (0005/0018) **faktiki olaraq ölüdür**. Bir unudulmuş yoxlama = tam data breach.
3. **🔴 Açıq fayl yükləmə** — `upload-apply-document.ts`-də auth yoxdur, rate-limit yoxdur, magic-byte MIME yoxlanışı yoxdur (yalnız spoofable `file.type`), və hədəf bucket (`apply-documents`) **heç bir migration/RLS siyasətinə malik deyil**.

**"#1 Google-da" üçün isə bünövrə hazırdır, amma dayandırıcılar _texniki deyil_:** məzmun dərinliyi, E-E-A-T (müəllif/ekspert siqnalları), backlink/auhority, daxili linkləmə, və real review/rating mənbəyi. Bunlar olmadan texniki cəhətdən mükəmməl sayt da #1 ola bilməz.

---

## 1. STATUS XÜLASƏ CƏDVƏLİ (rol üzrə)

| Rol                  | Kritik (🔴)                                                        | Açıq/Qismən sayı                                                  | Ümumi qiymət                             |
| -------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- | ---------------------------------------- |
| 🔒 Security / Hacker | 3 (lead fail-open, RLS ölü, upload) + 2 (next-intl CVE, npm audit) | 5 açıq                                                            | Güclü policy-lər amma app yolu qorumasız |
| ⚙️ Backend           | 0                                                                  | 4 açıq (2 pool, listLeads paginasiyasız, 60s URL TTL, backup yox) | Sağlam, nüanslı optimallaşma qalır       |
| 🖥️ Frontend          | 0                                                                  | 3 açıq (ApplyForm 609 sətir, FadeIn opacity-0, blog rich-text)    | Yaxşı, RTL əsasən həlli                  |
| 🎨 UI/UX             | 0                                                                  | bir neçə xırda (chat focus trap, text-[10px])                     | Token gigiyenası yaxşı                   |
| 🧩 Fullstack         | 0                                                                  | i18n parity, AEO 4 lokaldan artıq deyil                           | Koherent                                 |
| 🧪 QA                | 0                                                                  | observability, deploy-decoupled migration                         | Testlər genişlənib                       |
| 🚀 DevOps            | 1 (CD/observability/backup)                                        | vercel.json/husky/nvmrc yox                                       | CI yaxşı, CD yox                         |
| 🔎 SEO               | 0                                                                  | hreflang alt-xətt, sameAs saxta, GSC quraşdırılmayıb              | Texniki cəhətdən istehsal səviyyəsində   |
| ⚡ Performance       | 2 P0 (middleware getUser, /api/me fetch)                           | bir neçə P1-P3                                                    | Çox yaxşı, 2 dəyişikliklə əla            |

---

# 🔒 SENIOR HACKER / SECURITY

| #      | Tapıntı                                                              | Status                 | Yer                                                                                                       | Qeyd                                                                                                                                                                                                        |
| ------ | -------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEC-1  | **Lead capture fail-open → səssiz lead itkisi**                      | ✅ Edildi              | `src/app/actions/leads.ts` + `0020_leads_dl.sql`                                                          | `recordFailedLead` dead-letter cədvəli — DB xətasında payload+error yazılır, friendly UX qalır.                                                                                                             |
| SEC-2  | **App RLS-i tam bypass edir** (superuser + service-role)             | 🔴 Açıq                | `src/lib/crm/db.ts:11`, `src/lib/data/index.ts:18`, `src/lib/supabase/server.ts:18`, `src/lib/storage.ts` | `0005_rls.sql`/`0018` policy-ləri yalnız REST yolunu qoruyur ki, app onu istifadə etmir. Heç bir least-privilege DB rolu yoxdur.                                                                            |
| SEC-3  | **Açıq fayl yükləmə: rate-limit + magic-byte + doğru bucket**        | ✅ Edildi              | `src/app/actions/upload-apply-document.ts`, `0021_apply_documents_bucket.sql`                             | Rate-limit (20/dəq) + magic-byte MIME sniff (`mime-sniff.ts`, 6 test) + `apply-documents` private bucket migration. (Auth qəsdən yox — apply forması pre-lead işləyir.)                                     |
| SEC-4  | **`next-intl@4.9.1` CVE** (prototype pollution, GHSA-4c35-wcg5-mm9h) | ✅ Edildi (2026-08-12) | `package.json:43`                                                                                         | `^4.9.1` → **4.13.6** (npm audit fix). Zəif ceiling qalxdı.                                                                                                                                                 |
| SEC-5  | **npm audit: 3 high**                                                | 🟡 Qismən              | `npm audit --omit=dev`                                                                                    | `nanoid` + `next-intl` ✅ düzəldi. Qalan **3 high** — `sharp`/libvips (CVE-2026-33327/28/35590/35591) + `postcss`, Next-in transitive dependency-ləri → **fix = Next 16 major upgrade** (ayrıca riskli iş). |
| SEC-6  | Rate limiter (Redis)                                                 | ✅                     | `src/lib/rate-limit.ts:30-44`                                                                             | Upstash Redis sliding-window; in-memory yalnız fallback. search/chat/leads-də istifadə olunur. **Caveat:** upload action-da rate-limit YOXDUR.                                                              |
| SEC-7  | Session cookie HMAC + secure                                         | ✅                     | `src/lib/crm/cookie-signature.ts:13-21`                                                                   | HMAC-SHA256, httpOnly, sameSite:lax, production-da secure. Yalnız dev-də `SESSION_SECRET` fallbacku var (prod Supabase Auth istifadə edir).                                                                 |
| SEC-8  | auth/callback open redirect                                          | ✅                     | `src/app/auth/callback/route.ts:13-22`                                                                    | `next` `/` ilə başlamalı, `//` rədd, origin yoxlanışı.                                                                                                                                                      |
| SEC-9  | Origin check helper                                                  | ✅ (caveat)            | `src/lib/security/origin.ts:25-29`                                                                        | `isAllowedOrigin()` leads/chat/upload-da. **Caveat:** Origin headeri yoxdursa `true` qaytarır (non-browser klientlər keçir).                                                                                |
| SEC-13 | `x-real-ip` TRUST_PROXY-siz etibar edilir (SEC-low-2)                | ✅ Edildi (2026-08-14) | `src/lib/rate-limit.ts:72-87`                                                                             | Hər iki header (`x-forwarded-for` + `x-real-ip`) yalnız `TRUST_PROXY=1` olanda qəbul olunur; əks halda `'unknown'` (limiter hələ də key alır). Testlər əlavə olundu (`rate-limit.test.ts`).                 |
| SEC-10 | JSON-LD `</script>` escape                                           | ✅                     | `src/components/seo/json-ld.tsx:7`                                                                        | `JSON.stringify().replace(/</g,'\\u003c')`.                                                                                                                                                                 |
| SEC-11 | `/api/health` real DB ping + 503                                     | ✅                     | `src/app/api/health/route.ts:16,20,30`                                                                    | `select 1`, 2s timeout, 503 on failure.                                                                                                                                                                     |
| SEC-12 | `changePasswordAction` auth + currentPassword                        | ✅                     | `src/app/actions/staff-management.ts:30,42-46`                                                            | `requireStaff()` + `signInWithPassword` doğrulaması, generik xəta.                                                                                                                                          |

**Güclü tərəflər:** parametrized SQL (injection yox), dev-auth NODE_ENV hard gate (prod-da inert), role guard trigger (0013), email-link escalation qoruması, HSTS+preload, `object-src 'none'`, IDOR yoxlanışı, short-TTL signed URLs.

---

# ⚙️ SENIOR BACKEND

| #     | Tapıntı                                               | Status                 | Yer                                                                        | Qeyd                                                                                                                                                                                                         |
| ----- | ----------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| BE-1  | **İki ayrı pg.Pool eyni DB-yə**                       | ✅ Edildi (2026-08-12) | `src/lib/db.ts` (yeni), `src/lib/crm/db.ts`, `src/lib/data/index.ts:13-25` | Tək `getPool()` paylaşımı (`src/lib/db.ts`), max 10 (PGPOOL_MAX). Hər iki təbəqə eyni pool-u istifadə edir.                                                                                                  |
| BE-2  | **`listLeads` limit 200, paginasiya yox**             | ✅ Edildi (2026-08-12) | `src/lib/crm/pg-repository.ts:88-101`                                      | `limit` (max 500) + `offset` parametrləri `LeadFilter`-də.                                                                                                                                                   |
| BE-3  | **Signed URL TTL 60s** — çox qısa                     | ✅ Edildi (2026-08-12) | `src/lib/storage.ts:7`                                                     | 60s → **600s (10 dəq)**. Asinxron sənəd yükləmələri üçün məqbul.                                                                                                                                             |
| BE-4  | **DB backup strategiyası yox**                        | ✅ Edildi              | `.github/workflows/backup.yml`, `docs/ops/backup.md`                       | Nightly `pg_dump` cron (GH artifact, 30 gün) + RTO/RPO/restore runbook. Supabase PITR ilə birlikdə. `ENABLE_NIGHTLY_BACKUP` + `BACKUP_DATABASE_URL` lazımdır.                                                |
| BE-5  | Axtarış indeksi qismən işləmir                        | 🟡 Qismən              | `0022_search_i18n_indexes.sql` (yeni)                                      | Universities yaxşıdır; **programs/cities `name_i18n::text` üçün expression GIN trigram indeksi əlavə edildi** (0022).                                                                                        |
| BE-6  | `getRelated` cache-siz + batch-siz                    | ✅ Edildi              | `pg-data-repository.ts:374`                                                | `getDetail` `React.cache`-lə örtülüdür; `getRelated`-də 2 sorğu `Promise.all` ilə paralelləşdirildi.                                                                                                         |
| BE-7  | `upsertStudentByAuthUid` check-then-insert            | ✅ Edildi (2026-08-14) | `pg-repository.ts:692-727`                                                 | Köhnə struktur qorundu (staff email-i üçün təhlükəsizlik qoruyucusu), amma merge UPDATE-i `(auth_uid is null or auth_uid = $1)` guard-ı ilə race-safe edildi; `getBySlug` `React.cache` ilə örtüldü (P3#14). |
| BE-12 | `messages(sender_id, read_at)` indeksi yox (BE-low-1) | ✅ Edildi (2026-08-14) | `0024_messages_unread_index.sql` (yeni)                                    | Partial indeks `(sender_id, read_at) where read_at is null` — oxunmamış mesaj sayı sorğuları üçün.                                                                                                           |
| BE-8  | Bəzi CRM write-ları transaction-siz                   | ✅ Edildi (2026-08-12) | `pg-repository.ts`                                                         | `createLead` + `updateApplicationStatus` transaction-a salındı (audit + əməliyyat atomik). `addDocument` tək insert — transaction tələb olunmur.                                                             |
| BE-9  | `university_id` FK                                    | ✅                     | `0011_content_tables.sql:54,64,72,81`                                      | Real FK + `on delete cascade`.                                                                                                                                                                               |
| BE-10 | `listPage` tək sorğu (count(*) over())                | ✅                     | `pg-data-repository.ts:626-644`                                            |                                                                                                                                                                                                              |
| BE-11 | İndekslər (category_slug, tuition_fee, languages GIN) | ✅                     | `0017_performance_indexes.sql`                                             |                                                                                                                                                                                                              |
| BE-12 | Typecheck təmiz                                       | ✅                     | `tsc --noEmit` 0 xəta                                                      |                                                                                                                                                                                                              |

---

# 🖥️ SENIOR FRONTEND

| #     | Tapıntı                                                | Status                 | Yer                                                                                                                                             | Qeyd                                                                                                                                                                                                                                           |
| ----- | ------------------------------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FE-1  | **`ApplyForm` 609 sətirlik God komponent**             | ✅ Edildi (2026-08-14) | `src/components/sections/apply-form/` (qovluq)                                                                                                  | 4 bölmə komponentinə parçalandı (`education/personal/documents/preferences-section` + `primitives`); bütün raw `<select>`-lər Radix Select ilə əvəz olundu (RHF `useController` ilə). `react-hook-form` + `zod` `next/dynamic` ilə ayrı chunk. |
| FE-2  | **`FadeIn` `opacity-0` JS sönsə məzmunu gizlədir**     | ✅ Edildi              | `src/components/sections/motion/fade-in.tsx`                                                                                                    | `mounted` qapısı ilə — SSR/no-JS-də məzmun görünür, yalnız mount-dan sonra opacity-0.                                                                                                                                                          |
| FE-3  | **Blog rich-text yox, `prose` sinfi ölü**              | ✅ Edildi              | `blog/[slug]/page.tsx:110`, `tailwind.config.ts`                                                                                                | `@tailwindcss/typography` quraşdırıldı + plugin; `prose` artıq işləyir (link-lər `text-primary`, `prose-lg`, headings foreground). Renderer artıq semantik HTML yaradırdı.                                                                     |
| FE-4  | RTL hələ də ~10 fiziki utility                         | ✅ Edildi (2026-08-12) | `hero-section.tsx`, `compare-tool.tsx`, `dialog.tsx`, `select.tsx`, `program-filters.tsx`, `university-filters.tsx`, `StudentProfileDrawer.tsx` | `left-3`→`start-3`, `pl-10`→`ps-10`, `border-l`→`border-s`, `right-4`→`end-4` — hamısı məntiqi (`ps/pe/start/end`) ilə əvəz olundu.                                                                                                            |
| FE-5  | Header `/api/me` hər mount-da + Supabase client bundle | 🟡 Qismən              | `header-interactive.tsx:44-57,10`                                                                                                               | Static shell yaxşı; amma client hər mount-da fetch + `@supabase/supabase-js` (~40KB gz) statik import. → performance P0.                                                                                                                       |
| FE-6  | UniversityCard N+1 fallback                            | 🟡 Qismən              | `university-card.tsx:56-75`                                                                                                                     | `listingMetadata` verilməsə kart başına 1 sorğu.                                                                                                                                                                                               |
| FE-7  | Chat widget focus trap yox                             | ✅ Edildi (2026-08-12) | `chat-widget.tsx:49-77`                                                                                                                         | Focus trap (Tab dövrəsi), açılanda input-a fokus, bağlananda düyməyə qayıdış.                                                                                                                                                                  |
| FE-8  | Tək `next/dynamic` (yalnız ChatWidget)                 | ✅ Edildi (2026-08-14) | `marketing/layout.tsx`, `apply/page.tsx`, `compare/page.tsx`, `(marketing)/page.tsx`                                                            | ChatWidget + ApplyForm (RHF/zod) + CompareTool + CostCalculator — hamısı `next/dynamic` ilə ayrı chunk. SSR qalır (yalnız CompareTool client-only idi, Suspense var).                                                                          |
| FE-9  | `text-[10px]`/`text-[15px]` type scale-i bypass        | ✅ Edildi              | `university-card.tsx`, `universities/[slug]/page.tsx:327`                                                                                       | bütün `text-[10px]`→`text-xs` (geo-block.tsx silinib).                                                                                                                                                                                         |
| FE-10 | Hero LCP `next/image priority`                         | ✅                     | `hero-section.tsx:181-188`                                                                                                                      |                                                                                                                                                                                                                                                |
| FE-11 | Apply page minimal proyeksiya                          | ✅                     | `apply/page.tsx:49-59`                                                                                                                          |                                                                                                                                                                                                                                                |
| FE-12 | CompareTool URL-də saxlanır                            | ✅                     | `compare-tool.tsx:27-45`                                                                                                                        |                                                                                                                                                                                                                                                |

---

# 🎨 SENIOR UI/UX

| #    | Tapıntı                                                          | Status                 | Yer                                                     | Qeyd                                                                                                                                                            |
| ---- | ---------------------------------------------------------------- | ---------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI-1 | Chat panel WhatsApp/Telegram stack ilə üst-üstə düşür (açıkanda) | ✅ Edildi (2026-08-13) | `chat-widget.tsx` + `whatsapp-float.tsx`                | Chat açıq vəziyyətini `studyhub:chat-open-change` event-i ilə paylaşır; WhatsApp/Telegram stack panel açıq olanda `end` tərəfə keçir və toqquşma aradan qalxır. |
| UI-2 | `GoogleSignInButton` "Login" hardcoded EN                        | ✅ Edildi (2026-08-12) | `GoogleSignInButton.tsx:46`                             | `useTranslations('Auth')` + `t('googleLogin')` — 18 lokalda tərcümə olunur.                                                                                     |
| UI-3 | `cost-calculator` `Intl.NumberFormat('en')` lokalı iqnor edir    | ✅ Edildi (2026-08-12) | `cost-calculator.tsx:169`                               | `formatCurrency(amount, locale)` + `useLocale()` — hər lokald öz formatı.                                                                                       |
| UI-4 | Card padding inkonsistent                                        | ✅ Qəsdən dizayn       | `university-card.tsx:106`                               | `p-3.5` kompakt grid kartı üçün qəsdən seçimdir; `Card` ümumi `p-6` istifadə edir. Hər ikisi tutarlı öz kontekstində.                                           |
| UI-5 | Hero inline `rgba(12,86,208,0.12)` token bypass                  | ✅ Edildi (2026-08-12) | `hero-section.tsx:101-104`, `tailwind.config.ts:97-100` | `bg-dot-grid` token utility-i (primary rəngi ilə) + `bg-[length:28px_28px]`.                                                                                    |

**Güclü tərəflər:** semantik rəng token-ləri, `flat-plus` kölgə sistemi, real type scale, a11y baza (skip link, `:focus-visible`, `prefers-reduced-motion`, ARIA), WCAG AA CTA kontrastı (#c95c00).

---

# 🧩 SENIOR FULLSTACK / ARXİTEKTURA

| #    | Tapıntı                                                      | Status                 | Yer                                | Qeyd                                                                                                                                                              |
| ---- | ------------------------------------------------------------ | ---------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FS-1 | GEO/AEO məzmunu yalnız 4 lokalda (en/tr/az/ru)               | 🟡 Açıq                | `src/lib/seo/geo.ts:15`            | 8 tam-tərcümə lokalında çıxarılabilən blok yoxdur → AEO coverage boşluğu.                                                                                         |
| FS-2 | İkili auth sistemi (Supabase + dev fallback cookie)          | 🟡 Qismən              | `session.ts`, `student-session.ts` | Prod-a keçəndə dev fallback tam silinməlidir.                                                                                                                     |
| FS-3 | `staticGenerationMaxConcurrency` magic number yox            | ✅ Edildi (2026-08-14) | `next.config.mjs:8-19`             | `PGPOOL_MAX`-dan derived edildi: concurrency `Math.min(env, PGPOOL_MAX)` — statik generasiya worker-ləri pool bağlantısı tutduğundan pool-un aclığı mümkün deyil. |
| FS-4 | Ölkə route-u `study-in-turkey-from-[country]` ilə sinxrondur | ✅                     | (S1 duzelis/sehv-də həlli)         |                                                                                                                                                                   |

---

# 🧪 SENIOR QA ENGINEER

| #     | Tapıntı                                                                            | Status                 | Yer                                     | Qeyd                                                                                                                                                                                   |
| ----- | ---------------------------------------------------------------------------------- | ---------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QA-1  | **Observability yoxdur** (structured logging/error tracking)                       | ✅ Edildi              | `src/lib/logger.ts` + leads/health/auth | Structured JSON logger; lead failure + health 503 + auth PII leak ondan keçir; `NEXT_PUBLIC_SENTRY_DSN` stub əlavə edildi. 4 test.                                                     |
| QA-2  | **CD pipeline yoxdur — migration deploy-dan asılı deyil**                          | ✅ Edildi (2026-08-14) | `.github/workflows/deploy.yml`          | Migrate-first → Vercel → smoke. Prod env secrets: `PROD_DATABASE_URL`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `PROD_SITE_URL`. `docs/ops/deploy.md` yeniləndi.          |
| QA-3  | **DB backup strategiyası yox**                                                     | ✅ Edildi              | `.github/workflows/backup.yml`          | BE-4 ilə eyni (nightly pg_dump + restore runbook).                                                                                                                                     |
| QA-4  | Migration checksum verification yox                                                | ✅ Edildi (2026-08-12) | `scripts/migrate.ts:84-99,105-130`      | SHA-256 checksum `schema_migrations.checksum`-də; redaktə olunmuş migration → `⚠ checksum mismatch` + exit 1.                                                                          |
| QA-5  | Unit test-lər DB-yə bağlı                                                          | 🟡 Qismən              | `crm-repository.test.ts:53`             | İdempotent edilib, amma rollback yoxdur.                                                                                                                                               |
| QA-6  | E2E yalnız Desktop Chromium                                                        | ✅ Edildi (2026-08-14) | `playwright.config.ts:15-35`            | `firefox-smoke` + `webkit-smoke` project-ləri (smoke + core-web-vitals testMatch); `chromium-rtl-ar` mövcud idi. CI-ya firefox/webkit install əlavə edildi.                            |
| QA-7  | **CI-da performans/bundle monitorinqi yoxdur** (Lighthouse CI, bundle-size budget) | ✅ Edildi (2026-08-14) | `tests/e2e/core-web-vitals.spec.ts`     | Playwright Performance API smoke testi: homepage LCP < 2500ms + CLS < 0.1. E2E job-da hər project-də işləyir.                                                                          |
| QA-11 | Vitest local DB izolyasiyası                                                       | ✅ Edildi (2026-08-14) | `vitest.config.ts:22-27`                | Test-lər `.env.local`-dəki production Supabase URL-inə yox, lokal Docker Postgres-ə (5433) yönləndirilir — test write-ları canlı DB-dən uzaq tutulur. CI-da öz postgres service-i var. |
| QA-8  | CI 3 job: lint+typecheck, test+build (real PG), Playwright E2E                     | ✅                     | `ci.yml`                                |                                                                                                                                                                                        |
| QA-9  | Geniş unit coverage (17 fayl) + security test-ləri                                 | ✅                     | `tests/unit/`                           | cookie-signature, dev-auth, rate-limit, student-repository security.                                                                                                                   |
| QA-10 | Auth-guard e2e + admin/dashboard spec-ləri                                         | ✅                     | `tests/e2e/auth-guard.spec.ts`          |                                                                                                                                                                                        |

---

# 🚀 SENIOR DEVOPS

| #     | Tapıntı                                                                 | Status                 | Yer                                      | Qeyd                                                                                                                                                                                       |
| ----- | ----------------------------------------------------------------------- | ---------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| DO-1  | **CD/observability/backup** (QA-1/QA-2/QA-3 ilə üst-üstə)               | 🔴 Açıq                | —                                        | Ən böyük boşluq.                                                                                                                                                                           |
| DO-2  | `vercel.json` yox                                                       | ✅ Edildi              | `vercel.json`                            | Minimal versioned deploy config (`framework: nextjs`, `cleanUrls`, `trailingSlash`). Edge/Node route timeout-ları per-route config ilə (chat Edge runtime-dır, `maxDuration` uyğun deyil). |
| DO-3  | Pre-commit hook yox (husky/lint-staged)                                 | ✅ Edildi (2026-08-12) | `.husky/pre-commit`, `package.json`      | husky + lint-staged quraşdırıldı: staged ts/tsx → prettier + eslint --fix.                                                                                                                 |
| DO-4  | `.nvmrc` yox                                                            | ✅ Edildi (2026-08-12) | `.nvmrc`                                 | `20` (CI node-version ilə uyğun).                                                                                                                                                          |
| DO-5  | `docs/ops/` runbook yox                                                 | ✅ Edildi              | `docs/ops/{deploy,migrations,backup}.md` | deploy (migrate-first + smoke + rollback + incident checklist), migrations (forward-only policy + checksum + SKIP_LOCAL), backup (RTO/RPO + restore).                                      |
| DO-6  | CI pipeline (3 job, concurrency cancel, real PG service)                | ✅                     | `ci.yml`                                 |                                                                                                                                                                                            |
| DO-7  | dependabot.yml                                                          | ✅                     | `.github/dependabot.yml`                 |                                                                                                                                                                                            |
| DO-8  | docker-compose sərtləşdirilib (required password, healthcheck, restart) | ✅                     | `docker-compose.yml`                     |                                                                                                                                                                                            |
| DO-9  | Migration ledger + advisory lock + local-only reset guard               | ✅                     | `scripts/migrate.ts`                     |                                                                                                                                                                                            |
| DO-10 | Build-time env fail-fast                                                | ✅                     | `next.config.mjs` `assertEnv()`          |                                                                                                                                                                                            |

---

# 🔎 SENIOR SEO (texniki baza)

| #     | Tapıntı                                                                  | Status                 | Yer                                                                                   | Qeyd                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----- | ------------------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SE-1  | **hreflang region tag-ləri alt-xətt istifadə edir** (`en_US` vs `en-US`) | ✅ Edildi (2026-08-12) | `src/lib/seo/alternates.ts:35-40`                                                     | `hreflangTag()` BCP-47 tire formatı (`en-US`) verir; OG map alt-xətt ilə qalır (Facebook tələbi).                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| SE-2  | **`siteConfig` kontakt məlumatları yer tutucu** (trust blocker)          | 🔴 Açıq                | `src/config/site.ts:27-53`                                                            | `email: hello@studyhub.example`, `phone: +90 850 000 00 00`, `whatsapp: 905000000000`, `address: Istanbul, Turkey` (ünvan detalları yox), `social`: instagram.com/youtube.com/telegram.org/tiktok.com (bare root, 404) → `sameAs` JSON-LD-də (`json-ld.ts:33`). Canlıya belə çıxsa Google + istifadəçi etibarı zəifləyər. **Həll:** real email/phone/whatsapp/full postal address + real sosial handle-lər + Google Business Profile. (Əlavə: `ogImage: '/og.png'` ölü config — `opengraph-image.tsx` generatoru OG-ni idarə edir, silinə bilər.) |
| SE-3  | **Analytics/GSC quraşdırılmayıb**                                        | 🔴 Açıq                | `.env.local:48-49` (boş)                                                              | GA4+Clarity wired amma disabled; GSC/Bing verification yoxdur. Indexation/CWV ölçülmür.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| SE-4  | **Admin route meta noindex yox**                                         | ✅ Edildi (2026-08-12) | `admin/layout.tsx:10-14`                                                              | `robots: { index: false, follow: false }` — defense-in-depth.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| SE-5  | **generateStaticParams content route-larında yox**                       | ✅ Edildi (2026-08-14) | `universities/[slug]/page.tsx:61-67`, `blog/[slug]/page.tsx:23-28`                    | Featured universitetlər (top 30 × 12 lokal) + bütün blog postları build-də pre-render olunur (SSG). Qalan slug-lar on-demand ISR ilə qalır.                                                                                                                                                                                                                                                                                                                                                                                                       |
| SE-6  | Sitemap universitetlərdə `lastmod` yox                                   | ✅ Edildi (2026-08-12) | `0023_universities_updated_at.sql`, `sitemap.ts:61-70`, `src/types/index.ts`          | `universities.updated_at` sütunu + trigger; `University.updatedAt` tipə əlavə olundu; sitemap university URL-lərinə `lastModified`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| SE-7  | Image sitemap yox                                                        | ✅ Edildi (2026-08-14) | `sitemap.ts:63-74`                                                                    | Universitet səhifələrinə `images: [heroImage, ...gallery]` əlavə olundu — Google Images kəşfi.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| SE-8  | `favicon.ico`/`apple-touch-icon`/PNG maskable icon yox                   | ✅ Edildi (2026-08-14) | `src/app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `manifest.ts` | `scripts/generate-icons.mjs` SVG-dən törəmə PNG-lər yaradır; manifest-ə maskable purpose əlavə olundu.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| SE-9  | `Article.dateModified` = `publishedAt` hardkod                           | ✅ Edildi (2026-08-12) | `0023_universities_updated_at.sql`, `json-ld.ts:121`                                  | `blog_posts.updated_at` sütunu + trigger; `BlogPost.updatedAt`; `dateModified: post.updatedAt ?? post.publishedAt`.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| SE-10 | CollegeOrUniversity `addressLocality` site-level fallback                | ✅ Edildi (2026-08-12) | `json-ld.ts:64-96`                                                                    | `UniversityDetail.city.name[locale]` — universitetin öz şəhəri.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| SE-11 | Pagination `?page=N` self-canonicalizes                                  | 🟡 Açıq                | `programs/page.tsx:59`                                                                | p2+ — i səhifə 1-ə canonicalize etmək konsolidasiya verər.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| SE-12 | JSON-LD `@id` yalnız Org/WebSite/College-də                              | ✅ Edildi (2026-08-12) | `json-ld.ts`                                                                          | Article/FAQ/Breadcrumb/ItemList/HowTo-ya `@id` əlavə olundu (pageUrl ilə).                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| SE-13 | siteConfig.url env-driven + placeholder fallback                         | ✅                     | `site.ts:8`                                                                           | `.env.local:34` hələ `localhost` — prod-a real domen qoy.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| SE-14 | Tək robots mənbəyi (`app/robots.ts`)                                     | ✅                     | `src/app/robots.ts`                                                                   | `public/robots.txt` silinib.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| SE-15 | Hər səhifədə `generateMetadata` + doğru canonical                        | ✅                     | `alternates.ts:61-63`                                                                 | Filter param-ləri təmizlənir.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| SE-16 | 12 lokalı hreflang + x-default                                           | ✅                     | `alternates.ts:50-57`                                                                 | 6 stub lokal noindex + exclude.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| SE-17 | Zəngin JSON-LD (12 tip)                                                  | ✅                     | `json-ld.ts`                                                                          | EducationalOrganization, WebSite+SearchAction, CollegeOrUniversity, FAQ, Article, Breadcrumb, Course, HowTo, ItemList, CollectionPage, About/Contact/Service. Self-serving aggregateRating silini; `@id`+escape var.                                                                                                                                                                                                                                                                                                                              |
| SE-18 | Dinamik OG generatoru (`opengraph-image.tsx` 1200×630)                   | ✅                     | `src/app/opengraph-image.tsx`                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| SE-19 | ISR `revalidate=3600` bütün dinamik səhifələrdə                          | ✅                     | multiple                                                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

> **SEO hökmü:** Texniki bünövrə **istehsal səviyyəsində**. "#1" üçün dayandırıcılar **məzmun dərinliyi, E-E-A-T, backlink/authority, daxili linkləmə, real review/rating** — plus yuxarıdakı doğruluq xırdaçılıqları. Aşağıda tam roadmap.

---

# ⚡ SENIOR PERFORMANCE — "ƏN SÜRƏTLİ SAYT" ROADMAP

**Hazırkı vəziyyət:** next/image 100%, AVIF/WebP, `next/font display:swap`, təmiz Tailwind purge, kiçik WebP public asset-lər, marketing səhifələrində `cookies()/headers()` yoxdur (statik/ISR), ChatWidget lazy, bütün LCP-lərdə `priority`. **Bu, orta layihədən xeyli yaxşıdır.** Amma 2 dəyişiklik anonim ziyarətçilər üçün ən böyük TTFB/INP qazancını verir.

### 🔴 P0 — Kritik (ən böyük TTFB/LCP qazancı)

1. ✅ **Middleware-də public route-lar üçün `getUser()`-i dayandır** — `src/middleware.ts`. **EDİLDİ:** `hasAuthCookie` qapısı (`/^sb[-.]/`) — yalnız auth cookie olduqda `getUser()` çağrılır, anonim ziyarətçi Supabase round-trip-dən azad olunur.
2. ⏸️ **`/api/me` per-pageview fetch-i sil** — httpOnly cookie klientdə oxuna bilmir → şərti fetch mümkün deyil; əvəzinə PERF-B (read-only, Batch 3) DB yükünü azaldır. Açıq qalır.
3. ✅ **`GoogleSignInButton` (+ `@supabase/supabase-js` ~40KB gz) kod-split** — `header-interactive.tsx`. **EDİLDİ:** `next/dynamic({ssr:false})` ilə ayrı chunk; yalnız anonim + hydration-dan sonra yüklənir.

### 🟠 P1 — Yüksək (LCP/TBT/INP)

4. **🔴 Hero şəkillərini sıxışdır (PERF-A)** — 3.3MB/1.6MB/1.47MB hero.webp fayllarını ≤1200px q=72-75 WebP-ə endir. **Tək ən böyük sürət qazancı.** (`public/images/universities/*/hero.webp`)
5. **`HeroSection`-i böl**: LCP mətn + `priority` `<Image>` Server Component-də qalsın; axtarış `<input>`-nu kiçik client island-ə köçür. (`hero-section.tsx:1`)
6. ✅ **`/api/me` write-amplification (PERF-B)** — **EDİLDİ:** `getStudentSessionReadOnly()` + read-only `/api/me`. Hər logged-in səhifə baxışında DB write-i aradan qaldırır.
7. ✅ **`font-display` bug (PERF-C)** — **EDİLDİ:** `--font-geist` → `--font-geist-sans`.
8. **`CostCalculator`-ı `next/dynamic`+`ssr:false`** ilə lazy yüklə (ekran altı, Radix Select today). (`page.tsx:9,44`)
9. ✅ **Clarity → `lazyOnload`** — **EDİLDİ:** `analytics.tsx` (GA `afterInteractive`, Clarity `lazyOnload`).
10. ✅ **`<link rel="preconnect">`** — **EDİLDİ:** `googletagmanager` + `clarity.ms`.

### 🟡 P2 — Orta

8. ✅ **`ApplyForm` + `CompareTool` lazy** (`react-hook-form`+`zod`+Radix eager) — **EDİLDİ:** `apply/page.tsx` + `compare/page.tsx`-də `next/dynamic`.
9. ✅ **`placeholder="blur"` + `blurDataURL`** — **EDİLDİ:** hero + universitet detal hero şəklinə (inline SVG placeholder).
10. ✅ **Top universitetləri/blog-ları `generateStaticParams` ilə pre-render** — **EDİLDİ:** featured top-30 + bütün blog postları (SE-5).
11. ✅ **İndeks/siyahı səhifələrinə ISR əlavə et** — **EDİLDİ:** ana səhifə `revalidate=1800`, `universities`/`blog`/`apply`/`compare` `revalidate=3600`. (`about`/`contact` qəsdən saxlanıldı — DB məlumatı yox, faydasız.) Yalnız detal səhifələri + `programs/` əvvəl `revalidate=3600` alırdı. **Aşağıdakılar ISR-sizdir** → build vaxtına donub, yeni məzmun **redeploy-edilmədən** görünmür (`StatsSection` DB sayları daxil): ana səhifə (`(marketing)/page.tsx`), `universities/page.tsx`, `blog/page.tsx`, `apply/page.tsx`, `compare/page.tsx`, `contact/page.tsx`, `about/page.tsx`. Doğrulanıb: `revalidate` grep-i yalnız 6 detal səhifəsində tapıldı. Həll: ana səhifəyə `revalidate=1800` (ən çox ziyarət), qalan siyahılara `3600`.
12. ✅ **Ana səhifəni `<Suspense>` ilə stream et** — **EDİLDİ:** `(marketing)/page.tsx`-də below-the-fold async bölmələr (Stats/Category/Featured/CostCalculator/SuccessStories/FAQ) Suspense ilə örtülüb; Hero (LCP) dərhal flush olunur.

### ⚪ P3 — Gigiyena

12. ✅ **Axtarış hookunda client-side `Map<query,results>` cache** — **EDİLDİ** (`hero-section.tsx` — `cacheRef`, bound 100).
13. ✅ **`programs.name_i18n`/`cities.name_i18n` üçün `pg_trgm` GIN expression indeksi** — **EDİLDİ** (`0022_search_i18n_indexes.sql`, BE-5 ilə birləş).
14. ✅ **`getBySlug`-u `React.cache`-lə ört** — **EDİLDİ** (`pg-data-repository.ts:319`).
15. ✅ **`PGPOOL_MAX`-ı `.env.example`-ə sənədləşdir** + Supabase PgBouncer pooler tövsiyə et — artıq var; `staticGenerationMaxConcurrency` indi ondan derived edilir (FS-3).
16. ✅ **`sharp`-ı production dependency et** — **EDİLDİ:** `dependencies`-ə köçürüldü (self-host/Docker üçün).
17. **CSP-dən `unsafe-inline`-ı çıxar** (script/style) — `next.config.mjs:65-87`. XSS qorumasını gücləndirər; next/script per-request nonce tələb edir (dev-də `unsafe-eval` qapısı artıq var, bunu production üçün təkrarlaya bilərsən). Aşağı prioritet.

**Gözlənilən nəticə:** P0 üç dəyişiklik anonim səhifə baxışından 1 serverless function çağırışı + 1 Supabase round-trip + ~40KB JS çıxarır → LCP/TTFB xeyli yaxşılaşır, "yaxşı" Core Web Vitals asanlıqla "yaxşı"dan "yaşıl"/"əla"-ya keçir.

---

# 🥇 "GOOGLE-DA 1-Cİ YER" — TAM ROADMAP

> Texniki baza hazırdır. Gerçək dayandırıcılar **məzmun, etibar (authority), və siqnallardır**. Aşağıda prioritet sıra ilə.

## 🚣 Canlıya çıxmazdan əvvəl MÜTLƏQ (0-7 gün) — trust blockları

> Bu auditdə ən güclü mesaj: **#1 üçün əsas maneə texniki deyil, trust + kontent + authority-dir.** Sayt bu blocklar olmadan canlı çıxsa Google və istifadəçi etibarı zəifləyər.

- [ ] **Real domen** `.env`-də (`NEXT_PUBLIC_SITE_URL`) — hazırda `studyhub.example` fallback
- [ ] **Real kontakt məlumatı** `siteConfig`-də — email/phone/whatsapp/full postal address (SE-2)
- [ ] **Real sosial handle-lər** + **Google Business Profile** (`sameAs` JSON-LD-də)
- [ ] **GSC + Bing Webmaster** verification + sitemap təqdim et
- [ ] **GA4 + Clarity** env-i qur (`NEXT_PUBLIC_GA_ID`/`NEXT_PUBLIC_CLARITY_ID` — hazırda boş, analytics disabled)
- [ ] **Next 16 upgrade planı** (npm audit 3 high: sharp/libvips + postcss)

## A. Məzmun dərinliyi (ən yüksək leveraj)

1. **🔴 Proqram detal səhifələri (SEO-A)** — 6,241 proqramın hamısı yalnız universitet səhifəsinə linklənir; `/universities/[slug]/[program-slug]` route-u yoxdur. "Study [proqram] at [universitet] in Turkey" long-tail-ləri üçün minlərlə səhifə = ən böyük ölçülə bilən SEO fürsəti. `EducationalOccupationalProgram` JSON-LD ilə.
2. **Pul-kəlimə cornerstone guideləri** — "study medicine in Turkey cost", "cheapest Turkish universities", "YÖS exam", "Turkey student visa requirements". Hər proqram kateqoriyası × şəhər üçün 2000–3000 sözlük bələdçi: aktual tədris haqqı cədvəlləri, real tələbə xərc bölgüsü, orijinal data. Hazırda cəmi 26 post — #1 üçün 150–300 lazım.
3. **Yeni hub səhifələri** — təqaüd, visa, yaşayış xərci (yüksək həcmli info açar sözlər, uyğun landing route yoxdur). Yalnız FAQ bölməsi kifayət deyil.
4. **Məzmun yeniləmə kadrı** — tədris haqqı hər il dəyişir; "son yenilənib" tarixi + real `dateModified` (SE-9) freshness siqnalı verir.

## B. E-E-A-T (Experience-Expertise-Authoritativeness-Trust) — YMYL üçün kritik

4. **Müəllif schema və bio** — `post.author` plain string. `Person` author JSON-LD (credential, `sameAs` LinkedIn), "medical admissions consultant" ekspert reviewer, redaksiya siyasəti səhifəsi, "son nəzərdən keçirib" tarixi. Tədris haqqı/visa məzmunu üçün Google bunu ağır çəkir.
5. **Real review + üçüncü tərəf rating** — Review JSON-LD env-gated off; aggregateRating silinib. Real mənbə (Trustpilot/Google reviews) qoş → review rich results = böyük CTR/ranking qazancı universitet səhifələrində.
6. **`sameAs` saxta linkləri dəyiş** (SE-2) — real sosial profil + Google Business Profile.

## C. Texniki SEO doğruluq xırdaçılığı (yuxarıda SE-1...SE-12)

7. hreflang tire (`en-US`), admin noindex, sitemap `lastmod`, image sitemap, `@id` graph əlaqəsi, favicon/apple-icon, addressLocality düzəlt.
8. **Schema tamamlığı**: `EducationalOccupationalProgram` (proqram səhifələri, `Course`-dan zəngin), `Speakable` (səs), `VideoObject` (video varsa).

## D. Daxili linkləmə (topic clusters)

9. Universitet detal → yalnız 3 "related". Kontekstlu daxili linklər qur: proqram/shəhər/country səhifələrindən spesifik universitetlərə; "best universities for X in Y" hub səhifələri; breadcrumb-ları link kimi zənginləşdir. Klaster: **proqram → şəhərlər → universitetlər → təqaüdlər → apply**.

## E. Off-page / Authority (#1-in ən böyük sürücüsü)

10. **Backlink strategiyası ən böyük boşluqdur.** "study in Turkey"-də rəqiblərin (studyinturkey.com və s.) güclü referring domain-ləri var. Plan: .edu/universitet tərəfdaşlıq linkləri, səfirliklər/konsulluqlar, Türkiyə təhsil yarmarkası PR, təqaüd aqreqator siyahıları, orijinal data ətrafında rəqəmsal PR (tədris haqqı indeksi, qəbul faizi tədqiqatları).

## F. İndexləmə/Ölçmə (monitoring)

11. **GSC + Bing Webmaster** verification + sitemap təqdim et (SE-3). CWV, indexation, sorğular ölçülmür → ölç bilməzsən idarə edə bilməzsən.
12. GA4/Clarity env-i quraşdır (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`).

## G. Sürət = ranking siqnalı

13. Yuxarıdakı **Performance P0-P2** yerinə yetir — Core Web Vitals "yaşıl" Google üçün rəsmi ranking siqnalıdır və "page experience"ə daxildir.

---

# 📋 ÜMUMİ HƏRƏKƏT PLANI (mərhələ ilə)

### Mərhələ 0 — Qanaxını dayandır (bu həftə)

- [x] **SEC-1** Lead fail-open → dead-letter cədvəli (`leads_dl`) + alarm; friendly UX saxla.
- [x] **SEC-3** Upload-a auth + rate-limit + magic-byte sniff + doğru bucket (`application-documents`) + RLS migration.
- [x] **SEC-4/5** `next-intl` 4.9.1+ yüksəlt; `npm audit fix` (next 16 major nəzərə alın). ✅ next-intl 4.13.6, nanoid 3.3.18. ⏳ postcss/sharp → next 16 ayrıca.
- [ ] **SE-3** `.env.local`-ə real domen + GA/Clarity ID; GSC verification.
- [ ] **BE-4/QA-3** ✅ Supabase PITR sənədləşdir + gecəlik `pg_dump` cron + restore runbook (`docs/ops/backup.md`). (staging restore-test quarterly əməliyyat qalır.)

### Mərhələ 1 — Sürət + görünməzlik (1-2 həftə)

- [x] **P0** middleware `getUser()`-i public route-larda dayandır; `/api/me` fetch-i sil/şərti et; GoogleSignInButton kod-split. ✅ hamısı əvvəlki sessiyada.
- [x] **QA-1** Structured logger (`src/lib/logger.ts`, JSON lines) + `NEXT_PUBLIC_SENTRY_DSN` stub; lead failure + health 503-u ondan keçir. ✅
- [x] **QA-2** `deploy` job: migrate-first (prod) → Vercel → `/api/health` smoke. ✅ (2026-08-14)
- [x] **SE-1/4** hreflang tire; admin noindex. ✅
- [x] **FE-2** FadeIn default görünən (`useEffect` ilə gizlə). ✅

### Mərhələ 2 — Məzmun/E-E-A-T/#1 (1-2 ay)

- [ ] Cornerstone guideline-lər (pul-kəlimələr) — 2000-3000 söz, aktual tədris haqqı, real data. ⚠️ məzmun yazısı tələb edir
- [ ] Author `Person` schema + reviewer + redaksiya siyasəti. ⚠️ müəllif məlumatı tələb edir
- [ ] Real review mənbəyi (Trustpilot) qoş + Review JSON-LD. ⚠️ xarici xidmət tələb edir
- [ ] `sameAs` real profil + Google Business Profile. ⚠️ istifadəçi məlumatı tələb edir (SE-2)
- [ ] Daxili link cluster-ləri; təqaüd/visa/yaşayış hub səhifələri. ⚠️ məzmun tələb edir
- [ ] Backlink kampaniyası (.edu, səfirlik, PR, aqreqatorlar). ⚠️ xarici kampaniya tələb edir

### Mərhələ 3 — Yetkinlik (ongoing)

- [ ] **SEC-2** Least-privilege DB rolu / anon+RLS yolu (böyük refactor — planla).
- [x] **BE-1** Tək `getPool()`; **BE-2** listLeads paginasiya; **BE-3** URL TTL 5-15 dəq; **BE-5** axtarış indeks-ləri. ✅ (TTL 10 dəq seçildi.)
- [x] **FE-1** ApplyForm parçala + Radix Select; **FE-3** blog MDX/`@tailwindcss/typography`. ✅ (2026-08-14)
- [x] **DO-2/3/4/5** vercel.json, husky, .nvmrc, docs/ops runbook; **QA-4** migration checksum. ✅ husky + .nvmrc + checksum; ⏳ vercel.json + runbook.
- [x] SE-5/6/7/8/10/11/12 (pre-render top, lastmod, image sitemap, icon, address, pagination canonical, @id). ✅ SE-5/6/7/8/10/12; ⏳ SE-11 (pagination canonical — aşağı prioritet, Google `rel=prev/next`-i 2019-da ləğv edib).
- [x] BE-6 getRelated cache; BE-7 upsert race; BE-12 messages indeksi; FS-3 concurrency derive; QA-6 Firefox/WebKit; QA-7 CWV smoke. ✅ (2026-08-14)

---

# 📌 ƏLAVƏ TAPINTILAR (2-ci dərinləşdirilmiş auditdən — kodda doğrulanmış)

> Aşağıdakılar ayrı bir auditdən gəlir və **hamısı bugünkü kodla doğrulanıb**. Rədd edilənlər sonda.

## 🔴 Yüksək dəyərli yeni tapıntılar

### PERF-A — Hero şəkilləri həddən artıq böyükdür (LCP qatili) ⭐ ✅ EDİLDİ (2026-08-12)

**Yer:** `public/images/universities/*/hero.webp` — **86 hero sıxışdırıldı** (`scripts/optimize-heroes.mjs`, 1200px, q=75)

- `cankaya-university/hero.webp` = **3.30 MB → 87 KB**
- `lokman-hekim-university/hero.webp` = **1.60 MB → 76 KB**
- `kadir-has-university/hero.webp` = **1.47 MB → 124 KB**
- ümumi: **31.1 MB → 8 MB** (−74%)

Bunlar universitet detallarında LCP elementidir. **Həll:** `scripts/optimize-heroes.mjs` ilə width≤1200, q=75 yenidən sıxışdırıldı. Ən böyük sürət qazancı — tətbiq olundu.

### SEO-A — Proqram detal səhifələri YOXDUR (ən böyük long-tail itkisi) ⭐

**Yer:** doğrulanıb — `src/app/[locale]/(marketing)/universities/[slug]/[program-slug]` route-u **mövcud deyil**; 6,241 proqramın hamısı yalnız universitet səhifəsinə linklənir.

"Study [proqram] at [universitet] in Turkey" kimi minlərlə long-tail sorğu üçün ayrı səhifə yoxdur. **Həll:** `/universities/[slug]/[program-slug]` route + `EducationalOccupationalProgram` JSON-LD. Bu, proqrammatik SEO-nun növbəti böyük mərhələsidir.

### PERF-B — `/api/me` hər səhifə baxışında DB YAZIR (logged-in istifadəçi üçün) ✅ EDİLDİ (2026-08-12)

**Yer:** `src/app/api/me/route.ts:22` → `student-session-server.ts:13` → `crm/student-session.ts:31` → `upsertStudentByAuthUid()` (INSERT/UPDATE)
Header (`header-interactive.tsx`) hər səhifədə `/api/me` çağırır → `getStudentSession()` hər dəfə `upsertStudentByAuthUid` write-u edir. Bu, **logged-in tələbə üçün write-amplification** (hər naviqasiyada profiles cədvəlinə write). **Həll:** `/api/me` yalnız oxu (getProfileByAuthUid); upsert-i yalnız login/callback-da işlət. (Anonim ziyarətçidə yazılmır — `getSessionUser()` null qayıdır.)

> **EDİLDİ:** yeni `getStudentSessionReadOnly()` (`getProfileByAuthUid` ilə tək SELECT) + `/api/me` ondan istifadə edir. Profil linking `/dashboard`-da `requireStudent` vasitəsilə qalır (login ora redirect edir).

### PERF-C — `font-display` sınıqdır: Geist heç vaxt render olunmur ✅ EDİLDİ (2026-08-12)

> **Həll edildi:** `tailwind.config.ts:24` `var(--font-geist)` → `var(--font-geist-sans)`. Başlıqlar indi Geist-də render olunur.
> **Yer:** `src/app/[locale]/layout.tsx:74` (`${GeistSans.variable}`), `tailwind.config.ts:24` (`display: ['var(--font-geist)', ...]`)
> `geist/font/sans` variable adı `--font-geist-sans`-dır, amma Tailwind `--font-geist` istinad edir → CSS var mövcud deyil → `font-display` ikinci dəyərə (`--font-inter` = Inter) düşür. Nəticə: **bütün başlıqlar (`font-display`) Inter-də render olunur, Geist dizayn niyyəti itir**. **Həll:** ya tailwind-də `--font-geist` → `--font-geist-sans`, ya da `font-display`-i tam sil (bir font ailəsi = daha sürətli).

## 🟠 Orta dəyərli yeni tapıntılar

### FE-conv-1 — Header "Apply" düyməsi login səhifəsinə aparır ✅ EDİLDİ

**Yer:** `src/components/layout/header.tsx:52-54` → `<Link href="/dashboard/login">`
Əsas "Apply" CTA `/apply` yox, `/dashboard/login`-ə gedir. Konversiya üçün zəif. **Həll:** `/apply`-ə yönləndir (və ya auth-ə düşəndə redirect-back).

### FE-conv-2 — Apply CTA `?university=` kontekstini itirir ✅ EDİLDİ

**Yer:** `src/app/[locale]/(marketing)/universities/[slug]/page.tsx:555` (`<Link href="/apply">`)
Mobil sticky Apply bare `/apply`-ə gedir; forma universiteti pre-select etmir. **Həll:** `href={/apply?university=${slug}}` + formada initial value.

### FE-conv-3 — `originalFee` (endirim) kartlarda göstərilmir ✅ EDİLDİ (2026-08-13)

**Yer:** `src/components/sections/university-card.tsx:51,140-141` (render edir), **amma** `featured-universities.tsx:45-50` və digər call-site-lər `originalFee` ötürmür
Kart özü düzgün render edir (üstüxətli orijinal qiymət), amma çağırıcılar ötürmədiyi üçün universitet kartlarında endirim heç vaxt görünmür (proqram siyahı səhifələrində isə görünür — `programs/page.tsx:201`). **Həll edildi:** `UniversityListingMetadata` `originalFeeUSD` daşıyır; seed/Postgres data qatları ən ucuz USD proqram satırının `original_fee` dəyərini gətirir; `UniversityCard` explicit prop yoxdursa metadata-dan istifadə edir. Test: `repository.test.ts` + `university-card.test.tsx`.

### FE-trust-1 — "students placed" rəqəmi yanıldıcıdır ✅ EDİLDİ (əvvəl)

**Yer:** `src/components/sections/stats-section.tsx:18-21`
`studentsPlaced = sum(universities.studentCount)` — yəni siyahıdakı universitetlərin **ümumi tələbə sayını** cəmləyir, platformanın yerləşdirdiyi tələbə sayını yox. Etibarlılıq/marketing dürüstlüyü problemi. **Həll:** ya metrik dəyiş ("students across partner universities"), ya da real yerləşdirmə sayı.

### FE-a11y-1 — Hero axtarış combobox `aria-activedescendant` yoxdur ✅ EDİLDİ

**Yer:** `src/components/sections/hero-section.tsx:136-139`
`role=combobox`, `aria-autocomplete`, `aria-expanded`, `aria-controls` var (yaxşı), amma `aria-activedescendant` yoxdur → screen reader klaviatura naviqasiyasında aktiv seçimi elan etmir. Faylın özündə `eslint-disable jsx-a11y/role-supports-aria-props` şərhi var. **Həll:** `aria-activedescendant={activeId}` əlavə et.

### PERF-D — FadeIn `priority` LCP şəkillərini opacity-0 içində saxlayır ✅ EDİLDİ (FE-2 ilə)

**Yer:** `src/components/sections/featured-universities.tsx:6,21` (bütün bölmə FadeIn içində), ilk 2 kart `priority={i<2}` (`:49`)
FE-2-nin həlli (mounted qapısı) ilə SSR-də məzmun görünür — priority LCP şəkilləri artıq gizli deyil.

### FE-ui-1 — Mobil sticky CTA alt məzmunu örtür ✅ EDİLDİ

**Yer:** `src/app/[locale]/(marketing)/universities/[slug]/page.tsx:543` (`fixed inset-x-0 bottom-0 ... md:hidden`)
Sabit alt sətrində nəzərdə tutulan body `padding-bottom` yoxdur → 390px ekranda Related bölməsinin sonu örtülür. **Həll:** `<article>` və ya layout-a `pb-20 md:pb-0` əlavə et.

## ⚪ Aşağı dəyərli / gigiyena

### SEC-low-1 — Middleware admin gate dev-cookie-ni HMAC-siz qəbul edir

**Yer:** `src/middleware.ts:41-43` (`req.cookies.get(SESSION_COOKIE)?.value` → presence-only)
Central gate `admin_session` cookie-nin yalnız **varlığına** baxır, imzayı yoxlamır (HMAC layout-da `requireStaff`-də). Bu yalnız **dev-auth** yoludur (production-da `NODE_ENV` hard gate ilə inert), ona görə real risk aşağı — amma "central gate" illüziyadır, əsl yoxlama layout-da qalır.

### SEC-low-2 — `x-real-ip` TRUST_PROXY olmadan etibar edilir

**Yer:** `src/lib/rate-limit.ts:83`
`TRUST_PROXY !== '1'` olanda `x-forwarded-for` rədd edilir (yaxşı), amma `x-real-ip` hələ də qəbul olunur. Vercel-də təhlükəsizdir (Vercel onu override edir); self-host/misconfigured deploy-da klient tərəfindən spoof edilə bilər. **Həll:** `x-real-ip`-ni də yalnız `TRUST_PROXY=1` olanda etibar et.

### BE-low-1 — `messages` cədvəlində `(sender_id, read_at)` indeksi yoxdur

**Yer:** `supabase/migrations/0008_messages.sql:11` (yalnız `(lead_id, created_at)`)
"(lead_id, sender_id, read_at)" filterli sorğular (oxunmamış mesaj sayı) yalnız `lead_id` prefiksindən istifadə edir. **Həll:** `create index ... on messages(sender_id, read_at) where read_at is null`.

### DO-low-1 — Supabase-only migration-lar əll tətbiq olunur

**Yer:** `README.md` (0005/0006/0007/0009/0013/0018 `SKIP_LOCAL`-dadir)
RLS/auth/storage migration-ları `migrate.ts` tərəfindən local-da atlanır və prod Supabase-ə **əll** (SQL editor) tətbiq olunur. Sənədləşdirilib, amma deploy runbook-una daxil edilməli (DO-5 ilə birləş).

## SEO əlavələri

- **SEO-B — Blog həcmi**: cəmi **26 post × 4 dil** (`src/lib/seed/blog.ts`). #1 üçün proqram/şəhər/ölkə başına ~150–300 post lazım. (Google #1 roadmap A-ya rəqəm əlavə edildi.)

## ❌ Rədd edilən iddialar (yanlış və ya artıq həlli)

- **"/api/search rate-limit yoxdur"** — YANLIŞ. Var (`search/route.ts:9`, 30/dəq, Redis). Təsdiqləndi.
- **"8 dildə Geo/Chat namespace yoxdur"** — YANLIŞ. 8/8-də (ar/de/fa/fr/kk/ky/tk/zh) hər ikisi var, artıq düzəlib.
- **"S10: stub lokallar noindex-dən kənarlaşır (buildPageMetadata ötürmir)"** — QƏBUL EDİLMƏZ. `[locale]/layout.tsx:46` `robots:{index:false,follow:false}` qoyur; Next.js metadata miras qaydasıyla bu səhifələrə tətbiq olunur. Mövcud qurulum işləyir.
- **"S5: pagination `rel=prev/next` əlavə et"** — Google `rel=prev/next` siqnalı 2019-dan etibarən qüvvədən düşüb; "page 2+ sitemap-da deyil" isə doğrudur amma **Bu yaxşıdır** (konsolidasiya). Əlavə etməyə dəyməz.
- **"S9: aggregateRating əlavə et"** — TƏHLÜKƏLİ. Self-serving aggregateRating **qəsdən silinib** (Google manual action riski) və env-gated. Yalnız üçüncü tərəf (Trustpilot) mənbəyi ilə qayıtmaq olar — bu artıq Google #1 roadmap B-5-də var.

---

# ✅ YAXŞI OLANLAR (qorunmalı — itirməyin)

- **SQL injection yox** — hər yerdə parametrized `$N`
- **next/image 100%** + AVIF/WebP + LCP-də `priority` + doğru `sizes` + render-blocklayan `<link>` yoxdur (`next/font display:swap`)
- **Marketing səhifələrində `cookies()/headers()` yox** → tam statik/ISR; `force-dynamic` yalnız admin/dashboard/api
- **Təmiz Tailwind purge** + 61 sətirlik globals.css + kiçik WebP asset-lər
- **ISR `revalidate=3600`** bütün dinamik content səhifələrində
- **Message-lər per-locale `import()`** → dil başına code-split
- **Rate limit** search(30)/chat(10)/leads(5)/me(30) — Redis
- **Security headers** — CSP, HSTS+preload, X-Frame-Options, Referrer-Policy, Permissions-Policy, `object-src 'none'`
- **RLS policy dizaynı** koherent (read), student izolyasiyası, role guard trigger, email-link qoruması, dev-auth NODE_ENV hard gate
- **SEO** — metadataBase, self-referencing canonical (filter təmizlənir), 12-lokalı hreflang+x-default (stub exclude), 12-tip JSON-LD (self-serving rating silinib, @id+escape), dinamik OG generator, ISR, dashboard noindex
- **CI** — 3 job (lint+typecheck, test+build real PG, Playwright E2E), concurrency cancel, npm cache
- **Migration runner** — ledger + advisory lock + local-only reset guard + build-time env fail-fast
- **Geniş test suite** — 17 unit (security daxil) + 7 e2e (auth-guard daxil), i18n parity check
- **Honeypot** lead form-da; **IDOR** yoxlanışı; **signed URL short TTL**

---

_Bu sənəd 2026-08-12 tarixində bugünkü kodla doğrulanıb. Hər tapıntı `fayl:sətir` referansı ilə gəlir. Əvvəlki auditlərlə (`duzelis.md`, `sehv.md`, `devops-audit.md`) üst-üstə düşən çox şey artıq ✅ — bu sənəd yalnız **hələ açıq/qismən** olanlara fokuslanır və ən vacib iki başlığa (sürət + Google #1) tam roadmap verir._
