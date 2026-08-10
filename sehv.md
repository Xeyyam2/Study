# Layihə Audit Hesabatı — Study Platform

**Tarix:** 2026-08-09
**Analiz rolları:** Senior Backend, Senior Frontend, Senior UI, Senior Fullstack, Senior QA, Senior DevOps, Senior SEO, Senior Hacker (Pentest)
**Layihə:** Next.js 15 App Router + React 19 + PostgreSQL 16 + Supabase + Docker + GitHub Actions
**Metod:** Statik kod analizi (fayl:sətir referansları ilə), git tarixçəsi yoxlanışı, npm audit, test/e2e nəzərdən keçirilməsi

---

## Xülasə

Layihənin təməli sağlamdır — SQL tam parametrized, RLS aktiv, təhlükəsizlik header-ləri yaxşı, SEO düşünülmüşdür. Lakin **1 Critical (security), 1 Critical (backend), 2 Critical (frontend), 14+ High** səviyyəli problem var. Ən təcili olanlar: dev-auth backdoor-un açıq olması, anonim fayl yükləmə, seed prosesinin atomik olmaması, i18n key çatışmazlığı.

---

# 🔴 KRİTİK (Critical)

| # | Problem | Sahə | Yer |
|---|---------|------|-----|
| C1 | `DEV_AUTH_ENABLED=1` `.env.local`-də aktivdir — admin girişi backdoor | Security | `.env.local:23`, `student-session.ts:11-14` |
| C2 | Anonim fayl yükləmə service-role ilə, auth/rate-limit/CSRF yoxdur | Security | `upload-apply-document.ts:19-52` |
| C3 | Storage bucket uyğunsuzluğu: `apply-documents` vs `application-documents` | Security | `upload-apply-document.ts:15`, `0009_storage_bucket.sql:2` |
| C4 | `changePasswordAction` — auth/CSRF guard yoxdur | Security | `staff-management.ts:28-43` |
| C5 | Seed prosesi atomik deyil — truncate+insert, partial failure-da DB boşalır | Backend | `seed-content.ts:46-63` |
| C6 | `/compare` səhifəsində N+1 — hər universitet üçün ayrıca sorğu | Frontend | `compare/page.tsx:38-40` |
| C7 | `UniversityCard` komponenti DB-ə birbaşa qoşulur (3 sorğu/kart) | Frontend | `university-card.tsx:60-71` |
| C8 | 14 dil faylında 49 i18n key çatışmır + `categoryLabel`/`cityLabel` boş | Frontend/i18n | `ProgramCombination`, `UniversityDetail.city` |

---

# 🟠 YÜKSƏK (High)

## Təhlükəsizlik (Senior Hacker)

| # | Problem | Yer | Həll |
|---|---------|-----|------|
| H1 | Rate limiter `X-Forwarded-For`-ə etibar edir (spoofable), in-memory (serverless-də işləmir) | `rate-limit.ts:47-65` | Trusted proxy header + Upstash/Vercel KV |
| H2 | `next-intl@3.26.5` open redirect + prototype pollution (CVE) | `package.json:39` | `next-intl@^4.9.1` |
| H3 | `nanoid@3.3.16`, `postcss`, `sharp` CVE-ləri (npm audit: 5 vuln) | `package-lock.json` | `npm audit fix` + next upgrade |
| H4 | Session cookie `secure` flag yoxdur; dev-auth cookie imzasızdır | `admin-auth.ts:22-25`, `session.ts:56-68` | HMAC + `secure: NODE_ENV==='production'` |
| H5 | `auth/callback` open redirect — `next` parametri backslash/encode ilə keçir | `auth/callback/route.ts:13-17` | `new URL(next, origin)` origin check |
| H6 | Admin API-lərdə per-endpoint `requireRole` yoxdur | `staff-management.ts` | Hər action-da `requireStaff()` |
| H7 | RLS write policy-ləri "any staff" açıqdır, `with check` yoxdur | `0005_rls.sql:28-47` | Per-operation policy + `with check` |
| H8 | App RLS-i tamamilə bypass edir (birbaşa `pg` + service-role) | `crm/db.ts:7-13` | PostgREST JWT və ya least-privilege DB role |
| H9 | JSON-LD `dangerouslySetInnerHTML` — `</script>` escaping yoxdur | `json-ld.tsx:10` | `JSON.stringify(data).replace(/</g, '\\u003c')` |
| H10 | Chat/lead/upload endpoint-lərində Origin yoxlanışı yoxdur | `api/chat/route.ts`, `actions/leads.ts` | Origin allowlist |

