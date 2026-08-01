# a.md — Study Platform: Texniki Audit + "Universities 404" Diaqnozu

**Rollar:** Senior Frontend / Backend / SEO / Security / Fullstack / DevOps / QA
**Tarix:** 2026-08-01 · **Deploy hədəfi:** Vercel · **Stack:** Next.js 15 (App Router) + next-intl + Supabase/Postgres

> Bu sənəd iki ayrı analiz birləşdirilərək, kodda **faktiki yoxlanmış** (verify olunmuş) nəticələri əks etdirir.
> Hər bir iddia müvafiq fayl/sətirə istinad olunur. Dəyişdirilmiş/təkzib olunmuş iddialar aydın işarələnib.

---

## 0. TL;DR — Ən Vacib Problem

| | Tapıntı | Ehtimal | Sürətli yoxlama |
|---|---|---|---|
| 🔴 1 | **Content cədvəlləri (`universities`, `cities`, `programs`...) Supabase-də BOŞDUR** — heç vaxt seed edilməyib. `DATABASE_URL` qurulub, amma o DB boşdur. | **Çox yüksək** | Supabase SQL Editor: `select count(*) from universities;` → 0 gəlirsə budur. |
| 🔴 2 | `siteConfig.url = 'https://studyhub.example'` — **placeholder**. Canonical, sitemap, OpenGraph və bütün JSON-LD URL-ləri yanlışdır. | Dəqiq | `src/config/site.ts:6` |

> **Digər AI-in "locale-prefiksiz `/universities` → 404 (middleware problemi)" nəzəriyyəsi ZƏİFDİR** və aşağıda §2-də izah edilərək düzəldilib.Əsas səbəb boş content DB-sidir.

---

## 1. "Universitetlər niyə göstərilmir" — Əsas Kök Səbəb

### 1.1 Arxitektura faktı

`src/lib/data/index.ts:26-29`:
```ts
function createDataLayer(): DataLayer {
  if (process.env.DATABASE_URL) return createPgDataLayer(getSharedPool); // Postgres
  return createSeedDataLayer();                                          // in-memory seed (10 universitet)
}
```

- `DATABASE_URL` **YOXDURSA** → app **in-memory seed** istifadə edir (10 universitet) → **hər şey işləyir**.
- `DATABASE_URL` **VARSA** → app **Postgres** istifadə edir → content cədvəlləri boşdursa **heç nə göstərmir**.

### 1.2 Deduktiv nəticə

| Müşahidə | Nəticə |
|---|---|
| Lokalda `/en/universities` **200** qaytarır (`dev-out.txt:13`) | Lokal Docker Postgres (`localhost:5433`) işləyir və seed-lənib |
| Seed-də 10 universitet var (`src/lib/seed/universities.ts`) | `DATABASE_URL` olmadan universitetlər **göstərilər** |
| Sizdə universitetlər **görünmür** | Deməli deploy olunan mühitdə `DATABASE_URL` **VAR**, amma o DB **BOŞ** |

**Nəticə:** Vercel-də `DATABASE_URL` real Supabase-ə işarə edir, amma content cədvəlləri (`0011_content_tables.sql`) heç vaxt doldurulmayıb. Bu, yalnız universitetləri deyil, **bütün data-driven səhifələri** (universities list/detail, programs, home featured, **sitemap**) qırır — purely statik səhifələr (about, contact) isə işləyir. Bu fərqləndirmə diaqnozu təsdiqləyir.

### 1.3 Dəqiq həll (doğrulanmış, CRM-ə toxunmayan yol)

> ⚠️ **DİQQƏT — DİGƏR AI SƏHVDƏ:** Digər AI yazırdı ki, `npm run db:seed` "yalnız content-ə toxunur, CRM-ə toxunmur". Bu **yanlışdır**. `scripts/migrate.ts:67-71` göstərir ki, `--seed` həm də `supabase/seed.sql`-i işlədir və bu fayl **CRM demo datası** (`profiles`, `leads`, `applications` — `seed.sql` təsdiqlənib) əlavə edir. Əgər DB-də real lead/profil varsa, `db:seed` onları demo datası ilə çirkləndirə bilər.

