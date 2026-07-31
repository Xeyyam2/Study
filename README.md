# StudyHub — Study in Turkey Platform (Phase 1 MVP)

A high-performance, SEO-first marketing front-end for a study-in-Turkey platform.
Built to the spec in [`Study.md`](./Study.md) and the
[`Kinetic Horizon`](./design/kinetic_horizon/DESIGN.md) design system.

> **Brand name is a placeholder.** Set it once in [`src/config/site.ts`](./src/config/site.ts)
> (`siteConfig.name`) and it updates everywhere. Currently `StudyHub`.

## What's included (Phase 1)

- **1,000+ statically-generated pages** across 18 languages (`en, tr, az, ru, de, fr, fa, ar, tk, kk, ky, zh, bg, ur, uz, sw, so, id`)
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
- UI strings in `src/messages/*.json` (18 locales; full 1:1 key parity with `en.json`)
- **Content** fields in seed are `Partial<Record<Locale, string>>` and fall back to `en` via the
  [`lx()` helper](./src/lib/i18n/lx.ts) (`src/lib/i18n/lx.ts`) when a locale is absent, so new
  locales work without translating every seed entity.
- RTL-ready: `dir` attribute + CSS logical properties; `ar`, `fa`, `ur` render RTL.

## Adding a language

1. Add the code to `siteConfig.locale.locales` in `src/config/site.ts`
2. Add it to `routing` + `localeLabels` in `src/i18n/routing.ts`
3. Create `src/messages/<code>.json` mirroring the key tree of `en.json` (use the
   `node` script in `tests/unit/i18n.test.ts` / a key-parity check to verify)
4. Add seed content translations or simply omit — `lx()` falls back to `en`

## Roadmap (per `Study.md`)

- **Phase 2:** Supabase + Prisma, RLS, auth (email/OTP/OAuth), leads CRM, student dashboard ✅
- **Phase 3A:** i18n 4 → 18 locales ✅ · **3B:** seed → DB content migration · **3C:** programmatic scale (100k+ pages) · **3D:** Meilisearch
- **Phase 4:** GEO/AEO refinement, schema completion, performance tuning
- **Phase 5:** AI modules (chatbot, content generators), analytics, launch

## Notes

- Imagery uses Unsplash placeholders — replace with real assets.
- `"Google #1"` is not technically guaranteed (see `Study.md` §17); this builds the
  strongest possible technical foundation.
- Test credentials / env: none required for Phase 1 (no external services).
- UI translations for Phase 3A locales beyond `en/tr/az/ru` are AI-generated drafts; have a
  native speaker review before launch (see `Study.md` §17). Seed *content* (university
  descriptions, blog copy, etc.) still ships in `en/tr/az/ru` only and falls back to `en` via
  `lx()` for other locales until 3B moves content into the DB.

## Backend & Admin/CRM (Phase 2A)

- **Postgres schema** (`supabase/migrations/0001–0007`): `profiles`, `leads`, `applications`,
  `application_documents`, `audit_logs` + enums, indexes, triggers, RLS (Supabase-only),
  and the deferred `profiles → auth.users` FK (`0007`).
- **Transactional data layer** (`src/lib/crm/`): `CrmRepository` adapter with a local `pg`
  implementation and a Supabase stub; flip via `SUPABASE_ENABLED`.
- **Admin/CRM panel** (`/admin`): overview KPIs, leads Kanban + detail, applications, users,
  audit log. Auth: real Supabase email-OTP (`/admin/login`) for staff (admin/consultant/editor)
  with a dev-fallback picker when `DEV_AUTH_ENABLED=1`. See §Real Auth below.
- **Local dev DB**: `npm run db:up && npm run db:reset` (Docker Postgres on `:5433`).

## Real Supabase Auth (Phase 2B + admin)

Email-OTP (magic link) auth via `@supabase/ssr` cookie sessions, layered on the hybrid stack
(Supabase Auth + local Postgres data). Profayl əlaqəsi `profiles.auth_uid` (`0010`) ilə.

- **Supabase clients**: `src/lib/supabase/{client,server-session,server}.ts` (browser anon,
  server session anon w/ cookie refresh, server service-role for Storage).
- **Middleware** refreshes the Supabase session then runs next-intl (`src/middleware.ts`).
- **Auth callback** `/auth/callback?code=…&next=…` exchanges the code and redirects (`next`,
  default `/{locale}/dashboard`; `/admin` for staff).
- **Student login** (`/[locale]/dashboard/login`): `EmailOtpForm` sends the magic link; dev
  fallback picker shown when `DEV_AUTH_ENABLED=1`. `requireStudent()` resolves the Supabase
  session to a profile via `upsertStudentByAuthUid` (creates or email-merges). Logout via
  `signOutStudent` (`supabase.auth.signOut`).
- **Staff login** (`/admin/login`): same `EmailOtpForm` with `next=/admin`; `requireStaff()`
  resolves via `getStaffProfileByAuthUid` (links by email, **never auto-creates** — staff must
  be pre-provisioned/seeded). `devLogin` is restricted to staff roles. Logout via `signOutAdmin`.
- **Config**: in Supabase → Authentication → URL Configuration, allow
  `http://localhost:3000/auth/callback` (and prod) as redirect URLs. Set
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (and `SUPABASE_SERVICE_ROLE_KEY`
  for Storage) in `.env.local`. Optional `DEV_AUTH_ENABLED=1` to enable demo pickers locally.
- **Notes**: OAuth (Google/Apple) callback is ready; providers not wired. RLS is written but
  enforced only once data moves to Supabase (local `pg` is superuser). Magic-link delivery uses
  the Supabase default sender (rate-limited — use custom SMTP in prod).

## Student dashboard (Phase 2C)

Localized, student-facing dashboard at `/[locale]/dashboard` (e.g. `/en/dashboard`):

- **Modules:** overview (status, unread messages, recent notifications), applications (+ detail
  with pipeline stepper), documents (upload + verify), messages (thread with assigned consultant),
  notifications (composed from audit log + unread messages).
- **Dev-auth student login** at `/en/dashboard/login` — pick a demo student profile. Shown only
  when `DEV_AUTH_ENABLED=1`; otherwise the page uses the real email-OTP form (see §Real Auth).
- **Messaging** uses the `messages` table (`0008`); **notifications** are derived — no extra table.
- **Document upload** uses **Supabase Storage** (private bucket `application-documents`):
  - Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
  - Run `supabase/migrations/0009_storage_bucket.sql` in the Supabase SQL editor to create the
    private bucket + policies. Documents are uploaded server-side (service role) and served via
    short-lived signed URLs.
- **`(marketing)` route group**: marketing chrome (header/footer/WhatsApp float) is isolated from
  the dashboard shell; the guarded dashboard lives in the `dashboard/(app)` route group so the
  login page stays outside the auth guard.
- **Run locally:** `npm run db:up && npm run db:reset`, then visit `/en/dashboard/login`.

> Security note: the service-role key bypasses RLS — keep it server-side only and never commit
> `.env.local`. Dev-auth offers no real protection; do not deploy it as-is.
