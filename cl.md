# Audit Təhlükəsizlik / SEO — Doğruluq Yoxlaması (cl.md)

> **Mənbə:** AI audit hesabatı. Hər bir tapıntı faktiki kodla yoxlanıb.
> **Tarix:** 2026-08-03
> **Status:** Təsdiqlənmiş (verified) / Yanlış (false) / Artıq həll olunub (already-done)

---

## Xülasə cədvəli

| # | Tapıntı | AI səviyyəsi | Yoxlama nəticəsi | Fayl(lar) |
|---|---------|-------------|------------------|-----------|
| 1 | Admin "dev login" backdoor — `NODE_ENV`-ə etibar edir | 🔴 Kritik | ✅ **TƏSDİQ** | `student-session.ts:12` |
| 2 | 6 dil (bg/id/so/sw/ur/uz) boşdur, amma tam indeksləşir | 🔴 Kritik (SEO) | ✅ **TƏSDİQ** | `sitemap.ts:58`, `alternates.ts:16` |
| 3 | `/api/chat` — rate limit yoxdur, `messages` validasiyasız | 🟠 Yüksək | ✅ **TƏSDİQ** | `api/chat/route.ts:36,49` |
| 4 | `/en/universities` 404 — lokal mühit səbəbi | 🟢 Aşkarlandı | ✅ **TƏSDİQ** (lokal DB) | `generateStaticParams` (try/catch var) |
| 5 | GEO məzmunu yalnız 4 dil / 4 səhifə tipində | 🟡 Orta | ✅ **TƏSDİQ** | `geo.ts:15` |
| 6 | `/api/chat` + `submitLead` üçün rate limiting yoxdur | 🟠 Yüksək | ✅ **TƏSDİQ** | `leads.ts`, `api/chat/route.ts` |
| 7 | Admin/dashboard səhifələrində `noindex` meta yoxdur | 🟡 Aşağı | ✅ **TƏSDİQ** | `admin/layout.tsx`, `dashboard/(app)/layout.tsx` |
| 8 | `generateStaticParams`-a try/catch əlavə et (audit tövsiyəsi) | 🟡 Orta | ❌ **YANLIŞ** — artıq var | 4 detal səhifəsi |

---

## 1. ✅ TƏSDİQ — Admin "dev login" backdoor (🔴 KRİTİK)

**Sübut:**

`src/lib/crm/student-session.ts:11-13`:
```ts
export function isDevAuthEnabled(): boolean {
  return process.env.DEV_AUTH_ENABLED === '1' || process.env.NODE_ENV !== 'production';
}
```

`src/app/admin/login/page.tsx:13-14`:
```ts
const showDev = isDevAuthEnabled();
const staff = showDev ? await crm.listStaff() : [];
```
→ Aktiv olduqda bütün staff adları + rolları açıq görünür, kliklə parolsuz login.

`src/app/[locale]/dashboard/login/page.tsx:19-22`:
```ts
const isDev = isDevAuthEnabled();
if (isDev) demoStudents = await crm.listStudents();
```
→ Tələbə login-da da eyni backdoor.

**Risk:** `NODE_ENV !== 'production'` şərti staging/preview mühitdə (`NODE_ENV=staging` və ya process manager NODE_ENV-i düzgün ötürməsə) backdoor-u canlandırır.

**Müsbət:** `devLogin()` (`admin-auth.ts:15-17`) hər dəfə DB-dən rolu təzədən yoxlayır — cookie saxtalaşdırma ilə rol yüksəltmə mümkün deyil. Problem YALNIZ "kim login ola bilər" qapısındadır.

**Düzəliş:**
```ts
export function isDevAuthEnabled(): boolean {
  return process.env.DEV_AUTH_ENABLED === '1';
}
```
+ `.env.example:27-28` şərhini və `student-session.ts:10` şərhini yenilə.
﻿

---

## 2. ✅ TƏSDİQ — 6 boş dil tam indeksləşir (🔴 KRİTİK SEO)