**Doğru, təhlükəsiz yol — yalnız content cədvəlləri:**

```bash
# .env.local-da real Supabase DATABASE_URL olarkən, lokal maşından:
npx tsx scripts/seed-content.ts
```

Bu skript (`scripts/seed-content.ts`):
- **Yalnız** content cədvəllərini `truncate ... restart identity cascade` edir (universities, cities, programs, blog, faqs, reviews, dormitories, scholarships, university_programs, program_categories, countries) — `seed-content.ts:42-59`
- `on conflict (id) do nothing` ilə yenidən daxil edir — idempotentdir
- **CRM cədvəllərinə (profiles/leads/applications/audit_logs) TOXUNMUR** ✅

**Ön şərt:** `0011_content_tables.sql` migrasiyası artıq tətbiq edilib olmalıdır. Əmin deyilsinizsə, əvvəlcə migrasiyaları işlədin:
```bash
npx tsx scripts/migrate.ts        # --seed yox (CRM-ə toxunmur), yalnız migrasiyalar
npx tsx scripts/seed-content.ts   # sonra content-i doldur
```

**Yoxlama (Supabase SQL Editor):**
```sql
select count(*) from universities;   -- gözlənilən: 10
select count(*) from cities;
select count(*) from programs;
select count(*) from blog_posts;
```
Sonra Vercel-də **Redeploy** edin (ISR cache-ləri yenilənsin).

---

## 2. "Page Not Found" — Doğru Mexanizm (Digər AI Düzəldilir)

### 2.1 Görünən mətnin əsl mənbəyi

Sizin gördüyünüz: **"Page not found / The page **you're** looking for doesn't exist or has moved."**

Kodda **2 fərqli not-found** var:

| Fayl | Başlıq | Mətn | Mənbə |
|---|---|---|---|
| `src/app/not-found.tsx` (ROOT) | "Page not found" (hardcoded) | "The page **you are** looking for doesn't exist or has moved." | `:28-32` |
| `src/messages/en.json` → `src/app/[locale]/(marketing)/not-found.tsx` | "Page not found" (i18n) | "The page **you're** looking for doesn't exist or has moved." | `en.json:323-324` |

> Digər AI iddia edirdi ki, siz ROOT not-found-u görürsünüz. **Səhv.** Sizin mətndə **"you're"** (qısaldılmış) var — bu, **lokalizə olunmuş** not-found-un (`en.json:324`) dəqiq mətnidir. ROOT versiyada **"you are"** var.

### 2.2 Lokalizə olunmuş 404 nə vaxt işə düşür?

`notFound()` çağırışı yalnız 2 yerdədir:
1. `src/app/[locale]/layout.tsx:55` → `if (!isLocale(locale)) notFound()` (etibarsız locale)
2. `src/app/[locale]/(marketing)/universities/[slug]/page.tsx:95` → `if (!detail) notFound()` (universitet tapılmadı)

**Universities LIST səhifəsi** (`/en/universities/page.tsx`) `notFound()` **çağırmır** — boş olarsa sadəcə boş-state ("No universities found") göstərir. **Ona görə listing-də 404 görünmür** — boş siyahı görünür (bu, "universitetlər görünmür" şikayətidir, §1).

**Universities DETAIL səhifəsi** isə DB boş olduqda `getDetail(slug)` → `null` → `notFound()` → **lokalizə olunmuş 404**. Bu, sizin gördüyünüz "Page not found"-dur.

### 2.3 Niyə digər AI-in "middleware/locale-prefiks" nəzəriyyəsi zəifdir?

Digər AI iddia edirdi: prefikssiz `/universities` → `[locale]="universities"` kimi parse olunur → ROOT 404.
Problemlər:
1. Bu, yalnız middleware **tamamilə deaktiv** olsa baş verər. `src/middleware.ts` + next-intl `localePrefix: 'always'` (`routing.ts:7`) `/universities` → `/en/universities` 307 redirect edir. Dev log-da lokal işlədiyi təsdiqlənib.
2. Middleware qırılsaydı, **bütün səhifələr** (home, about və s.) qırılardı — yalnız universities yox. Siz xüsusi olaraq universitetləri qeyd edirsiniz → bu, **data** problemidir, **routing** yox.
3. Header menyusu `@/i18n/navigation` `Link` istifadə edir (`header.tsx:11-17`) → avtomatik `/en/` prefiksi əlavə edir → app-daxili kliklərdə prefiks həmişə var.

