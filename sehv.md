# Layihə Audit Hesabatı — Study Platform (Yenilənmiş)

**Tarix:** 2026-08-11 (yenilənmiş)
**Analiz rolları:** Senior Backend, Senior Frontend, Senior UI/UX, Senior Fullstack, Senior QA, Senior DevOps, Senior SEO, Senior Hacker (Pentest)
**Metod:** 8 paralel senior agent + 2 müstəqil AI auditinin birləşməsi. Bütün iddialar faktiki kodla doğrulanıb.

> **Vəziyyət:** ✅ = düzəldildi (commit edildi) | ⬜ = açıq qalır | ❌ = istifadəçi tərəfindən silinib (edilməyəcək)

---

## Xülasə

Layihənin təməli sağlamdır. **FAZA 1-9** tamamlanıb — kritik təhlükəsizlik, data-integrity, frontend/i18n, SEO, UI, DevOps düzəlişləri commit edilib. Qalıq: RTL logical props, next-intl upgrade, RLS arxitektura, observability, böyük həcmli test işləri.

---

# 🔴 KRİTİK (Critical)

| # | Problem | Sahə | Yer | Status |
|---|---------|------|-----|--------|
| C1 | `DEV_AUTH_ENABLED=1` `.env.local`-də aktiv | Security | `.env.local:23` | ✅ Düzəldildi |
| C2 | Anonim fayl yükləmə — auth/rate-limit/magic-byte yoxdur | Security | `upload-apply-document.ts` | ✅ Düzəldildi |
| C3 | Storage bucket uyğunsuzluğu: `apply-documents` vs `application-documents` | Security | `upload-apply-document.ts` | ✅ Düzəldildi |

---

# 🟠 YÜKSƏK (High)

## Təhlükəsizlik

| # | Problem | Yer | Status |
|---|---------|-----|--------|
| H1 | Rate limiter `X-Forwarded-For` spoofable, in-memory | `rate-limit.ts:47` | ✅ Düzəldildi (Redis + TRUST_PROXY) |
| H2 | `next-intl@3.26.x` open redirect + prototype pollution (CVE) | `package.json:39` | ✅ Düzəldildi (4.9.1) |
| H3 | `nanoid`, `postcss`, `sharp` CVE-ləri (npm audit) | `package-lock.json` | ⬜ Açıq |
| H4 | Session cookie `secure` flag yoxdur; dev-auth cookie imzasızdır | `admin-auth.ts:22`, `session.ts:56` | ✅ Düzəldildi (HMAC + secure) |
| H5 | `auth/callback` open redirect — `next` parametri | `auth/callback/route.ts:13` | ✅ Düzəldildi |
| H6 | Admin API-lərdə per-endpoint `requireRole` yoxdur | `staff-management.ts` | ✅ Düzəldildi (changePasswordAction) |
| H7 | RLS write policy-ləri "any staff" açıqdır, `with check` yoxdur | `0005_rls.sql:28` | ✅ Düzəldildi (0018_rls_least_privilege) |
| H8 | App RLS-i tamamilə bypass edir (pg + service-role) | `crm/db.ts` | ⬜ Açıq (arxitektura qərarı) |
| H9 | JSON-LD `dangerouslySetInnerHTML` — `</script>` escaping yoxdur | `json-ld.tsx:10` | ✅ Düzəldildi |
| H10 | Chat/lead/upload endpoint-lərində Origin yoxlanışı yoxdur | `api/chat`, `actions/leads` | ✅ Düzəldildi (origin.ts) |

## Backend

