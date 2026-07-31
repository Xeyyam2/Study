# Faza 3 — Roadmap və İcra Sırası

> **Mənbə:** `Study.md` §3 (i18n — 17 dil), §4 (SEO programmatic), §1 (axtarış stack).
> **Vəziyyət:** Faza 1 (frontend + 4 dil + universitet/proqram template) ✅, Faza 2A/2B/2C (admin backend, real auth, student dashboard) ✅.
> **Prinsip:** Hər alt-faza ayrı spec → plan → icra dövrü keçir. Birdən-birdənə yox, ardıcıllıqla.

---

## Alt-faza planı

### 3A — İ18n genişlənməsi: 4 → 18 dil ✅
**Məqsəd:** Hazırkı `en/tr/az/ru`-ya qalan 14 dil əlavə et: `de, fr, fa, ar, tk, kk, ky, zh, bg, ur, uz, sw, so, id` (Study.md §3 cədvəlindəki 17 unikal dil + hreflang region kodları).

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

### 3B — Məlumatların seed → DB-yə köçürülməsi ✅
**Məqsəd:** Universitet/proqram/şəhər/ölkə/bloq/review/faq/təqaüd/yataqxana datasını (`src/lib/seed/*.ts`) Postgres cədvəllərinə (0011) köçür; `DataLayer`-ın `createPgDataLayer()` implementasiyasını yaz; `src/lib/data/index.ts` flip nöqtəsi dəyişdirilir.

**Təsir:** `seed-repository.ts` əvəzinə `pg-data-repository.ts`; `getMinTuitionUSD`/`getRating`/`getByUniversityId`/`getCategories`/`getCombinations`/`getByCategoryAndCity` async oldu; `scripts/seed-content.ts` seed TS obyektlərini DB-yə insert edir; `db:reset` onu çağırır.

**Bitmə kriteriyası:** Bütün `(marketing)` səhifələri DB-dən oxuyur; `npm run build` + E2E yaşıl; seed TS faylları yalnız seeder-ın mənbəyi kimi qalır (runtime import yoxdur).

---

### 3C — Programmatic SEO miqyaslandırma ✅ (mini)
**Məqsəd:** Mövcud `{Kategoriya} × {Şəhər}` kombinasiya səhifələri + universitet detal + ölkə landing + bloq — ISR (`revalidate: 3600`); sitemap altyapısı 50k limit aşanda avtomatik bölünməyə hazır. Ölkə eniş səhifələri 18 ölkə üçün işlək (DB countries-dən götürür).

**Xaricdədir (3C-full, növbəti fazaya saxlanır):** `{Proqram} × {Şəhər} × {Dərəcə} × {İxtisas}` dörölçülü kombinatorika + min-lərlə səhifə generasiyası; thin-content risklərini həll etmək (hər combo ölkə/viza/valyuta unikal dəyəri olmalı).

---

### 3D — Axtarış motoru (Postgres FTS) ✅
**Məqsəd:** Universitet/proqram/şəhər üzrə millisaniyəlik axtarış + autocomplete. ~~Meilisearch~~ əvəzinə **Postgres full-text search** (`pg_trgm` + `tsvector` index) — mövcud Postgres-də işləyir, heç bir eksternal xidmət tələb olunmur, Vercel deploy-də birbaşa işləyir.

**Təsir sahələri:**
- `0012_search_indexes.sql` — `pg_trgm` extension, universitetlərdə `search_tsv` tsvector sütunu + trigger (insert/update-də auto-sync), trigram GIN indekslər (universities/programs/cities/countries).
- `DataLayer.search` metodu (interfeys + pg impl + seed fallback) — universitet/program/şəhər üzrə UNION ALL sorğu, ts_rank ranking.
- `/api/search` API route (`?q=…&limit=…`).
- Hero search box autocomplete UI (debounced fetch, klaviatur naviqasiyası, listbox rolları).

**Bitmə kriteriyası:** `< 50ms` cavavb (lokal); testlər yaşıl; build yaşıl.

**Risk:** Böyük miqyasda (100k+ universitet) trigram index memory istifadəsi — problem yoxdensa Meilisearch-a keçid asan (interfeys dəyişmir).

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
| 3A — i18n 18 dil | ✅ | — | ✅ | ✅ |
| 3B — seed→DB | ✅ | — | ✅ | ✅ |
| 3C — programmatic SEO (mini) | ✅ | — | ✅ | ✅ |
| 3D — axtarış (PG FTS) | ✅ | — | ✅ | ✅ |

Güncəllənib: 2026-07-31 (3A, 3B, 3C-mini, 3D commit-ləndi — Faza 3 tamamlandı).