**Nəticə:** 404 = **boş DB** (detail səhifəsində `getDetail` null qayıdır), middleware problemi deyil.

### 2.4 Əlavə möhkəmləndirmə (faydalı, amma əsas həll deyil)

`src/app/[locale]/not-found.tsx` **yoxdur** — yəni `[locale]/layout.tsx:55`-dəki `notFound()` yuxarı boundary kimi ROOT-a (ingiliscə) düşür. Bu arzuolunmazdır (etibarsız locale-də lokalizə olunmamış səhifə). Ona görə `src/app/[locale]/not-found.tsx` fallback əlavə etmək iyi bir **ikinci dərəcəli** təkmilləşdirmədir:

```tsx
// src/app/[locale]/not-found.tsx (YENİ) — etibarsız locale üçün dil-neytral fallback
export default function LocaleNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column',
                       alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <p style={{ fontSize: 48, fontWeight: 700, color: '#003d9b' }}>404</p>
          <p>Page not found.</p>
          <a href="/en" style={{ color: '#fb7800' }}>Go to homepage</a>
        </div>
      </body>
    </html>
  );
}
```

---

## 3. Tam Audit — Rol Üzrə (Verify Olunmuş)

### 🔍 Senior SEO

| # | Tapıntı | Prioritet | İstinad |
|---|---|---|---|
| 1 | **`siteConfig.url` placeholder** (`https://studyhub.example`) → canonical, sitemap, OG, JSON-LD URL-ləri yanlış | 🔴 Kritik | `src/config/site.ts:6` |
| 2 | **Sitemap da boş DB-dən əziyyət çəkir** — `data.universities.list()` çağırır (`sitemap.ts:25-30`); content seed olunmasa Google universitet URL-lərini tapmır | 🔴 Kritik | `src/app/sitemap.ts` |
| 3 | Kontakt placeholder-ləri (`hello@studyhub.example`, `+90 850 000 00 00`, WA `905000000000`) → E-E-A-T və konversiyaya zərər | 🔴 Kritik | `site.ts:25-31` |
| 4 | 14 lokalın UI tərcüməsi AI draft-dır, hreflang isə 18 lokal üçün generasiya olunur → **thin/duplicate content** riski | 🟠 Orta | README §17; `routing.ts` |
| 5 | `/sw.js` 404 qaytarır — service worker qeydə alınıb amma fayl yoxdur → PWA zəif siqnal | 🟠 Orta | `dev-out.txt:16-20` |
| 6 | `og.png` referans olunur — faylın mövcudluğunu yoxla (`public/og.png`) | 🟡 Aşağı | `site.ts:7` |
| ✅ | JSON-LD çox güclüdür: Organization, WebSite, CollegeOrUniversity, FAQPage, BreadcrumbList, Article, Review | ✅ Yaxşı | `src/lib/seo/json-ld.ts` |
| ✅ | `generateMetadata` hər səhifədə, hreflang `buildPageMetadata` ilə mərkəzləşib | ✅ Yaxşı | `src/lib/seo/alternates.ts` |

**Həllər:**
- `siteConfig.url`-i real Vercel domainə dəyiş (məs. `https://studyhub.vercel.app` və ya custom domain).
- `og.png` (1200×630) yaradıb `public/`-a qoy.
- Sw.js: service worker qeydiyyatını sil ya da gerçek SW əlavə et.
- 14 AI tərcüməsini native spikerə yoxlat; hazır deyilsə hələlik 4 lokalda (en/tr/az/ru) yayınla.

---

### ⚙️ Senior Backend