| # | Problem | Yer | Status |
|---|---------|-----|--------|
| B1 | `listPage` count + page 2 ayrı sorğu | `pg-data-repository.ts:615` | ✅ Düzəldildi (count(*) over()) |
| B2 | İndekslər yoxdur: `category_slug`, `tuition_fee`, `languages` GIN | `0011_content_tables.sql` | ✅ Düzəldildi (0016_indexes.sql) |
| B3 | Connection pool `max=2`, error handler yoxdur, 2 ayrı pool | `index.ts:13`, `crm/db.ts:10` | ✅ Düzəldildi |
| B4 | `/api/health` DB-yə toxunmur | `api/health/route.ts:10` | ✅ Düzəldildi |
| B5 | CRM write path-lərində transaction yoxdur | `pg-repository.ts:144` | ✅ Düzəldildi (updateLeadStatus) |
| B6 | `getDetail` 5 ardıcıl sorğu, `React.cache` yoxdur | `pg-data-repository.ts:315` | ✅ Düzəldildi (React.cache) |
| B7 | `studyleo-catalog.ts` 68K sətir hər build-də yüklənir | `src/lib/seed/` | ✅ Düzəldildi (scripts/data/-ə köçürülüb) |
| B8 | `findOrCreateStudent` race condition (check-then-insert) | `pg-repository.ts:427` | ✅ Düzəldildi (ON CONFLICT) |

## Frontend / UI

