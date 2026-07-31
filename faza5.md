# Faza 5 — Roadmap və İcra Sırası

> **Mənbə:** `Study.md` §14 (analitika), §16 Faza 5 (AI modullar, analitika, launch).
> **Vəziyyət:** Faza 1-4 bitib. Hazırda marketing səhifələr, auth, CRM, dashboard, 18 dil, GEO/AEO, schema-lar, performans — hamı hazırdır.

---

## Alt-faza planı

### 5A — AI Chatbot widget
- Floating chat button (WhatsApp float yanında/sol tərəfdə)
- Edge API route (`/api/chat`) — OpenAI/Anthropic API ilə (env-based)
- 4 dil support (en/tr/az/ru) — Geo guard pattern
- FAQ + universitet məlumatı context olaraq verilir

### 5B — Analitika inteqrasiyası
- Google Analytics 4 (gtag) — env-based (`NEXT_PUBLIC_GA_ID`)
- Microsoft Clarity — env-based (`NEXT_PUBLIC_CLARITY_ID`)
- Konversiya hunisi: submitLead event
- `<Analytics>` komponenti layout-a əlavə

### 5C — Launch hazırlığı
- README roadmap yenilə
- `robots.txt` audit
- Env nümunələri (`.env.example`)
- Final build verification

---

## İcra statusu

| Alt-faza | Spec | Plan | İcra | Build |
|---|---|---|---|---|
| 5A — AI chatbot | ✅ | — | ✅ | — |
| 5B — analitika | ✅ | — | ✅ | — |
| 5C — launch | ✅ | — | ✅ | — |

Güncəllənib: 2026-08-01. Faza 5 tamamlanıb — tsc clean.