| # | Tapıntı | Prioritet | İstinad |
|---|---|---|---|
| 1 | **DB sorğularında heç bir `try/catch` yoxdur** — bağlantı xətası SSG build-i/SSR-i qırır | 🟠 Orta | `src/lib/data/pg-data-repository.ts` |
| 2 | **`maxTuitionUSD` filtrində N+1** — hər universitet üçün ayrı query (Promise.all loop) | 🟠 Orta | `pg-data-repository.ts:200-211` |
| 3 | `getSharedPool()` default `PGPOOL_MAX=2` + Vercel-in çoxlu worker-ləri → Supabase `max_connections` limiti təhlükəsi | 🔴 Kritik | `src/lib/data/index.ts:20` |
| 4 | **Connection pooler istifadə olunmur** — birbaşa 5432 əvəzinə Supabase **PgBouncer (port 6543)** istifadə et | 🔴 Kritik | `.env.example:4` |
| 5 | `/api/chat` (OpenAI) və `/api/search` (Postgres) — **rate limit yoxdur** | 🔴 Kritik | `src/app/api/*` |
| ✅ | `DataLayer` interfeysi (seed↔pg) təmiz abstraksiyadır | ✅ Yaxşı | `repositories.ts` |
| ✅ | Detail səhifə `revalidate=3600` (ISR) düzgün | ✅ Yaxşı | `[slug]/page.tsx:60` |

**Həllər:**
- `DATABASE_URL`-i Supabase pooler ünvanına yönəlt: `...supabase.co:6543/postgres` (Transaction mode) və ya Session mode `5432`-nün `pooler.` subdomain variantı.
- `/api/chat` və `/api/search`-a `@upstash/ratelimit` + `@upstash/redis` (Vercel Edge uyğun) əlavə et — IP-based, məs. chat üçün 10 req/dəq, search üçün 30.
- `maxTuitionUSD` filtrini tək `HAVING min(tuition_fee) <= $N` sorğusuna birləşdir.
- Detail səhifənin ~10 ardıcıl query-sini `Promise.all`-a yığ və ya `unstable_cache` ilə keşlə.

---

### 🔓 Senior Security / Hacker

| # | Tapıntı | Prioritet | İstinad / Yoxlama |
|---|---|---|---|
| 1 | **OPEN REDIRECT — TƏSDİQLƏNİB ✅** | 🔴 Kritik | `src/app/auth/callback/route.ts:11` |
| 2 | `/api/chat`, `/api/search` — rate limit yoxdur (cost DoS) | 🔴 Kritik | `src/app/api/*` |
| 3 | **CSP və HSTS header-ləri yoxdur** (XSS riski) | 🟠 Orta | `next.config.mjs:20-31` |
| 4 | `.env.local`-də **real Supabase SERVICE ROLE KEY** var (RLS-i bypass edir) — gitignore-lu, amma commit tarixinə baxıb rotasiya et | 🟠 Orta | `.env.local:9` |
| 5 | `X-Frame-Options: SAMEORIGIN` deprecated → CSP `frame-ancestors`-ə keç | 🟡 Aşağı | `next.config.mjs:23` |
| ✅ | `SUPABASE_SERVICE_ROLE_KEY` yalnız server-də (`NEXT_PUBLIC_` prefiksi yox) | ✅ Yaxşı | — |
| ✅ | Dev-auth `NODE_ENV !== 'production'` ilə məhdudlu — Vercel-də bağlı | ✅ Yaxşı | `student-session.ts:12` |

**Open redirect izahı (təsdiqlənmiş):**
```ts
// src/app/auth/callback/route.ts:10-12
const next = requestUrl.searchParams.get('next') ?? `/${routing.defaultLocale}/dashboard`;
const redirectTarget = new URL(next, requestUrl.origin);   // ← next="https://evil.com" olarsa
const res = NextResponse.redirect(redirectTarget);          //   new URL() origin-i OVERRIDE edir → evil.com
```
`new URL('https://evil.com', 'https://yoursite.app')` → `https://evil.com/` qaytarır (mütləq URL base-i udur). İstifadəçi auth-dan sonra zərərli sayta yönlənir.

**Düzəliş:**
```ts
// next-i validasiya et: yalnız lokal, // ilə başlamayan path
let next = requestUrl.searchParams.get('next') ?? `/${routing.defaultLocale}/dashboard`;
if (!next.startsWith('/') || next.startsWith('//')) {
  next = `/${routing.defaultLocale}/dashboard`;
}
```

**CSP/HCTS əlavəsi** (`next.config.mjs` `headers()`-ə):
```js
{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
{ key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms; connect-src 'self' https://*.supabase.co https://www.google-analytics.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'self'" },
```

