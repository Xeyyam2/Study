# Faza 3 — Roadmap və İcra Sırası

> **Mənbə:** `Study.md` §3 (i18n — 17 dil), §4 (SEO programmatic), §1 (axtarış stack).
> **Vəziyyət:** Faza 1 (frontend + 4 dil + universitet/proqram template) ✅, Faza 2A/2B/2C (admin backend, real auth, student dashboard) ✅.
> **Prinsip:** Hər alt-faza ayrı spec → plan → icra dövrü keçir. Birdən-birdənə yox, ardıcıllıqla.

---

## Alt-faza planı

### 3A — İ18n genişlənməsi: 4 → 17 dil ✅ (next)
**Məqsəd:** Hazırkı `en/tr/az/ru`-ya qalan 13 dil əlavə et: `de, fr, fa, ar, tk, kk, ky, zh, bg, ur, uz, sw, so, id`.

**Təsir sahələri:**
- `src/config/site.ts` → `locale.locales` massivi 17-yə genişlənir
- `src/i18n/routing.ts` → `localeLabels` 17-yə tamamlanır (`isRtl` artıq `ar/fa/ur` əhatə edir)
- Yeni `src/messages/<locale>.json` faylları (13 ədəd) — struktur `en.json` ilə eyni
- `generateStaticParams` (locale-lər) avtomatik götürür; `hreflang` `buildAlternates` `routing.locales`-dən → dəyişiklik yoxdur
- Mövcudǐ namespace-lər (`Common`, `Nav`, `Student`, `University`, `Program`, `Blog`, `Compare`, `Contact`, `Apply`, `Dashboard`, `SEO` və s.) hər yeni dilə kopyalanıb tərcümə olunur
- `translations` DB cədvəli (Study.md §3, §7) — **bu fazaya daxil deyil**; JSON-dan oxuma qalır (YAGNI; admin tərcümə paneli növbəti iş)

**Bitmə kriteriyası:** `npm run build` 17 locale üçün `generateStaticParams`-ı işlədir, baza səhifələri (`/en, /de, /ar, ...`) render olunur; RTL (`/ar, /fa, /ur`) düzgün `<html dir="rtl">` alır; lint+typecheck+test yaşıl.

**Risk:** Maşın tərcüməsi deyil, insan keyfiyyəti tələb olunur (Study.md §17). MVP-də AI-assisted translation + README-də "review needed" qeydi; prod-a qədər professional redaktə.

---

### 3B — Məlumatların seed → DB-yə köçürülməsi ⏳
**Məqsəd:** Universitet/proqram/şəhər/ölkə/bloq/review/faq/təqaüd/yataqxana datasını (`src/lib/seed/*.ts`) Postgres cədvəllərinə (0001–0004) köçür; `DataLayer`-ın `createSupabaseDataLayer()` (və ya `createPgDataLayer()`) implementasiyasını yaz; `src/lib/data/index.ts` flip nöqtəsi dəyişdirilir.

**Təsir:** `seed-repository.ts` əvəzinə `pg-data-repository.ts`; `getMinTuitionUSD`/`getRating` kimi sinxron metodlar async olur (interfeysdə artıq async). Seeder script (`scripts/seed-content.ts`) seed TS obyektlərini DB-yə insert edir; `db:reset` onu çağırır.

**Bitmə kriteriyası:** Bütün `(marketing)` səhifələri DB-dən oxuyur; `npm run build` + E2E yaşıl; seed TS faylları yalnız seeder-ın mənbəyi kimi qalır (runtime import yoxdur).

**Risk:** Mövcud uni proqram tələb edənə qədər gözlə (YAGNI).

---

### 3C — Programmatic SEO miqyaslandırma ⏳
**Məqsəd:** `{Proqram} × {Şəhər} × {Dərəcə} × {Dil}` kombinasiya səhifələrini min-lərlə generasiya et (DB-dən gələn real məlumatla); ölkə-spesifik giriş səhifələrini 18 bazara genişlət; bölünmüş sitemap-lar (`sitemap-universities.xml`, `sitemap-programs.xml`, `sitemap-blog.xml`, `sitemap-countries.xml`).

**Asılılıq:** 3B (DB məlumat) bitməlidir — combo-lar DB-dən hesablanır.

**Bitmə kriteriyası:** Sitemap-lar bölünür; ISG (`revalidate: 3600`) ilə min səhifə build; hər səhifədə unikal GEO/AEO blok.

**Risk:** "Thin content/doorway pages" cəzası (Study.md §17) — hər combo səhifəsi real unikal dəyər (ölkə vizası, valyuta, lokal rəylər) olmalıdır.

---

### 3D — Axtarış motoru (Meilisearch / Typesense) ⏳
**Məqsəd:** Universitet/proqram üzrə millisaniyəlik axtarış + facet (ölkə, şəhər, dil, təqaüd, qiymət). Edge runtime + ISR.

**Asılılıq:** 3B (DB-də indekslənmə mənbəyi).

**Bitmə kriteriyası:** `/search` + header axtarış box-u işləyir; facet filtr kombinasiyalı nəticə < 50ms.

**Risk:** Loqosika deploy/işləmə yükü; lokal Docker variantı.

---

## İcra sırası və asılılıqlar

```
3A (i18n)  ── paralel ──► 3B (DB-yə köçür)
                              │
                              ├─► 3C (programmatic SEO)
                              └─► 3D (axtarış)
```

- **3A və 3B** asılı deyil → paralel icra mümkün (yaxın mövzu olmasın deyə tək-tək də ola bilər).
- **3C/3D** 3B-yə bağlanır.

**Tövsiyə edilən ardıcıllıq:** 3A → 3B → 3C → 3D.

---

## İcra statusu

| Alt-faza | Spec | Plan | İcra | Build |
|---|---|---|---|---|
| 3A — i18n 17 dil | ⏳ | — | — | — |
| 3B — seed→DB | — | — | — | — |
| 3C — programmatic SEO | — | — | — | — |
| 3D — axtarış | — | — | — | — |

Güncəllənib: 2026-07-31.