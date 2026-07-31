# Faza 4 — Roadmap və İcra Sırası

> **Mənbə:** `Study.md` §5 (GEO), §6 (AEO), §8 (schema-lar), §12 (performans).
> **Vəziyyət:** Faza 1-3 bitib. Audit nəticəsi: 7 schema builder var (Org, WebSite, CollegeOrUniversity, FAQPage, Article, BreadcrumbList, ItemList/Course), amma **HowTo, Review, ImageObject yoxdur**; 7 səhifədə JSON-LD yoxdur; GEO qısa-cavab/pros-cons blokları yoxdur; AEO tamamilə absent.

---

## Alt-faza planı

### 4A — JSON-LD schema tamamlanması ✅ (next)
- Yeni builder-lar: `howToJsonLd`, `reviewJsonLd`, `itemListJsonLd`, `aboutPageJsonLd`, `contactPageJsonLd`, `collectionPageJsonLd`
- JSON-LD-si olmayan səhifələrə əlavə: universities list (ItemList), programs list (ItemList), blog list (Blog), about (AboutPage), contact (ContactPage), apply (Service + HowTo)
- Universitet detalına `reviewJsonLd` (individual Review-lar) əlavə et

### 4B — GEO blokları (qısa cavab + xülasə + pros/cons)
- Yeni `<GeoBlock>` komponenti: 40-60 sözlük qısa cavab paraqrafı + "at a glance" xülasə cədvəli + pros/cons
- Universitet detalına, proqram kombinasiyasına, ölkə landing-ə əlavə et
- i18n açarları (4 dil minimum: en/tr/az/ru)

### 4C — AEO strukturları (HowTo + tərif blokları)
- Apply səhifəsinə addım-addım "How to apply" bölməsi (`<ol>` + HowTo schema)
- Ölkə landing-ə "visa process" addım-addım (`<ol>`)
- Tərif blokları ("What is...?") universitet/proqram səhifələrində

### 4D — Performans tənzimlənməsi
- Şəkil optimallaşdırması (priority/sizes yoxlanışı)
- Font `font-display: swap`
- Lazy-load non-critical JS
- CLS riskləri (hero image dimensions, dynamic content)

---

## İcra statusu

| Alt-faza | Spec | Plan | İcra | Build |
|---|---|---|---|---|
| 4A — schema tamamlanması | ✅ | — | ✅ | — |
| 4B — GEO blokları | ✅ | — | ✅ | — |
| 4C — AEO strukturları | ✅ | — | ✅ | — |
| 4D — performans | ✅ | — | ✅ | — |

Güncəllənib: 2026-08-01. Faza 4 tamamlanıb — tsc clean.