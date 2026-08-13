# et.md — Vercel-ə Deploy: Tam Hazır Checklist

> Bu, **tək mənbədir**. `etmeli-olduglarimi-mene-et.md`-dəki Supabase detalı burada konsolidə olunub + Vercel/CDN/secrets əlavə edilib. Sıra ilə et, hər addımdakı qeydlərə diqqət et.
> **Bugünkü kod:** deploy-ready. CI (`.github/workflows/ci.yml`) Linux-da `npm run build`-ı yaşıl keçir → Vercel (Linux) eyni build-i işlədəcək.

---

## 0. Arxitektura (qarışıq model — bunu başa düş)

| Təbəqə                                   | Texnologiya                                                  | Env                                                          |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Auth (login/session)**                 | Supabase Auth via `@supabase/ssr` (Google OAuth + email OTP) | `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **Data (universitetlər, lead-lər, CRM)** | Birbaşa Postgres via `pg` (Supabase Postgres-ə)              | `DATABASE_URL`                                               |
| **Storage (sənəd yükləmə)**              | Supabase Storage, **service-role key** (server-only)         | `SUPABASE_SERVICE_ROLE_KEY`                                  |
| **Rate limit**                           | Upstash Redis (tövsiyə) / in-memory fallback                 | `UPSTASH_REDIS_REST_URL` + `_TOKEN`                          |

⚠️ **`SUPABASE_ENABLED=false` qalır.** `createSupabaseCrm` hələ implement olunmayıb (stub atır). Data təbəqəsi həmişə birbaşa `pg` ilə işləyir. Bu flag-ı `true` ETMƏ — app çökər.

---

## 1. Kod tərəfdə nə qaldı? (mənim etdiklərim / qalan)

**Hazırdır (etdim):** lead dead-letter, upload qoruması, logger, backup workflow, vercel.json, runbook-lar, font/FadeIn/ISR/Suspense perf, hero şəkil optimizasiyası, SEO baza, security headers (CSP/HSTS), build-time env yoxlaması (`assertEnv`).

**Sən doldurmalısan (kontent, kod xaricində):** `src/config/site.ts`-də **real** dəyərlər:

- `name`/`legalName` → real brend
- `contact.email` → real (hazırda `hello@studyhub.example`)
- `contact.phone`, `contact.whatsapp.number`/`display` → real
- `contact.address` → tam ünvan (şəhər/küçə/postal)
- `social.*` → real handle-lar (instagram.com/YOURHANDLE və s.)

> **Heç bir kod dəyişikliyi deploy üçün tələb olunmur.** Bu kontent dəyərləridir — commit et, push-la, Vercel avtomatik build edəcək.

---

## 2. SUPABASE hazırlığı (ilk addım)

Supabase Dashboard → sizin project (`yshjzqkrhzlzatvtrsof` və ya yeni).

### 2.1 Açarları götür (Settings → API)

```
NEXT_PUBLIC_SUPABASE_URL        = https://yshjzqkrhzlzatvtrsof.supabase.co   (Project URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY   = eyJ...                                       (anon public)
SUPABASE_SERVICE_ROLE_KEY       = eyJ...                                       (service_role — GİZLİ, server-only)
```

### 2.2 DATABASE_URL götür (Settings → Database → Connection string)

**Birbaşa (direct) bağlantı istifadə et** — port **5432** (pooler 6543 deyil). Səbəb: `migrate.ts` advisory lock və transaction istifadə edir, PgBouncer transaction mode onu sındırır.

```
DATABASE_URL = postgresql://postgres.[REF]:[PAROL]@aws-0-[region].pooler.supabase.com:5432/postgres
```

> Vercel-də çox yüksək konkurrensli olsunsa, app runtime üçün **Session pooler (5432 session mode)** yoxlanıla bilər — amma əvvəlcə direct ilə başla, problem olarsa dəyiş.

### 2.3 Migrasiyaları tətbiq et

**Ümumi migrasiyalar** (local runner ilə, prod-a qarşı) — cədvəlləri yaradır:

```bash
DATABASE_URL="<yuxarıdakı direct string>" npm run db:migrate
```

Ledger + advisory lock + SHA-256 checksum avtomatik idarə olunur. Artıq tətbiq olunanları skip edir.

**Real məzmunu yüklə** (universitetlər/proqramlar/şəhərlər/blog — saytın göstərdiyi məlumat):

```bash
DATABASE_URL="<direct string>" npx tsx scripts/seed-content.ts
```

⚠️ **`--seed` (yəni `npm run db:migrate -- --seed` və ya `npm run db:seed`) İŞLƏTMƏ** — bu həm də `supabase/seed.sql`-i qoşur ki, orada **demo fake məlumat** var (xəyali `admin@studyhub.local`, 12 fake lead). Production-a lazım deyil. Yalnız `db:migrate` + `tsx seed-content.ts`.

**Supabase-only migrasiyalar** (SQL Editor-də, **əll**, filename sırası ilə) — `migrate.ts` bunları local-da skip edir, prod Supabase-də əll tətbiq olunmalı:

- `0005_rls.sql`, `0006_auth_trigger.sql`, `0007_link_profiles_to_auth_users.sql`
- `0009_storage_bucket.sql` (private `application-documents` bucket — dashboard sənədləri)
- `0013_role_guard.sql`
- `0018_rls_least_privilege.sql`
- `0021_apply_documents_bucket.sql` (private `apply-documents` bucket — apply forması)

⚠️ **`apply-documents` PRIVATE-dir** (0021 migration). Köhnə `etmeli-...md`-də "PUBLIC et" yazıb — **ETMƏ**. Upload service-role ilə işləyir, RLS-siz private bucket düzgündür.

### 2.4 Auth konfiqurasiyası (Authentication → URL Configuration)

- **Site URL:** `https://[SƏNİN-DOMENİN]`
- **Redirect URLs** (hamısını əlavə et):
  ```
  http://localhost:3000/auth/callback
  https://[SƏNİN-DOMENİN]/auth/callback
  https://*-vercel.app/auth/callback   (preview deploylar üçün)
  ```