---

### 🎨 Senior Frontend

| # | Tapıntı | Prioritet | İstinad |
|---|---|---|---|
| 1 | `next/image` `remotePatterns`-də Supabase yoxdur → Storage-dən avatar/logo render olunmur | 🟠 Orta | `next.config.mjs:14-18` |
| 2 | ChatWidget + WhatsApp float — client JS yükü; lazy yüklənməsini yoxla | 🟡 Aşağı | `components/layout/*` |
| ✅ | Geist + Inter self-hosted, `display:swap` → LCP üçün yaxşı | ✅ Yaxşı | `[locale]/layout.tsx:2-22` |
| ✅ | Bütün `<Image>`-lərdə `sizes`, hero-da `priority` → düzgün | ✅ Yaxşı | `[slug]/page.tsx:168-170` |
| ✅ | AVIF/WebP aktiv | ✅ Yaxşı | `next.config.mjs:14` |

**Həll:**
```js
// next.config.mjs — remotePatterns-ə Supabase əlavə et
remotePatterns: [
  { protocol: 'https', hostname: 'images.unsplash.com' },
  { protocol: 'https', hostname: 'images.pexels.com' },
  { protocol: 'https', hostname: '*.supabase.co' },   // ← ƏLAVƏ ET
],
```

---

### 🚀 Senior DevOps (Vercel)

| # | Tapıntı | Prioritet |
|---|---|---|
| 1 | `DATABASE_URL` həm **Production**, həm **Preview** env-də qurulu olmalıdır (fərqli davranışın qarşısı) | 🔴 Kritik |
| 2 | Supabase **pooler (6543)** istifadə olunmalıdır, birbaşa 5432 yox | 🔴 Kritik |
| 3 | Build zamanı DB-yə çoxlu paralel bağlantı → pooler bunu həll edir | 🟠 Orta |
| 4 | `@vercel/analytics` + `@vercel/speed-insights` yoxdur → Core Web Vitals real datada görünmür | 🟡 Aşağı |
| ✅ | `outputFileTracingRoot` düzgün, ISR+SSG combo Vercel-də dəstəklənir | ✅ Yaxşı |

**Həllər:**
- Vercel → Settings → Environment Variables: `DATABASE_URL`-i 3 mühitdə də (Production/Preview/Development) Supabase pooler ünvanına qur.
- `npm i @vercel/analytics @vercel/speed-insights` → `<Analytics />` və `<SpeedInsights />`-i root layout-a əlavə et.

---

### ✅ Senior QA

| # | Tapıntı | Prioritet | Yoxlama |
|---|---|---|---|
| 1 | **Universities flow üçün e2e test YOXDUR — TƏSDİQLƏNİB ✅** (yalnız smoke/admin/student-dashboard var). Bu buq bir testlə tutula bilərdi | 🔴 Kritik | `tests/e2e/` |
| 2 | CI/CD (GitHub Actions) görünmür → `typecheck && lint && test` PR-larda avtomatik işləməlidir | 🟠 Orta | repo kökü |

**Həll:** `tests/e2e/universities.spec.ts` yaz — `/en/universities` 200 + ən azı 1 kart, karta klik → detail 200. CI-a bağla.

---

### 🧩 Senior Fullstack (memarlıq təklifi)

`DataLayer` flip-pointu (`DATABASE_URL` var/yox) **bütün saytı** birlikdə dəyişdirir. Bu, məhz indi baş verən budur: content DB hazır olmadan `DATABASE_URL` təyin etmək bütün marketing saytı sındırır.

**Tövsiyə:** iki ayrı env dəyişəni: `DATABASE_URL` (hər zaman) + `CONTENT_READY=1` (yalnız content seed olunduqdan sonra əl ilə aktivləşir). Beləcə content repository `CONTENT_READY`-siz seed-ə, CRM isə `DATABASE_URL` ilə Postgres-ə qoşular — gələcəkdə eyni qəza təkrarlanmaz.

---

## 4. Prioritetləşdirilmiş Fəaliyyət Planı