## Backend

| # | Problem | Yer | Həll |
|---|---------|-----|------|
| B1 | `listPage` count + page 2 ayrı sorğu (3 skan/səhifə) | `pg-data-repository.ts:615-640` | `count(*) over()` window function |
| B2 | İndekslər yoxdur: `category_slug`, `tuition_fee`, `languages` GIN | `0011_content_tables.sql` | 4 yeni indeks əlavə et |
| B3 | Connection pool `max=2`, error handler yoxdur, 2 ayrı pool | `index.ts:13-24`, `crm/db.ts:10` | `pool.on('error')` + tək pool |
| B4 | `/api/health` DB-yə toxunmur — ölü DB-də `ok:true` | `api/health/route.ts:13-16` | `select 1` timeout ilə |
| B5 | CRM write path-lərində transaction yoxdur (read-modify-write) | `pg-repository.ts:144-151,238-261` | `BEGIN/COMMIT/ROLLBACK` |
| B6 | `getDetail` 5 ardıcıl sorğu — pool starvation riski | `pg-data-repository.ts:315-361` | `Promise.all` |
| B7 | `studyleo-catalog.ts` 68K sətir generated fayl hər build-də yüklənir | `src/lib/seed/` | JSON kimi saxla, seed vaxtı `JSON.parse` |
| B8 | `findOrCreateStudent` race condition (check-then-insert) | `pg-repository.ts:427-436` | `insert on conflict do nothing returning` |
| B9 | `search` ILIKE `%q%` indeks istifadə etmir (seq scan) | `pg-data-repository.ts:191` | trigram indeks `(name_i18n->>'en')` |
| B10 | `submitLead` fail-open — DB xətasında lead itir | `actions/leads.ts:56-64` | `{ok:false}` qaytar |

## Frontend / UI / UX

| # | Problem | Yer | Həll |
|---|---------|-----|------|
| F1 | 5 on-demand səhifədə `generateStaticParams` yoxdur — ilk ziyarət yavaş (7+ DB sorğu) | `universities/[slug]`, `blog/[slug]` və s. | `generateStaticParams` əlavə et |
| F2 | Program cədvəlləri mobile-də `overflow-x-auto` yoxdur — sıxılır/kəsilir | `programs/page.tsx:136-224` | `overflow-x-auto` |
| F3 | Sticky mobile CTA + floating butonlar üst-üstə düşür | `universities/[slug]:539-557` | FloatingApplyButton-u hide et |
| F4 | `CompareTool` seçimi component-local — URL-də paylaşılmır | `compare-tool.tsx:26` | `?u=a,b,c` query params |
| F5 | Filter dialog-da `DialogDescription` yoxdur | `program-filters.tsx:185` | sr-only description saxla |
| F6 | Chat widget focus trap yoxdur, `aria-live` yoxdur | `chat-widget.tsx:93-163` | Focus trap + aria-live |
| F7 | Hero autocomplete `aria-activedescendant` yoxdur | `hero-section.tsx:127-164` | Kombobox pattern tamamla |
| F8 | `text-cta` kiçik mətndə kontrast 3.1:1 (4.5:1 tələb) | `cost-calculator.tsx:54` | `#994700` |
| F9 | RTL dəstəyi natamam — fiziki `left/right` Tailwind class-ları | `university-card.tsx:88,97` | Logical props (`start/end`) |
| F10 | `priority` həddən artıq istifadə (gallery, blog) — LCP rəqabəti | `universities/[slug]:401` | Yalnız hero + ilk kart |

## SEO