### 2.5 Google Provider (Authentication → Providers → Google)

Google Cloud Console → APIs & Services → Credentials → Create OAuth client ID (Web):

- **Authorized redirect URIs:** `https://yshjzqkrhzlzatvtrsof.supabase.co/auth/v1/callback`
- Client ID + Secret götür → Supabase Google provider-ə yapışdır → Save.
- (Email OTP də aktiv qalsın — admin/consultant üçün lazım ola bilər; "Confirm email" OFF ola bilər Google artıq doğrulayır).

---

## 3. VERCEL deploy

### 3.1 Import

vercel.com → Add New → Project → GitHub repo-nu import et → Framework avtomatik **Next.js** görünür.

### 3.2 Environment Variables (Settings → Environment Variables)

_*Hamısını "Production" və "Preview" (və NEXT_PUBLIC_* olanları "Development" də) üçün qoy._*

Build-time tələb olunan (build keçməsi üçün):

```
NEXT_PUBLIC_SITE_URL = https://[SƏNİN-DOMENİN]      ← MÜTLƏQ (assertEnv build-i dayandırır olmadan)
SUPABASE_ENABLED     = false                         ← MÜTLƏQ false
```

Runtime tələb olunan:

```
DATABASE_URL                    = <2.2-dəki direct string>
NEXT_PUBLIC_SUPABASE_URL        = <2.1>
NEXT_PUBLIC_SUPABASE_ANON_KEY   = <2.1>
SUPABASE_SERVICE_ROLE_KEY       = <2.1, gizli>
SESSION_SECRET                  = <openssl rand -hex 32 ilə generasiya et>
TRUST_PROXY                     = 1
```

Tövsiyə olunan (rate limit + analytics):

```
UPSTASH_REDIS_REST_URL         = <upstash redis REST url>
UPSTASH_REDIS_REST_TOKEN       = <upstash token>
NEXT_PUBLIC_GA_ID              = G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID         = <clarity id>
```