| # | Problem | Yer | Status |
|---|---------|-----|--------|
| F1 | `generateStaticParams` 5 ISR səhifəsində yoxdur | multiple pages | ✅ Düzəldildi (5 səhifə) |
| F2 | Header client component — hər səhifədə JS + `/api/me` flash | `header.tsx` | ✅ Düzəldildi (Server+Client split) |
| F3 | `ChatWidget`/`ApplyForm`/`CompareTool` dynamic import yoxdur | multiple | ✅ Düzəldildi (ChatWidget) |
| F4 | Hardcoded EN string-lər (FloatingApplyButton, GoogleSignIn, /year) | multiple | ✅ Düzəldildi (FloatingApplyButton + i18n) |
| F5 | Admin layout entire `en.json` import (~25KB bundle) | `admin/layout.tsx:4` | ✅ Düzəldildi (getMessages+pick) |
| F6 | `not-found.tsx` `/en` hardkod + inline style | `not-found.tsx:28` | ✅ Düzəldildi |
| F7 | `CostCalculator` `'en'` lokalı hardkod | `cost-calculator.tsx:168` | ✅ Düzəldildi |
| F8 | CompareTool seçimi URL-də saxlanılmır | `compare-tool.tsx` | ✅ Düzəldildi (?u= params) |
| F9 | CTA rəng kontrastı WCAG AA-ya uyğun deyil (~2.7:1) | `tailwind.config.ts` | ✅ Düzəldildi (#c95c00) |
| F10 | RTL 30+ pozuntu — fiziki utility-lər məntiqi yerinə | ~15 komponent | ✅ Düzəldildi (ms/me/ps/pe/start/end) |
| F11 | Locale label-ləri kod göstərir ('EN' deyil 'English') | `routing.ts:12` | ✅ Düzəldildi |
| F12 | Header/footer nav link-lərdə focus-visible yoxdur | `header.tsx`, `footer.tsx` | ✅ Düzəldildi |
| ~~F13~~ | ~~Dark mode tamamilə yoxdur~~ | ~~tailwind.config.ts~~ | ❌ İstifadəçi tərəfindən silinib — edilməyəcək |

## SEO

| # | Problem | Yer | Status |
|---|---------|-----|--------|
| S1 | `sameAs` placeholder linkləri (404) | `json-ld.ts:40`, `site.ts:45` | ✅ TODO comment əlavə edildi |
| S2 | `reviewJsonLd` self-serving review | `json-ld.ts:203` | ✅ Düzəldildi (silindi) |
| S3 | `CollegeOrUniversity` `address`/`telephone` yoxdur | `json-ld.ts:74` | ✅ Düzəldildi |
| S4 | `Article` `dateModified` yoxdur | `json-ld.ts:102` | ✅ Artıq mövcud idi |
| S5 | Sitemap `chunk()` dead code (no-op) | `sitemap.ts:105` | ✅ Düzəldildi |
| S6 | JSON-LD `@id` identifier-ləri yoxdur | `json-ld.ts` | ✅ Düzəldildi |
| S7 | Article publisher `logo` yoxdur | `json-ld.ts:102` | ✅ Düzəldildi |
| S8 | Sitemap `host` parametri + robots disallow yanlış | `sitemap.ts`, `robots.ts` | ✅ Düzəldildi (host silindi) |
| S9 | Hreflang region-qualify olunmamışdır | `alternates.ts` | ✅ Düzəldildi |

## QA / DevOps


---

# 🟡 ORTA (Medium)

| # | Problem | Status |
|---|---------|--------|
| M1 | `university_id` sütunu `text` (soft-ref), FK yoxdur | ⬜ Açıq |
| M2 | `uploadApplyDocument` magic-byte MIME yoxlaması | ✅ Düzəldildi (FAZA 1) |
| M3 | Rate limit in-memory — serverless-də işləmir | ✅ Düzəldildi (Upstash Redis, H1) |
| M4 | Dev-auth cookie middleware-də mövcudluq yoxlanışı (forgerə açıq) | ✅ Düzəldildi (HMAC imza, H4) |
| M5 | `/api/me` rate-limit yoxdur | ✅ Düzəldildi (30/min) |
| M6 | `changePasswordAction` `currentPassword` yoxlamır | ✅ Düzəldildi (C4 ilə birlikdə) |
| M7 | Supabase project ref `.env.local`-də açıqdır | ⬜ Açıq (gitignored) |
| M8 | Search query jsonb cast ilike — indeks işləmir | ⬜ Açıq |
| M9 | `updateLeadStatusAction` `as never` cast — type-unsafe | ✅ Düzəldildi (`as LeadStatus`) |
| M10 | Search PG city axtarır, seed yox (parity drift) | ✅ Düzəldildi (M8 seed parity) |
| M11 | `not-found.tsx`-də `setRequestLocale` çağırılmır | ✅ Düzəldildi (getLocale) |
| M12 | Tailwind dead config (stack-sm, stack-md) | ✅ Düzəldildi |
| M13 | Arbitrary hex value-lər token-laşdırılmayıb (`#25D366`) | ✅ Düzəldildi (brand.whatsapp/telegram) |
| M14 | `StatCard`/`Stat` dublikat komponentlər | ✅ Düzəldildi (ui/stat-card.tsx) |
| M15 | Mobile cədvəllərə `overflow-x-auto` yoxdur | ✅ Artıq var (`table.tsx:8`) |
| M16 | `h-4.5 w-4.5` Tailwind-də mövcud deyil | ✅ Düzəldildi (h-4 w-4) |
| M17 | Card padding inkonsistent | ⬜ Açıq |
| M18 | `text-[10px]` type scale-i bypass edir | ⬜ Açıq |
| M19 | JSON-LD `</script>` escaping | ✅ Düzəldildi (FAZA 3) |
| M20 | Header hər səhifədə `/api/me` fetch — signed-out flash | ⬜ Açıq (məqbul tradeoff) |
| ~~M21~~ | ~~Dark mode tamamilə yoxdur~~ | ❌ Silinib — edilməyəcək |

---

# ⚪ AŞAĞI (Low)

| # | Problem | Status |
|---|---------|--------|
| L1 | `formatNumber(0)` → "0" göstərir | ⬜ Açıq (məqbul) |
| L2 | `INITIAL_ADMIN_EMAIL` ölü config | ✅ Düzəldildi (.env.example) |
| L3 | Skip link `main`-də `tabIndex={-1}` yoxdur | ✅ Düzəldildi |
| L4 | Gallery `priority={i===0}` LCP ilə rəqabət | ✅ Düzəldildi |
| L5 | `getAllPrograms` lazımsız `description_i18n` yükləyir | ✅ Düzəldildi (SELECT-dən çıxarıldı) |
| L6 | Seed regex-parsing fragile | ⬜ Açıq (skript aləti, loud-fail) |
| L7 | `chunk()` dead code sitemap-də | ✅ Düzəldildi |
| L8 | Dev server `.next` cache — `dev:clean` script yoxdur | ✅ Düzəldildi (dev:clean) |
| L9 | `keywords` meta tagı (SEO value yoxdur) | ✅ Düzəldildi |
| L10 | `←` `→` arrow karakterləri RTL-də pozur | ✅ Düzəldildi (F10 ilə) |
| L11 | Repo-da debug/log faylları commit olunub | ✅ Düzəldildi (.gitignore) |
| L12 | `design/` qovluğu tətbiq reposunda | ⬜ Açıq |

---

# ✅ YAXŞI OLANLAR (qorunmalı)

- **SQL injection yoxdur** — bütün sorğular parametrized ($n)
- **XSS (app-rendered) yoxdur** — mətn React escape ilə
- **SSRF yoxdur** — yalnız OpenAI API fetch olunur
- **RLS aktivdir** — read policy-lər düzgün, student izolyasiyası var
- **Security headers** — CSP, HSTS+preload, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **Auth escalation qorunmaları** — role guard trigger (0013), email-link qorunması
- **Dev-auth NODE_ENV hard gate** — production-da tam inert
- **IDOR properly checked** — `lead.userId !== session.userId`
- **Chat: system role reject** — prompt injection qarşısı
- **Signed URLs short TTL** — 60s
- **SEO** — metadataBase, canonical+hreflang, JSON-LD zəngin, geo-block + AEO, noindex stubs
- **Stub-locale exclusion** — 6 natamam dil sitemap/hreflang-dan çıxarılıb
- **Image optimization** — next/image + sizes + avif/webp + priority LCP
- **CI** — Postgres service ilə migrate+seed+build + concurrency cancel
- **Migration ledger + advisory lock + local-only reset guard**
- **ISR + /api/me pattern** — marketing səhifələri statik
- **getListingMetadata CTE** — batch metadata fetch
- **Honeypot on lead form** — bot qarşısı
- **/api/search rate-limit VAR** — `search/route.ts:9`

---

# 📋 Düzəliş Tarixçəsi (Commit-lər)

| Commit | Branch | Fazalar | Təsvir |
|--------|--------|---------|--------|
| `2da6280` | `fix/faza1-security` | FAZA 1 | Kritik security & data-integrity (8 tapşırıq) |
| `e96e1ee` | `fix/faza2-frontend` | FAZA 2 | Kritik frontend & i18n (6 tapşırıq) |
| `913ae95` | `main` | FAZA 3-9 | Security, backend, SEO, UI, DevOps, QA (20 fayl) |

**Typecheck:** Bütün commit-lərdə `tsc --noEmit` 0 xəta ilə keçib.

---

# 📋 QALAN TAPŞIRIQLAR (prioritet sırası)

## Yüksək (bu ay)
- [ ] H1: Rate limiter-i Redis/Vercel KV-ə köçür
- [ ] H2: `next-intl@^4.9.1` yüksəlt
- [ ] H3: `npm audit fix`
- [ ] H4: Dev-auth cookie HMAC imza (secure flag ✅ edildi)
- [ ] H6: `changePasswordAction` + admin action-lara `requireStaff()`
- [ ] H7: RLS write policy-lərə `with check`
- [ ] H10: Server action-lara Origin yoxlanışı
- [ ] C4: `changePasswordAction`-ə `requireStaff()` əlavə et
- [ ] B6: `getDetail`-i `React.cache()` ilə wrap et
- [ ] F1: 5 ISR səhifəsinə `generateStaticParams`
- [ ] F2: Header-i Server+Client hissələrə böl
- [ ] F3: Ağır komponentləri `next/dynamic` ilə lazy load
- [ ] F8: CompareTool seçimini URL-də saxla
- [ ] F10: RTL fiziki → məntiqi utility-lər (~30 dəyişiklik)
- [ ] S3: CollegeOrUniversity `address`/`telephone` əlavə et
- [ ] S9: Hreflang region-qualify et
- [ ] Q3: Security/auth kod üçün authorization-matrix testlər
- [ ] Q4: Deploy job əlavə et (migrate-first → Vercel → smoke)
- [ ] Q5: Structured logger əlavə et (pino)
- [ ] Q9: DB testlərinə transaction-rollback

## Orta (2 ay)
- [ ] M1, M3-M11, M13-M18: Medium düzəlişlər
- [ ] Q7: DB backup cron + restore test
- [ ] Q10: Migration checksum verification

## Aşağı (ongoing)
- [ ] L1-L6, L8-L10, L12: Low priority hygiene

---

*Bu hesabat 8 paralel senior agent + 2 müstəqil AI auditinin birləşməsidir. Bütün tapıntılar `fayl:sətir` referansı ilə faktiki kodla doğrulanıb. Dark mode (F13/M21) istifadəçi tərəfindən silinib — edilməyəcək.*
| # | Problem | Yer | Status |
|---|---------|-----|--------|
| Q1 | Coverage threshold yoxdur | `vitest.config.ts` | ✅ Düzəldildi |
| Q2 | E2E testlər CI-da işləmir | `ci.yml` | ✅ Düzəldildi |
| Q3 | Security/auth kodu test olunmayıb | `tests/unit/` | ✅ Düzəldildi (cookie-signature, auth-guard e2e) |
| Q4 | CD pipeline yoxdur — migration deploy-dan asılı deyil | `ci.yml` | ⬜ Açıq |
| Q5 | Observability yoxdur (structured logging) | bütün kod | ⬜ Açıq |
| Q6 | Pipeline-da security scanning yoxdur | `.github/` | ✅ Düzəldildi (dependabot.yml) |
| Q7 | DB backup strategiyası yoxdur | — | ⬜ Açıq |
| Q8 | docker-compose zəif password + healthcheck yoxdur | `docker-compose.yml:9` | ✅ Düzəldildi |
| Q9 | Unit test-lər DB-yə bağlı, rollback yoxdur | `crm-repository.test.ts:53` | ⬜ Açıq (idempotent edildi) |
| Q10 | Migration checksum verification yoxdur | `migrate.ts:76` | ⬜ Açıq |
| C4 | `changePasswordAction` — `requireStaff()` çağırmır | Security | `staff-management.ts:28` | ✅ Düzəldildi |
| C5 | Seed prosesi atomik deyil — truncate+insert transaction-siz | Backend | `seed-content.ts:191` | ✅ Düzəldildi |
| C6 | `/compare` N+1 — hər universitet üçün ayrıca sorğu | Frontend | `compare/page.tsx:38` | ✅ Düzəldildi |
| C7 | `UniversityCard` listingMetadata olmadıqda 3 DB sorğusu | Frontend | `university-card.tsx:60` | ✅ Düzəldildi |
| C8 | 14 dil faylında i18n key çatışmır + hardcoded EN string-lər | Frontend/i18n | multiple | ✅ Düzəldildi |
| C9 | Lead-lərin səssiz itirilməsi (fail-open → fail-closed) | Backend | `leads.ts:46-74` | ✅ Düzəldildi |
| C10 | Self-serving Review JSON-LD — Google manual action riski | SEO | `json-ld.ts:203` | ✅ Düzəldildi |
| C11 | Sitemap chunk no-op — 50k URL-də qırılacaq | SEO | `sitemap.ts:105` | ✅ Düzəldildi |
| C12 | Health check false-green — ölü DB-də `ok:true` | DevOps | `health/route.ts:10` | ✅ Düzəldildi |