| # | Problem | Yer | Həll |
|---|---------|-----|------|
| S1 | Pagination canonical dublikat — filtered+paginated URL-lər | `programs/page.tsx:52-67` | `noindex` page>1 filtered |
| S2 | `Review` JSON-LD self-serving — Google qaydasını pozur | `json-ld.ts:203-225` | Üçüncü tərəf data gələnə qədər sil |
| S3 | Sitemap 11 dil — amma 14 dil "complete" sayılır (49 key yoxdur) | `sitemap.ts:65` | i18n key parity düzəlt |
| S4 | `courseListJsonLd` fee=0 olan kurslar daxildir | `[category]/page.tsx:132-138` | `tuitionFee>0` filter |
| S5 | `siteConfig.url` placeholder — prod env yoxlamaq lazım | `config/site.ts:8` | `NEXT_PUBLIC_SITE_URL` set et |
| S6 | `dateModified = datePublished` blogda | `json-ld.ts:111` | Real update vaxtı |

## QA

| # | Problem | Yer | Həll |
|---|---------|-----|------|
| Q1 | Real DB testləri təcrid olunmur — transaction rollback yoxdur, data yığılır | `student-repository.test.ts` | Test DB + rollback |
| Q2 | `programs.spec.ts` yoxdur — pagination, filter, discounted price e2e yoxdur | `tests/e2e/` | Əlavə et |
| Q3 | Real OTP/auth e2e yoxdur — yalnız dev-auth test olunur | `tests/e2e/` | Real flow test |
| Q4 | Apply flow-un valid persistence testi yoxdur | `tests/e2e/` | Lead DB assertion |
| Q5 | i18n key parity testi yoxdur (README iddia edir amma test yoxdur) | `i18n.test.ts` | Key-diff test |
| Q6 | Component testlər yoxdur — yalnız 1 badge testi | `tests/unit/components/` | @testing-library/react |
| Q7 | A11y testlər yoxdur (axe), load/perf testlər yoxdur | — | axe + k6 |
| Q8 | API contract testlər yoxdur (`/api/search`, `/api/chat`) | — | Supertest |

## DevOps

| # | Problem | Yer | Həll |
|---|---------|-----|------|
| D1 | CI-da e2e job yoxdur, deploy job yoxdur | `.github/workflows/ci.yml` | e2e + deploy.yml |
| D2 | Migrations Supabase-ə heç vaxt tətbiq edilmir (5 fayl SKIP_LOCAL) | `migrate.ts:29-35` | `supabase db push` |
| D3 | Docker compose-da healthcheck yoxdur, app container yoxdur | `docker-compose.yml` | healthcheck + docs |
| D4 | Vercel build üçün DB yoxdur — statik səhifələr səssizcə azalır | `next.config.mjs` | Build-time seed snapshot |
| D5 | `staticGenerationMaxConcurrency:2` + `PGPOOL_MAX=2` fragile magic-number | `next.config.mjs:35-39` | Env-dən törət |
| D6 | Monitoring/logging yoxdur (Sentry, structured logs) | — | Sentry əlavə et |
| D7 | `.env.example`-də `INITIAL_ADMIN_EMAIL` yoxdur | `.env.example` | Əlavə et |
| D8 | Test izolyasiyası — 2-ci run-da fərqli nəticə (data yığılır) | `tests/unit/` | Rollback/truncate |

---

# 🟡 ORTA (Medium) — Seçilmiş

- **M1:** Server action error mesajları client-ə sızır (`upload failed: ${error.message}`)
- **M2:** `/api/health` DB varlığını açıqlayır (`db: true/false`)
- **M3:** OTP/Google brute-force app-level qorunma yoxdur
- **M4:** COOP/CORP header-ləri yoxdur
- **M5:** `leads.university_id`/`applications.university_id` FK DEYİL — `'direct'` sentinel
- **M6:** `reviews.rating` CHECK yoxdur (1-5), `tuition_fee` CHECK yoxdur (>=0)
- **M7:** `degree_level`/`language`/`currency` DB-də `text` — CHECK/enum yoxdur
- **M8:** `getCombinations`/`getMinTuitionUSD` seed vs pg currency filter fərqi (parity drift)
- **M9:** `isLocalDatabase()` `DEV` string-inə etibar edir — prod URL-də "dev" varsa reset riski
- **M10:** `updateLeadStatusAction` `as never` cast — type-unsafe
- **M11:** Search PG city axtarır, seed yox (parity drift)
- **M12:** `uploadApplyDocument` `fieldname` allowlist yoxdur
- **M13:** `not-found.tsx`-də `setRequestLocale` çağırılmır
- **M14:** Tailwind dead config (maxWidth, surface.dim, stack-*)
- **M15:** Arbitrary hex value-lər token-laşdırılmayıb (`#25D366` WhatsApp)
- **M16:** `StatCard`/`Stat` dublikat komponentlər — `StatGrid`-ə birləşdir
- **M17:** CompareTool seçimi URL-də saxlanılmır
- **M18:** `changePasswordAction` currentPassword yoxlayır (Supabase-ə buraxır)
- **M19:** JSON-LD `</script>`-ə qarşı qorunmur
- **M20:** Header hər səhifədə `/api/me` fetch edir — signed-out flash