İstəyə bağlı:

```
OPENAI_API_KEY                 = <chatbot üçün; olmadıqda graceful fallback>
INITIAL_ADMIN_EMAIL            = senin@gmail.com   (ilk admin login)
NEXT_PUBLIC_ENABLE_REVIEW_JSONLD = true            (real review mənbəyi olanda)
```

⚠️ **`DEV_AUTH_ENABLED` QOYMAYIN** (və ya yalnız local `.env.local`-də). Production-da NODE_ENV gate onu inert edir, amma qoyma daha təhlükəsiz.

### 3.3 Deploy

"Deploy" bas. İlk build `NEXT_PUBLIC_SITE_URL` + `SUPABASE_ENABLED=false` ilə (DB-siz) keçməlidir.

### 3.4 Custom Domain

Settings → Domains → əlavə et → DNS-i yönləndir (Vercel nameservers və ya A/CNAME). `NEXT_PUBLIC_SITE_URL`-i real domenə uyğunla (Production env). Sonra Supabase Redirect URLs (2.4) və Google OAuth redirect (2.5) və `siteConfig`-i də yenilə.

---

## 4. UPSTASH REDIS (rate limit üçün — tövsiyə)

Edge chat route (`/api/chat` runtime=edge) və serverless instance-lər üçün in-memory rate limit etibarsızdır (hər instance öz sayğını saxlayır). Redis olmadan real limit = max × instance sayı.

console.upstash.com → Create Database (Redis) → REST section:

```
UPSTASH_REDIS_REST_URL   = https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN = xxxx
```

→ Vercel env-ə qoy. Edilən kimi bütün rate limit-lər (chat 10/dəq, search 30/dəq, leads 5/dəq, upload 20/dəq, /api/me 30/dəq) Redis-də shared olunur.

---

## 5. ANALİTİKA + AXTARIŞ KONSOLU

- **GA4:** analytics.google.com → stream yarat → `G-XXXXXXXXXX` → `NEXT_PUBLIC_GA_ID`.
- **Microsoft Clarity:** clarity.microsoft.com → project yarat → `NEXT_PUBLIC_CLARITY_ID`.
- **Google Search Console:** property yarat (domain və ya URL prefix) → verify (DNS və ya HTML tag) → **sitemap təqdim et:** `https://[domain]/sitemap.xml`.
- **Bing Webmaster Tools:** eyni şəkildə, sitemap təqdim et.

---

## 6. İLK ADMİN (avto deyil — əll SQL ilə)

⚠️ Köhnə etmeli-də "ilk Gmail avtomatik admin" deyirdi — **YANLIŞ**. `INITIAL_ADMIN_EMAIL` kodda heç oxunmur (ölü config). Security fix ilə email-auto-link silinib. Admin-i **SQL ilə əll** verirsən:

1. `https://[domain]/[locale]/dashboard/login` → **Google ilə daxil ol**.
   - Bu Supabase-də auth user yaradır + `profiles` cədvəlinə **tələbə** profili əlavə edir (email + auth_uid ilə). (Bu addım profili yaratmaq üçün lazımdır.)
2. Supabase → **SQL Editor** → çalışdır:
   ```sql
   update public.profiles set role = 'admin' where email = 'senin@gmail.com';
   ```
3. **Logout et** → `https://[domain]/admin/login` → Google ilə daxil ol → artıq admin.
4. `/admin/users`-dən başqa Gmail-ləri **consultant/editor** kimi əlavə et (bunu admin panel özü edir, SQL lazım deyil).

---

## 7. SMOKE TEST (deploy sonrası)

- [ ] `https://[domain]/api/health` → `{"ok":true}` 200 (DB live-dırsa)
- [ ] Ana səhifə, bir universitet detal, `/apply`, `/blog` açılır
- [ ] `/[locale]/dashboard/login` → Google login işləyir → dashboard açılır
- [ ] `/admin/login` → admin login işləyir
- [ ] Apply forması: universitet seç + sənəd yüklə + göndər → `/admin`-də lead görünür
- [ ] Floating WhatsApp/Telegram/Chat düymələri
- [ ] `https://[domain]/sitemap.xml` və `/robots.txt` düzgün domain
- [ ] GSC "URL inspect" ilə bir neçə səhifəni indexləməyə təlqin et

