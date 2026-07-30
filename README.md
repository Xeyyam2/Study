# StudyHub — Study in Turkey Platform (Phase 1 MVP)

A high-performance, SEO-first marketing front-end for a study-in-Turkey platform.
Built to the spec in [`Study.md`](./Study.md) and the
[`Kinetic Horizon`](./design/kinetic_horizon/DESIGN.md) design system.

> **Brand name is a placeholder.** Set it once in [`src/config/site.ts`](./src/config/site.ts)
> (`siteConfig.name`) and it updates everywhere. Currently `StudyHub`.

## What's included (Phase 1)

- **164+ statically-generated pages** across 4 languages (`en / tr / az / ru`)
- Home, About, Contact, Apply, Compare
- Universities listing (URL-driven filters) + **11-section detail pages**
- Programmatic SEO: **Program × City** combination pages (76)
- Country-specific landing pages (40)
- Blog (index + article)
- Full SEO: per-page metadata, **JSON-LD** (Organization, WebSite, CollegeOrUniversity,
  FAQPage, Article, BreadcrumbList, Course), `hreflang` alternates, split-ready sitemap,
  robots, manifest
- Apply lead form (React Hook Form + Zod + server action with honeypot)
- i18n with `next-intl`, RTL-ready architecture
- Unit tests (Vitest) + E2E config (Playwright)

Out of scope for Phase 1 (later phases): Supabase/Prisma backend, auth, CRM,
admin panel, AI tools, remaining 13 languages, 100k+ page scale.

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn-style UI primitives |
| Fonts | Geist (display) + Inter (body) |
| i18n | next-intl |
| Validation | Zod |
| Forms | React Hook Form |
| Tests | Vitest (unit) + Playwright (E2E) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /en)
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | E2E tests (Playwright — run `npx playwright install` first) |

## Project structure

```
src/
  app/
    [locale]/            # all localized routes
      universities/      # listing + [slug] detail
      programs/          # index + [category]/[city] programmatic pages
      study-in-turkey-from-[country]/
      blog/  apply/  about/  contact/  compare/
    actions/             # server actions (leads)
    sitemap.ts  robots.ts  manifest.ts  icon.svg
  components/
    layout/  sections/  ui/  seo/  motion/
  lib/
    data/               # adapter-pattern repositories (DataLayer interface)
    seed/               # in-memory seed data (swappable for Supabase later)
    seo/  i18n/  validations/  utils.ts
  messages/             # en / tr / az / ru
  types/  config/
```

## Data layer (adapter pattern)

All UI talks to the `DataLayer` interface in [`src/lib/data/repositories.ts`](./src/lib/data/repositories.ts).
Today it is backed by an in-memory `SeedRepository`. To switch to Supabase in a
later phase, implement `createSupabaseDataLayer()` and swap it in
[`src/lib/data/index.ts`](./src/lib/data/index.ts) — no UI changes required.

```ts
import { data } from '@/lib/data';
const universities = await data.universities.list({ citySlug: 'istanbul' });
```

## SEO

- `generateMetadata` on every page → title, description, canonical, OpenGraph, Twitter
- Automatic `hreflang` alternates across all locales (`x-default` → en)
- JSON-LD builders in [`src/lib/seo/json-ld.ts`](./src/lib/seo/json-ld.ts)
- Single comprehensive `sitemap.xml` (auto-splits at scale)
- `robots.txt` blocks `/api`, `/dashboard`, `/admin`

## Internationalization

- Locales: `en / tr / az / ru` (URL prefix `/[locale]/...`)
- UI strings in `src/messages/*.json`; **content** localized in seed (per-locale fields)
- RTL-ready: `dir` attribute + CSS logical properties (Arabic/Persian ready for later)

## Adding a language

1. Add the code to `siteConfig.locale.locales` in `src/config/site.ts`
2. Add it to `routing` + `localeLabels` in `src/i18n/routing.ts`
3. Create `src/messages/<code>.json`
4. Add localized fields to seed entries (or fall back to `en`)

## Roadmap (per `Study.md`)

- **Phase 2:** Supabase + Prisma, RLS, auth (email/OTP/OAuth), leads CRM, student dashboard
- **Phase 3:** Remaining 13 languages, programmatic scale (100k+ pages), Meilisearch
- **Phase 4:** GEO/AEO refinement, schema completion, performance tuning
- **Phase 5:** AI modules (chatbot, content generators), analytics, launch

## Notes

- Imagery uses Unsplash placeholders — replace with real assets.
- `"Google #1"` is not technically guaranteed (see `Study.md` §17); this builds the
  strongest possible technical foundation.
- Test credentials / env: none required for Phase 1 (no external services).