**Sübut — messages fayl ölçüləri (sətir sayı):**

| Dil | Sətir | Status |
|-----|-------|--------|
| bg | 41 | 🔴 demək olar ki, boş |
| sw | 42 | 🔴 demək olar ki, boş |
| id | 42 | 🔴 demək olar ki, boş |
| so | 42 | 🔴 demək olar ki, boş |
| ur | 42 | 🔴 demək olar ki, boş |
| uz | 42 | 🔴 demək olar ki, boş |
| ar/de/fa/fr/kk/ky/tk/zh | 341 | 🟡 ~86% |
| en/az/ru/tr | 394 | 🟢 tam |

`src/app/sitemap.ts:58`:
```ts
for (const locale of routing.locales) {  // ← 18 dilin hamısı
```

`src/lib/seo/alternates.ts:16`:
```ts
for (const locale of routing.locales) {  // ← hreflang 18 dilə
```

`src/config/site.ts:22`: locales massivində 18 dil var.

**Risk:** Google botu 6 boş dildə yüzlərlə URL kəşf edir → "thin content" siqnalı → bütün saytın etibarlılıq balını aşağı salır.

**Düzəliş:** Sitemap + alternates-də yalnız tam tərcümə olunmuş dilləri istifadə et (yeni `FULLY_TRANSLATED_LOCALES` konstantı).

---

## 3. ✅ TƏSDİQ — `/api/chat` validasiyasız + rate limitsiz (🟠 YÜKSƏK)

**Sübut:**

`src/app/api/chat/route.ts:36`:
```ts
const { messages, locale } = await req.json();  // ← Zod yoxdur
```

`route.ts:47-49`:
```ts
messages: [
  { role: 'system', content: systemPrompt },
  ...messages,  // ← birbaşa spread — client {role:'system'} göndərib prompt-u override edə bilər
],
```

Rate limiting kodu: **yoxdur**. Edge runtime, OpenAI API ödənişli.

**Düzəliş:**
1. `messages` üçün Zod sxemi: maksimum say (məs. 20), maksimum uzunluq (məs. 2000 simvol), yalnız `role: 'user' | 'assistant'` icazəli.
2. IP-əsaslı rate limit (in-memory sliding window Edge-də, ya da `@upstash/ratelimit`).

---

## 4. ✅ TƏSDİQ — `/en/universities` 404 lokal mühit səbəbi (🟢 AŞKARLANDI)

**Sübut:** Bütün `generateStaticParams` funksiyalarında onsuz da try/catch var:
- `universities/[slug]/page.tsx:54-65` ✅
- `programs/[category]/[city]/page.tsx:33-47` ✅
- `study-in-turkey-from/[country]/page.tsx:21-35` ✅
- `blog/[slug]/page.tsx:17-28` ✅

404 lokal DB əlaqə problemi (seed edilməmiş / DB başlatılmamış). Kod düzgündür. **Kod dəyişikliyi lazım deyil.**

---

## 5. ✅ TƏSDİQ — GEO 4 dil / 4 səhifə tipi (🟡 ORTA)

**Sübut:**

`src/lib/seo/geo.ts:15`:
```ts
export const GEO_LOCALES = ['en', 'tr', 'az', 'ru'] as const;
```

`<GeoBlock>` istifadə olunduğu səhifələr:
- `universities/[slug]/page.tsx:237` ✅
- `programs/[category]/[city]/page.tsx:193` ✅
- `study-in-turkey-from/[country]/page.tsx:155` ✅
- `apply/page.tsx` — `isGeoLocale` ilə ✅

**Yoxdur:** ana səhifə, blog, compare, about.

Bu **qəsdən dizayn** qərarıdır (spec-də sənədləşib). Genişləndirmə enhancement-dır, bug deyil.

---

## 6. ✅ TƏSDİQ — Rate limiting yoxdur (🟠 YÜKSƏK)