---

## 8.ƏSAS TƏLƏLƏR / PITFALL-LAR

1. **Local build EINVAL readlink** = OneDrive `.next`-ə müdaxilə edir. Vercel-də YOXDUR. Local build yoxlamaq istəsən `.next`-i OneDrive xaricinə qoy (müvəqqəti `distDir`) və ya CI-ə etibar et.
2. **`SUPABASE_ENABLED=false` saxla.** `true` etsən `createSupabaseCrm` throw edib app çökər.
3. **`DATABASE_URL` direct (5432)** — migrasiya üçün vacib (advisory lock). Pooler 6543 ilə migrate etmə.
4. **Buckets PRIVATE:** `apply-documents` (0021) və `application-documents` (0009) ikisi də private. PUBLIC etmə.
5. **`SESSION_SECRET`** prod-da MÜTLƏQ güclü təsadüfi dəyər (dev default `dev-insecure-...` cookie forjerə açıqdır, amma yalnız dev-auth yolunda — prod-da inert).
6. **`NEXT_PUBLIC_SITE_URL`** hər yerdə (build + runtime + Production + Preview) real domen olmalı — canonical/hreflang/sitemap/OG hamısı bundan asılı.
7. **Edge chat rate limit** Redis-siz işləmir effectively — Upstash qur.
8. **Next 16 upgrade** ayrı iş — npm audit 3 high (sharp/libvips + postcss) yalnız Next 16 major ilə düzəlir. Deploy-u dayandırma, sonra planla.

---

## 9. AÇARLAR — yekin siyahı (harada)

| Açar                            | Haradan                           | Build? | Runtime?            |
| ------------------------------- | --------------------------------- | ------ | ------------------- |
| `NEXT_PUBLIC_SITE_URL`          | sənin domenin                     | ✅     | ✅                  |
| `SUPABASE_ENABLED=false`        | sabit                             | ✅     | ✅                  |
| `DATABASE_URL`                  | Supabase → Database (direct 5432) | —      | ✅                  |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase → API (Project URL)      | ✅     | ✅                  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → API (anon)             | ✅     | ✅                  |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase → API (service_role)     | —      | ✅                  |
| `SESSION_SECRET`                | `openssl rand -hex 32`            | —      | ✅                  |
| `TRUST_PROXY=1`                 | sabit (Vercel trusted proxy)      | —      | ✅                  |
| `UPSTASH_REDIS_REST_URL`        | Upstash console                   | —      | ✅                  |
| `UPSTASH_REDIS_REST_TOKEN`      | Upstash console                   | —      | ✅                  |
| `OPENAI_API_KEY`                | platform.openai.com               | —      | ✅ (istəyə bağlı)   |
| `NEXT_PUBLIC_GA_ID`             | GA4                               | ✅     | ✅                  |
| `NEXT_PUBLIC_CLARITY_ID`        | Clarity                           | ✅     | ✅                  |
| `INITIAL_ADMIN_EMAIL`           | sənin gmail                       | —      | ✅                  |
| `BACKUP_DATABASE_URL`           | Supabase direct (select grant)    | —      | (GH Actions secret) |

> `NEXT_PUBLIC_*` olanlar brauzerə exposed olur — anon key/sayt URL-i GA ID kimi təhlükəsizdir. **`SUPABASE_SERVICE_ROLE_KEY` və `SESSION_SECRET` və `OPENAI_API_KEY` heç vaxt `NEXT_PUBLIC_` prefix-i almamalıdır** — server-only.

---

_Deploy uğurlu olanda: GSC-də sitemap təqdim et, bir həftə izlə, sonra `s.md` "Google #1 roadmap" (cornerstone kontent, program detail səhifələr, backlink) üzərində işə başla._