---

# ⚪ AŞIQ (Low) / Məlumat

- L1: `formatNumber(0)` → "0" göstərir (studLeo yeni unilərdə)
- L2: `INITIAL_ADMIN_EMAIL` `.env.local`-də ölü config (kod yoxdur)
- L3: Skip link `main`-də `tabIndex={-1}` yoxdur
- L4: Gallery `priority={i===0}` LCP ilə rəqabət edir
- L5: `getAllPrograms`/`getByCategory` lazımsız `description_i18n` yükləyir
- L6: Seed regex-parsing fayl formatından asılıdır (fragile)
- L7: `chunk()` dead code sitemap-də
- L8: Dev server `.next` cache pozulması — `dev:clean` script yoxdur

---

# ✅ YAXŞI OLANLAR (qorunmalı)

- **SQL injection yoxdur** — bütün sorğular parametrized ($n)
- **XSS (app-rendered) yoxdur** — mətn React escape ilə
- **SSRF yoxdur** — yalnız OpenAI API fetch olunur
- **RLS aktivdir** — read policy-lər düzgün, student izolyasiyası var
- **Security headers** — CSP, HSTS+preload, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **Auth escalation qorunmaları** — role guard trigger (0013), email-link qorunması
- **SEO** — metadataBase, canonical+hreflang, JSON-LD zəngin, geo-block + AEO, noindex stubs
- **İmage optimization** — next/image + sizes + formats avif/webp
- **CI** — Postgres service container ilə migrate+seed+build
- **Migration ledger + advisory lock + local-only reset guard** — düzgün mühəndislik
- **URL-as-source-of-truth filterlər** — paylaşıla bilən, back-button-safe
- **prefers-reduced-motion** global qorunması
- **Empty states, error boundaries, not-found** — yaxşı UX

---

# 📋 Prioritet Təmir Planı

## Dərhal (Critical — bu həftə)
1. `DEV_AUTH_ENABLED=0` / sil — `.env.local:23`
2. Supabase service-role key-i rotasiya et (OneDrive-da plaintext saxlanılır)
3. `uploadApplyDocument`-ə rate-limit + CSRF + magic-byte MIME + server path
4. `changePasswordAction`-ə `requireStaff()` əlavə et
5. `seed-content.ts`-i transaction-a sal
6. `/compare` N+1-i `getListingMetadata` ilə əvəz et
7. 14 dil faylına 49 çatışmayan key əlavə et

## Yüksək (High — bu ay)
8. `next-intl@^4.9.1` + `npm audit fix`
9. `auth/callback` open redirect düzəlt
10. Session cookie HMAC + `secure`
11. RLS write policy-ləri per-operation et
12. İndekslər əlavə et (category_slug, tuition_fee, GIN languages)
13. `generateStaticParams` 5 on-demand səhifəyə
14. `pool.on('error')` + tək pool
15. CRM write-lərə transaction
16. JSON-LD `</script>` escaping
17. CI-ya e2e + deploy job
18. Test izolyasiyası (rollback)

## Orta (Medium — 2 ay)
19. Review JSON-LD sil/gate et (self-serving)
20. Mobile cədvəllərə `overflow-x-auto`
21. RTL logical props
22. `text-cta` kontrast
23. `.env.example`-ə `INITIAL_ADMIN_EMAIL`
24. Docker healthcheck
25. Sentry/monitoring
26. Component + a11y + API testlər

---

*Bu hesabat statik analizə əsaslanır. Heç bir kod dəyişdirilməyib. Hər tapıntı `fayl:sətir` referansı ilə doğrulanıb.*