**Sübut:** `src` daxilində `ratelimit` / `rate-limit` / `rateLimit` axtarışı — heç bir nəticə yoxdur (yalnız `docs` və `a.md`-da tövsiyə kimi qeyd olunub).

`src/app/actions/leads.ts`: Zod validasiya + honeypot var ✅, amma rate limit **yoxdur**.
`src/app/api/chat/route.ts`: rate limit **yoxdur** (Finding 3 ilə eyni).

**Düzəliş:** Hər iki endpoint-ə IP-əsaslı rate limit.

---

## 7. ✅ TƏSDİQ — Admin/dashboard `noindex` meta yoxdur (🟡 AŞAĞI)

**Sübut:**

`src/app/admin/layout.tsx` — `metadata` export **yoxdur**.
`src/app/admin/(dashboard)/layout.tsx` — `metadata` export **yoxdur**.
`src/app/[locale]/dashboard/(app)/layout.tsx` — `metadata` export **yoxdur**.

`src/app/robots.ts:10`:
```ts
disallow: ['/api/', '/dashboard/', '/admin/', '/*/dashboard/'],
```
→ robots.txt disallow indeksləşməni **tam təmin etmir** (Google başqa yerdən tapdığı linki snippet-siz göstərə bilər).

`buildPageMetadata` (`alternates.ts:53`) `noIndex` parametrini dəstəkləyir, amma bu layout-lar onu istifadə etmir.

**Düzəliş:** Admin root layout-a və dashboard layout-na `export const metadata = { robots: { index: false, follow: false } }` əlavə et.

---

## 8. ❌ YANLIŞ — `generateStaticParams` try/catch tövsiyəsi

AI audit tövsiyə edirdi: *"generateStaticParams funksiyalarına (xüsusilə study-in-turkey-from-[country]) try/catch əlavə et"*

**Fakt:** Bütün 4 detal səhifəsinin `generateStaticParams`-ında **artıq try/catch var** (Finding 4-də sübutu). Bu tövsiyə **artıq həll olunub** — heç nə etmək lazım deyil.

---

## Müsbət tapıntılar (təsdiqlənmiş yaxşı işlər)

| Tapıntı | Status | Sübut |
|---------|--------|-------|
| Təhlükəsizlik header-ləri (CSP, HSTS, X-Frame, Referrer, Permissions) | ✅ Yaxşı | `next.config.mjs:22-58` |
| `.env.example`-da real sirr yoxdur | ✅ Yaxşı | `.env.example` — hamı placeholder |
| `devLogin` DB-dən rol yenidən yoxlayır | ✅ Yaxşı | `admin-auth.ts:15-17` |
| submitLead: Zod + honeypot + fail-open | ✅ Yaxşı | `leads.ts:11,26,33-54` |
| ISR `revalidate = 3600` detal səhifələrdə | ✅ Yaxşı | `study-in-turkey-from/[country]/page.tsx:39` |
| `next/image` hər yerdə (xam `<img>` yoxdur) | ✅ Yaxşı | — |

---

## Prioritetləşdirilmiş fəaliyyət planı

| Prioritet | Tapıntı | Düzəliş |
|-----------|---------|---------|
| 🔴 İndi | #1 Dev backdoor | `isDevAuthEnabled()`-dən `NODE_ENV` şərtini sil |
| 🔴 İndi | #2 Boş dillər | Sitemap + alternates-i tam dillərlə məhdudlaşdır |
| 🟠 Bu həftə | #3+#6 Chat validasiya + rate limit | Zod sxemi + rate limit |
| 🟠 Bu həftə | #6 submitLead rate limit | IP-əsaslı rate limit |
| 🟡 Bu ay | #7 noindex meta | Admin + dashboard layout-larına `robots` meta |
| 🟢 İmkan daxilində | #5 GEO genişləndirmə | Blog/ana səhifə/compare-a GeoBlock |
| ❌ Heç nə | #8 try/catch | Artıq var |