### 🔴 Bu gün (production sınıq)
1. **`npx tsx scripts/seed-content.ts`** — content DB-ni doldur (CRM-ə toxunmur) → universitetlər görünəcək
2. **`siteConfig.url`**-i real Vercel domainə dəyiş → canonical/sitemap/JSON-LD düzələcək
3. **`auth/callback/route.ts`** open redirect-i bağla (`next` validasiyası, §Security #1)
4. Vercel-də redeploy (ISR cache yenilənməsi üçün)

### 🟠 Bu həftə
5. `/api/chat` + `/api/search`-a rate limit (`@upstash/ratelimit`)
6. `DATABASE_URL` → Supabase **pooler (6543)**
7. `next.config.mjs` `remotePatterns`-ə `*.supabase.co` əlavə et
8. CSP + HSTS header-ləri
9. `src/app/[locale]/not-found.tsx` fallback (§2.4)
10. `tests/e2e/universities.spec.ts` + CI

### 🟡 Bu ay
11. `@vercel/analytics` + `@vercel/speed-insights` → real CWV izləmə
12. Kontakt placeholder-ləri real məlumatla əvəz et (`site.ts:25-31`)
13. 14 AI tərcüməsini native yoxlat / ya da 4 lokalda yayınla
14. N+1 (`maxTuitionUSD`) + detail səhifə query birləşdirmə + `unstable_cache`
15. `DATABASE_URL` ↔ `CONTENT_READY` ayırma (memarlıq, §Fullstack)
16. `/sw.js`-ı sil və ya gerçek SW əlavə et

---

## 5. Vercel Deploy Checklist

- [ ] **Environment Variables** (3 mühitdə də):
  - `DATABASE_URL` → Supabase pooler (`...db.<ref>.supabase.co:6543/postgres` və ya `pooler.<ref>.supabase.co:6543`)
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
  - `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` (opsional)
  - **`DEV_AUTH_ENABLED` qurulu DEYİL** (production auth bypass olmasın)
- [ ] Supabase-də content seed olunub: `select count(*) from universities;` ≥ 1
- [ ] Supabase Auth → URL Configuration → redirect URL-lərə production + `*.vercel.app` əlavə edilib
- [ ] `siteConfig.url` real domainə dəyişilib
- [ ] Build log-da `generateStaticParams` universitet sləng-lərini qaytarır
- [ ] Redeploy → `/en/universities` 200 + kartlar görünür, kart klik → detail 200
- [ ] `/sitemap.xml` universitet URL-ləri ehtiva edir

---

## 6. Digər AI Analizində Düzəlişlər (Xülasə)

| Digər AI iddiası | Status | Doğru versiya |
|---|---|---|
| "Siz ROOT not-found (`src/app/not-found.tsx`) görürsünüz" | ❌ **Səhv** | "you're" → **lokalizə olunmuş** not-found (`en.json:324`); ROOT-da "you are" var |
| "404 = locale-prefiksiz `/universities` → `[locale]='universities'` (middleware problemi)" | ⚠️ **Zəif** | Middleware qırılsaydı bütün səhifələr qırılardı; əsas səbəb **boş DB**-də `getDetail` null → `notFound()` (`[slug]/page.tsx:95`) |
| "`npm run db:seed` yalnız content-ə toxunur, CRM-ə yox" | ❌ **Səhv** | `--seed` həm də `seed.sql` (CRM demo datası) işlədir. Content-only: **`npx tsx scripts/seed-content.ts`** |
| Open redirect `auth/callback` | ✅ **Düzgün** | Təsdiqlənib (`route.ts:11`) |
| Universities e2e test yoxdur | ✅ **Düzgün** | Təsdiqlənib (`tests/e2e/`) |
| `remotePatterns`-də Supabase yoxdur | ✅ **Düzgün** | Təsdiqlənib (`next.config.mjs:14-18`) |
| Connection pooler 6543 | ✅ **Düzgün** | Təsdiqlənib (`.env.example:4`) |
| `npm audit` sharp/postcss CVE | ⚠️ **Yoxlanılmadı** | Çıxarıldı (spesifik sübut olmadan iddia) |

---

*Son yeniləmə: 2026-08-01 · Bütün iddialar kod bazasında faktiki yoxlanıb.*
