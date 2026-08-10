# StudyHub — DevOps & Operational Readiness Audit

> Reviewer: Senior DevOps Engineer perspective
> Scope: CI/CD pipeline, deployment strategy, infrastructure, database migrations, environment
> management, monitoring/observability, pipeline security, performance/scaling, backup & recovery,
> documentation & runbooks.
> Method: static review of `.github/`, `docker-compose.yml`, `next.config.mjs`, `scripts/`,
> `supabase/migrations/`, `src/app/api/health/`, `src/app/actions/leads.ts`, env config, and git
> history. Findings ranked **Critical / High / Medium / Low** with `file:line` references and
> concrete fixes.

---

## Executive summary

StudyHub has a **CI** pipeline (lint -> typecheck -> migrate/seed -> unit tests -> build) that is
solid for a Phase-1/2 project, and the database migration tooling (`scripts/migrate.ts`) is
genuinely well-engineered for a hand-rolled runner. **However, there is effectively no CD
(continuous deployment) pipeline, no observability, no automated DB backups, and no rollback
path.** The most dangerous combination is: **lead capture fails open** (`leads.ts`) **with zero
monitoring**, meaning paying-intent leads can silently vanish while the user sees "success".
The health check is a **false-green** that reports `ok:true` even when the database is dead.
Production migrations are **manual** and are **not coupled to deploys**, so schema/code drift is
a real, likely-recurring incident. These are fixable with modest, pragmatic work — none require
ripping out the stack.

---

## CRITICAL

### C1. No continuous-deployment pipeline — migrations & deploys are decoupled

**File:** `.github/workflows/ci.yml:1-60` (entire file — no deploy job); `package.json:16-18`
(`db:migrate` / `db:reset` are local-only scripts).

**Problem:** The only workflow is `ci.yml`. It runs migrations against a **throwaway** GitHub
Actions Postgres service container (`ci.yml:34-47`) and then builds — but the build output is
**discarded** (no `actions/upload-artifact`, no deploy step). There is **no `vercel.json`, no
Dockerfile for the app, no deploy job, no `db:migrate` against production**. Deploys are
presumably triggered by Vercel's Git auto-deploy on push to `main`, which runs `next build` —
but **nobody guarantees migrations ran first**, or ran at all.

**Impact:** Schema/code drift. A code push can deploy against a DB whose schema is a migration
behind (or ahead of) the code -> runtime 500s, broken admin/CRM, broken static generation.
Conversely, a migration applied manually to prod but the code not yet deployed -> broken queries.
There is no ordering guarantee, no gate, no record of *when* a migration was applied relative to
a deploy. For a CRM that stores leads/applications/documents, this is an incident waiting to
happen, and recovery is ad-hoc.

**Recommendation (pragmatic, staged):**
1. **Immediate (cheap):** Add a deploy runbook (`docs/ops/deploy.md`) codifying the manual
   sequence: `npm run db:migrate` against prod Supabase -> trigger Vercel deploy -> smoke-test
   `/api/health`. Until automation exists, this at least makes the manual path repeatable.
2. **Short-term:** Add a `deploy` GitHub Actions job (or extend `ci.yml`) on `push: main` that:
   - runs `npm run db:migrate` against `${{ secrets.PROD_DATABASE_URL }}` (migrate-first),
   - then calls the Vercel deploy (Vercel CLI with `VERCEL_TOKEN`), or simply **blocks** until
     migrations report success before Vercel auto-deploys.
   The key invariant: **migrations are a hard prerequisite to a build going live.**
3. Make the migration step the **first** thing and fail the deploy if it errors.

---

### C2. Lead capture fails open with no monitoring → silent, permanent lead loss

**File:** `src/app/actions/leads.ts:46-74`.

**Problem:** The `submitLead` server action wraps DB writes in `try/catch` and on any error
**logs `console.error` and returns `{ ok: true }`** (`leads.ts:69-72`). The comment
(`leads.ts:46-48`) explicitly designs fail-open to protect UX. That is defensible *only if* the
failure is observed. But:
- There is **no Sentry / structured logger / alerting** anywhere in the repo (see H1).
- On Vercel serverless, `console.*` output is ephemeral and unsearchable.
- The user (a paying-intent student) sees a success UI and never retries.

**Impact:** A transient Supabase outage, a connection-pool exhaustion, or a constraint violation
silently drops leads into the void with **no operator visibility and no recovery path**. For a
lead-gen business, lost leads = lost revenue, invisible. This is the single highest-business-risk
issue in the repo.

**Recommendation:**
- **Minimum viable (no new external creds required first):** write failed leads to a durable
  fallback *before* returning — e.g. a dead-letter row in Postgres (`leads_dl` table with the
  raw payload + error + timestamp) inside the same transaction boundary, or a Supabase Storage
  JSON append. Anything that survives so it can be replayed.
- **Pair with H1:** add structured error capture (defer Sentry per YAGNI, but at minimum a
  persistent log + a simple alert, e.g. a Supabase Edge Function / a cron check on `leads_dl`
  row count → email/Slack webhook).
- Change the contract: a *capture* failure should not surface as an error to the student (keep
  the friendly UX), but it **must** be durably recorded and alerted on. The fix is observability
  + durability, not removing fail-open.

### C3. Health check is a false-green — reports `ok:true` when the DB is dead

**File:** `src/app/api/health/route.ts:10-12`.

**Problem:**
```ts
export async function GET() {
  const db = !!process.env.DATABASE_URL;   // line 11
  return NextResponse.json({ ok: true, db }, { status: 200 }); // line 12
}
```
`db` is `true` merely because the **env var is set** — it never opens a connection or runs
`select 1`. The status is **always 200 with `ok:true`** regardless of DB reachability. The
doc-comment (`route.ts:7-8`) even claims it "optionally verifies the DB pool" — it does not.

**Impact:** Any uptime monitor pointed at `/api/health` will report green during a full Postgres
outage. Combined with C2, a DB outage can lose every lead for hours with nobody paged. This is
the textbook "liveness masquerading as readiness" anti-pattern.

**Recommendation:** Make it a real readiness check with a bounded timeout; return 503 on failure.
```ts
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';            // or however the app exposes the pool
export const dynamic = 'force-dynamic';
export const maxDuration = 5;               // fail fast, don't hang the probe
export async function GET() {
  try {
    const client = await Promise.race([
      pool.connect(),
      new Promise((_, rej) => setTimeout(() => rej(new Error('db timeout')), 3000)),
    ]);
    try { await client.query('select 1'); }
    finally { client.release(); }
    return NextResponse.json({ ok: true, db: true });
  } catch (e) {
    return NextResponse.json({ ok: false, db: false, error: String(e) }, { status: 503 });
  }
}
```
(If the pool import path differs, wire it to the existing `pg` pool used by the data layer.)

---

## HIGH

### H1. Zero observability — no error tracking, no structured logging, no metrics, no alerting

**Files:** repo-wide. Search for `sentry|datadog|newrelic|opentelemetry|winston|pino` returns
hits **only** in the audit docs (`duzelis.md:491`, `sehv.md:111`) and a *transitive*
`@opentelemetry/api` peer-dependency in `package-lock.json:7081,7089` — i.e. nothing is wired.

**Problem:** The app uses bare `console.log`/`console.error` (e.g. `leads.ts:71`,
`migrate.ts:67,97,100,119`, `seed-content.ts:197,200`, `scrape-studyleo.mjs` throughout). On
Vercel serverless these logs are short-lived, unstructured, unsearchable, and unaggregated.
There is no error tracking, no request metrics, no web-vitals pipeline beyond GA, no alerting.

**Impact:** Operators are blind. Build-time prerender failures, runtime 500s, lead-capture
errors, migration failures in prod — all invisible unless someone manually reads transient logs.
MTTD (mean time to detect) is effectively "when a user complains".

**Recommendation (YAGNI-aware):**
- **Defer full APM** (Sentry/Datadog) per the user's documented preference for not blocking on
  external-service creds — but **add a `NEXT_PUBLIC_SENTRY_DSN` placeholder to `.env.example`
  and a short note**, so enabling it later is a config flip, not a refactor.
- **Do now (no external cred):** add a tiny structured logger (`src/lib/logger.ts` wrapping
  `console` with JSON lines + request id) so Vercel's log drain is at least parseable, and route
  `submitLead` failures and `/api/health` 503s through it.
- **Alert on the durable fallback from C2** (e.g. a 5-min cron checking the dead-letter count).

### H2. No security scanning in the pipeline — no SAST, no dependency audit, no secret scan

**File:** `.github/workflows/ci.yml` (no security steps); no `dependabot.yml`, no
`renovate.json` (confirmed by search — `.github/` contains only `workflows/ci.yml`).

**Problem:** The pipeline runs lint/typecheck/test/build but performs **no**:
- `npm audit` / `npm audit --audit-level=high` (dependency CVEs),
- SAST (GitHub CodeQL, Semgrep),
- secret scanning (Gitleaks) beyond GitHub's built-in push protection,
- container scanning (N/A yet — no Dockerfile, but worth noting before one is added).

`package-lock.json` is 374 KB across many transitive deps (Next 15, React 19, Supabase, pg,
Playwright) — a sizeable attack surface that is never scanned.

**Impact:** Known-vulnerable dependencies can ship to production undetected. No CVE-driven
update cadence (no Dependabot). The Supabase service-role key (admin, bypasses RLS) is a
high-value secret with no rotation/leak-detection automation.

**Recommendation:**
- Add a `security` job to `ci.yml`:
  ```yaml
  - run: npm audit --audit-level=high --omit=dev || true   # warn, don't block initially
  ```
- Add `.github/dependabot.yml` (npm + github-actions ecosystems, weekly) — cheap, high value.
- Add GitHub CodeQL analysis workflow (free for public repos; for private, still cheap).
- Add a Gitleaks step (or rely on GitHub secret scanning + push protection enabled in repo settings).

### H3. No database backup strategy and no disaster-recovery runbook

**Files:** none. No backup scripts (`scripts/` contains only `migrate.ts`, `seed-content.ts`,
`scrape-studyleo.mjs`, `generate-seed-from-catalog.mjs`, `dl-image.mjs`). No DR doc.

**Problem:** The only "restore" path is `npm run db:reset` -> `scripts/migrate.ts --reset`, which
`DROP SCHEMA public CASCADE` (`migrate.ts:68-71`) — i.e. it **destroys** data. There is no
documented reliance on Supabase PITR / daily logical backups, no restore-test, no RTO/RPO
target. `scripts/data/studyleo-catalog.json` (1.5 MB, committed) is the seed *source* and is
good for re-seeding reference content, but **transactional data** (leads, applications, messages,
documents, audit logs) has no backup story.

**Impact:** Accidental `db:reset` against the wrong DATABASE_URL (the `isLocalDatabase` guard
in `migrate.ts:39-41` helps, but a careless prod env var could defeat it), a bad migration, or a
Supabase-side incident -> permanent loss of CRM data with no tested restore path.

**Recommendation:**
- Document (in `docs/ops/`) Supabase's backup posture for the project's tier (PITR on Pro+,
  daily logical on Free). Define RTO/RPO.
- Add a nightly `pg_dump` (cron GH Action -> object storage / Supabase Storage) as a
  belt-and-suspenders logical backup, and a **restore test** in staging quarterly.
- Add a pre-deploy safety check that refuses to run `--reset` unless an explicit
  `ALLOW_DESTRUCTIVE_RESET=1` env is set (defense-in-depth on top of `isLocalDatabase`).

---

### H4. Migrations can only roll forward — no DOWN, no checksum verification

**File:** `scripts/migrate.ts:76-111`.

**Problem:** The `schema_migrations` ledger (`migrate.ts:76-81`) stores only `filename` +
`applied_at`. There is:
- **No checksum/hash column** — if someone edits an already-applied `*.sql` file, the ledger
  won't detect the drift and won't re-run it. Silent schema/code divergence.
- **No `down`/rollback** — `migrate.ts:108` only rolls back the *current transaction* on error,
  not a migration. Once applied, a bad migration cannot be auto-reversed; you must write a
  *new* forward migration to undo it (acceptable for prod, but it must be documented as policy).
- `SKIP_LOCAL` (`migrate.ts:29-35`) skips RLS/auth/storage migrations locally — correct, but it
  means **local dev diverges from prod schema**, so RLS bugs only surface in prod.

**Impact:** A botched prod migration has no automated reversal; the runbook is "write a forward
fix ASAP". Edited-migration drift is undetectable. Local/prod schema skew hides RLS regressions
until production.

**Recommendation:**
- Add a `checksum text not null` column to `schema_migrations`; compute `md5(sql)` at apply time
  and **refuse to run** (or warn) if a recorded file's current checksum differs. (Prisma/Drizzle
  do this; cheap to add to the hand-rolled runner.)
- Document the "forward-only" policy explicitly in `docs/ops/migrations.md` and provide a
  template `XXXX_down_*.sql` convention for manual forward-fixes.
- Consider running RLS migrations in CI against a *second* Supabase-shaped schema (or a
  Supabase local CLI container) so RLS isn't untested until prod.

### H5. No E2E tests in CI — 7,600+ pages with no regression guard

**File:** `.github/workflows/ci.yml:57-58` (only `npm run test` = Vitest unit);
`playwright.config.ts:1-30` (E2E configured, with a `webServer` that runs `npm run build &&
npm run start`); `package.json:13` (`test:e2e` exists but is never invoked by CI).

**Problem:** Playwright is fully configured (`playwright.config.ts`, RTL project, retries, trace
on retry) but **CI never runs `npm run test:e2e`**. The build step (`ci.yml:59-60`) produces a
production build that is immediately thrown away — no browser smoke test ever touches it.

**Impact:** Visual/routing/i18n/RTL regressions on a 7,600-page statically-generated site are
only caught manually. A broken `generateStaticParams`, a bad locale fallback, or a CSP that
breaks a script can merge and deploy undetected.

**Recommendation:** Add an `e2e` job (reuse the `test-build` postgres service, start `npm run
start` against the just-built `.next`, run `npx playwright test`). Cache
`~/.cache/ms-playwright`. Keep it on PRs (the build is already done). This is the highest
ROI quality gate missing from the pipeline.

### H6. docker-compose: weak default credential, no healthcheck, no restart policy

**File:** `docker-compose.yml:1-15`.

**Problem:**
- `POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-study}` (`docker-compose.yml:9`) — defaults to `study`
  if unset. The CI service (`ci.yml:37-40`) hardcodes `study/study` too, but at least there it's a
  throwaway container. The local compose is long-lived and reachable on host `:5433`.
- **No `healthcheck`** on the local service (the CI one has `pg_isready`, `ci.yml:43-47`, but
  `docker-compose.yml` does not).
- **No `restart:` policy** — a container/host crash leaves the DB down until manual
  `docker compose up`.
- No `version:` (fine), no network isolation, no resource limits.

**Impact:** A developer who forgets to set `POSTGRES_PASSWORD` runs a DB with a known weak
password; lack of healthcheck means `db:up` returns "started" before Postgres accepts
connections (race with `db:migrate` -> spurious ECONNREFUSED); no restart means poor local
resilience.

**Recommendation:**
```yaml
services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    command: ["postgres", "-c", "max_connections=300"]
    environment:
      POSTGRES_DB: study_crm
      POSTGRES_USER: study
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?POSTGRES_PASSWORD is required}
    ports: ["5433:5432"]
    volumes: [study_pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U study -d study_crm"]
      interval: 5s
      timeout: 5s
      retries: 10
volumes:
  study_pgdata:
```
The `:?` form makes a missing password a hard error instead of a silent weak default.

---

## MEDIUM

### M1. No staging environment / no preview-deploy gating / no promotion model

**File:** `.github/workflows/ci.yml:4-6` (only `main` + PRs); no `vercel.json`, no env-specific
config (search for `.env.production`/`.env.staging` returns nothing).

**Problem:** There is one branch (`main`) and (presumably) one prod environment. Vercel
auto-generates PR previews, but there is **no gating** — no "preview must pass E2E before merge",
no staging environment that mirrors prod's Supabase project, no promotion step from
staging -> prod. `.env.example` documents prod-style vars but there's no per-environment config
matrix.

**Impact:** The first time prod sees a change is when it merges to `main`. Schema-affecting
changes can't be validated against a staging DB. No way to verify a migration is reversible/safe
on real-ish data before prod.

**Recommendation:** Define >=2 environments: `staging` (a separate Supabase project + Vercel
preview/branch deploy) and `production`. Gate `main` merges on green CI + green preview E2E.
Document the promotion path (`docs/ops/environments.md`). This pairs with C1's deploy job.

### M2. No build caching in CI + fragile magic-number concurrency

**File:** `next.config.mjs:35-39` (`staticGenerationMaxConcurrency: 2`);
`.github/workflows/ci.yml:59-60` (build, no cache step).

**Problem:**
- `staticGenerationMaxConcurrency: 2` is a hand-tuned magic number to avoid overwhelming the
  Postgres pool during the 7,600-page build. It's not derived from `PGPOOL_MAX` or any env, so a
  future pool-size change silently breaks the build (this is the "D5" issue noted in `sehv.md:110`).
- The CI build step does not persist `.next/cache` or use `actions/setup-node`'s Next cache, nor
  `actions/cache` on `.next/cache`. Every CI run rebuilds 7,600 pages from scratch (~minutes
  wasted per run; recent history shows build-timeout pain: commit `6d833e9 perf: render heavy
  pages on-demand to fix build timeouts`).
- No build artifact is uploaded (`actions/upload-artifact`), so the production build is thrown
  away after CI.

**Impact:** Slow, expensive CI; flaky builds; the concurrency knob is a latent footgun.

**Recommendation:**
- Derive the concurrency from env: read `PGPOOL_MAX` (default 2) and set
  `staticGenerationMaxConcurrency` from it, so the two stay coupled.
- Add `actions/cache@v4` on `~/.npm` (already via `cache: npm`) **and** on `.next/cache` keyed
  by `next.config` + lockfile hash.
- Upload the build artifact if a downstream deploy job will consume it (pairs with C1).

### M3. Duplicated, hand-rolled `.env` parser in three places

**Files:** `scripts/migrate.ts:12-23`; `scripts/seed-content.ts:29-40`;
`vitest.config.ts:8-20` (three near-identical ~12-line copies).

**Problem:** Each runner re-implements `.env` parsing with the same naive regex
(`/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/`). It:
- fails on multi-line values,
- strips surrounding quotes but mishandles `#` inline comments (a `#` mid-value is kept; a
  trailing `# comment` is appended to the value),
- doesn't handle `export ` prefixes or escaped chars,
- is copy-pasted three times — a bug in one copy won't fix the others.

**Impact:** A developer's valid `.env.local` (with an inline comment or quoted URL containing
`#`) silently produces a wrong `DATABASE_URL` -> confusing ECONNREFUSED/auth failures that look
like infrastructure problems.

**Recommendation:** Extract one `scripts/lib/env.ts` (`loadEnv(['.env.local','.env'])`) and
import it from all three. Better: use `dotenv` (tiny, zero-config) — but if avoiding a dep, at
least DRY the parser and handle `#` comments + quotes correctly. The `assertEnv()` in
`next.config.mjs:11-28` is good and should stay as the build-time gate.

### M4. No pre-commit hooks — quality not enforced at commit time

**File:** none. No `.husky/`, no `lint-staged` config (confirmed by search — only references are
in `duzelis.md:498-501`).

**Problem:** Lint/format/typecheck only run in CI (or manually). Developers can commit
unformatted/typed code; it's caught later at PR time, increasing review friction and CI cycles.

**Impact:** Slower feedback loop; "fix formatting" commits; wasted CI minutes on trivial
lint failures.

**Recommendation:** Add `husky` + `lint-staged`: pre-commit runs `eslint --fix` + `prettier
--write` on staged files; pre-push runs `tsc --noEmit`. Cheap, high DX value, and it shortens CI.

### M5. `.env.example` is incomplete — missing vars the code actually uses

**File:** `.env.example:1-34`.

**Problem:** `.env.example` documents `DATABASE_URL`, Supabase vars, `OPENAI_API_KEY`,
`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `DEV_AUTH_ENABLED`, `NEXT_PUBLIC_SITE_URL` — but
the code/README reference others not listed, e.g. `INITIAL_ADMIN_EMAIL` (noted in `sehv.md:112`),
`PGPOOL_MAX` (the pool knob coupled to M2's concurrency), and there's no mention of where prod
secrets live or how to rotate them.

**Impact:** New operators/oncall can't reproduce a working env from `.env.example` alone;
`INITIAL_ADMIN_EMAIL` being absent means the first admin bootstrap is undocumented.

**Recommendation:** Audit all `process.env.*` reads and ensure each has an `.env.example` stub
(with a comment). Add `PGPOOL_MAX=` and `INITIAL_ADMIN_EMAIL=` stubs. Keep secrets as empty
stubs (never real values).

### M6. No `vercel.json` — no deployment/runtime tuning, no redirect/rewrite ownership

**File:** none (search for `vercel.json` returns nothing).

**Problem:** Vercel deploy behavior is entirely default/implicit. There's no place owning ISR
revalidation schedules, edge/runtime config, `cleanUrls`, trailing-slash policy, redirect/rewrite
rules, or function memory/timeout for the API routes (`/api/health`, `/api/search`, `/api/chat`).

**Impact:** Deploy behavior is implicit and tribal-knowledge; can't review infra changes via PR;
API routes may time out under load with no tuning; the `maxDuration` recommended in C3 has no
declarative home.

**Recommendation:** Add a minimal `vercel.json` (framework preset `nextjs`, `functions` timeouts
for `/api/*`, any rewrites/redirects currently implicit). Reviewable, versioned deploy config.

---

## LOW

### L1. No Dependabot / Renovate for dependency updates

**File:** none.
**Problem:** No automated PRs for `next`/`react`/`@supabase/*`/`pg` updates; `package-lock.json`
(374 KB) drifts. **Recommendation:** `.github/dependabot.yml` (npm + github-actions, weekly,
group Next/React). (Overlaps H2 — listed separately because it's about update *cadence*, not
*scanning*.)

### L2. README lacks a deployment/ops runbook

**File:** `README.md` (dev-focused; `README.md:120-125` roadmap; `README.md:138-148` backend
notes; no deploy/ops section).
**Problem:** A new oncaller cannot deploy, migrate, roll back, or restore from the README alone.
**Recommendation:** Add `docs/ops/deploy.md`, `docs/ops/migrations.md`, `docs/ops/incidents.md`
(RTO/RPO, contacts, rollback steps, "who to page").

### L3. CI re-runs `npm ci` in both jobs (minor inefficiency)

**File:** `.github/workflows/ci.yml:23, 54`.
**Problem:** `lint-typecheck` and `test-build` each run `npm ci` independently. They could share
via a composite action or a dependency, but they're correctly parallel. **Impact:** small
(minutes/cost). **Recommendation:** Optional — leave as-is; the parallelism is fine. Only worth
touching if adding a third job.

### L4. No supply-chain hardening

**File:** `package.json`, `.github/workflows/ci.yml:23, 54`.
**Problem:** `npm ci` runs lifecycle scripts by default; no `--ignore-scripts`; no provenance/
SBOM; no pinned Node via `.nvmrc` (CI hardcodes `node-version: 20`, `ci.yml:21, 52`).
**Recommendation:** Add `.nvmrc` (`20`), consider `npm ci --ignore-scripts` for the build job
(after auditing that no install scripts are legitimately needed), and emit an SBOM
(`npm sbom --omit=dev`) as an artifact. Low priority but good hygiene for a CRM handling PII.

---

## What's already good (don't lose this)

- **CI concurrency cancellation** — `ci.yml:8-10` (`cancel-in-progress: true`) stops wasted
  runner minutes on rapid pushes. ✔
- **npm cache via `setup-node`** — `ci.yml:22, 53` (`cache: npm`). ✔
- **Real Postgres service in CI with a healthcheck** — `ci.yml:34-47` (`pg_isready`, retries
  10). Migrations/seed/build run against an actual DB, not mocks. ✔
- **Migration ledger + advisory lock + per-migration transaction** — `migrate.ts:64` (advisory
  lock prevents concurrent-run races), `migrate.ts:76-81` (`schema_migrations` ledger -> each
  migration runs exactly once), `migrate.ts:102-110` (BEGIN/COMMIT/ROLLBACK per file). This is
  better than many hand-rolled runners. ✔
- **Destructive-reset guard** — `migrate.ts:39-41, 54-59` refuses `--reset` unless
  `DATABASE_URL` looks local, preventing catastrophic prod data loss. ✔
- **Build-time env fail-fast** — `next.config.mjs:11-28` (`assertEnv()`) throws at `next build`
  if prod env vars are missing, so a misconfigured deploy fails in CI not at runtime. ✔
- **Thorough security headers** — `next.config.mjs:49-89`: `nosniff`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, HSTS w/ preload, and a **strict CSP** with dev-only
  `'unsafe-eval'` gating. Strong baseline. ✔
- **Secrets are not committed** — `git ls-files` confirms only `.env.example` is tracked;
  `.gitignore:26-27` covers `.env` and `.env*.local`. ✔
- **App-level abuse protection** — `leads.ts:14, 32-44`: per-IP rate limit (5/min) + honeypot. ✔
- **Idempotent seeding** — `seed-content.ts` uses `on conflict (id) do nothing` everywhere, so
  re-seeding is safe. ✔
- **7,600-page build is actually managed** — `next.config.mjs:35-39` throttles static-gen
  workers; recent commit `6d833e9` moved heavy pages on-demand to fix timeouts. The team is
  aware of and actively managing build performance. ✔

---

## Prioritized repair plan

> Order = (business risk x likelihood x cheapness-to-fix). Items marked **(YAGNI-deferred)**
> are real but can wait per the project's documented preference to avoid blocking on external
> service credentials; they should land with a clear note, not be silently skipped.

### Phase 0 — Stop the bleeding (this week)
- [ ] **C3** Fix `/api/health` to actually `select 1` with a 3s timeout + return 503 on failure.
- [ ] **C2-min** Add a durable dead-letter path for failed leads (table or Storage append) so no
      lead is ever silently lost; keep the friendly UX.
- [ ] **C1-min** Write `docs/ops/deploy.md` codifying the manual migrate->deploy->smoke sequence
      until automation lands.
- [ ] **H6** Harden `docker-compose.yml` (required password, healthcheck, `restart`).

### Phase 1 — Visibility & safety (2–4 weeks)
- [ ] **H1** Add a structured logger; route lead failures + health 503s through it; add a simple
      alert on the C2 dead-letter count. **(Sentry itself: YAGNI-deferred — add DSN stub only.)**
- [ ] **H2** Add `npm audit` + `.github/dependabot.yml` + CodeQL to CI.
- [ ] **H5** Add an E2E job to CI (Playwright against the built app + postgres service).
- [ ] **H3** Document Supabase backup posture (RTO/RPO) + add nightly `pg_dump` cron + a restore
      test in staging.
- [ ] **C1-full** Add a `deploy` job: migrate-first against prod, then Vercel deploy, fail-fast.

### Phase 2 — Maturity (1–2 months)
- [ ] **M1** Stand up a `staging` Supabase project + Vercel branch deploy; gate `main` on green
      preview E2E.
- [ ] **H4** Add migration checksums; document forward-only policy + `down` template.
- [ ] **M2** Derive `staticGenerationMaxConcurrency` from `PGPOOL_MAX`; add `.next/cache` CI cache.
- [ ] **M3** Extract one shared `.env` loader (or adopt `dotenv`).
- [ ] **M4** Add `husky` + `lint-staged` (pre-commit lint/format, pre-push typecheck).
- [ ] **M5** Audit `process.env.*` reads; complete `.env.example` (`PGPOOL_MAX`,
      `INITIAL_ADMIN_EMAIL`, ...).

### Phase 3 — Hygiene (ongoing)
- [ ] **M6** Add a minimal `vercel.json` (functions timeouts, rewrites/redirects).
- [ ] **L2** Complete the ops runbook (`deploy`/`migrations`/`incidents`).
- [ ] **L1/L4** Dependabot + `.nvmrc` + `--ignore-scripts` consideration + SBOM artifact.

---

## Notes & deferrals (per project YAGNI preference)

- **Sentry / Datadog / Upstash Redis** are intentionally **not** recommended as blocking
  prerequisites. The C2/H1 fixes deliver 80% of the value with **no new external credentials**;
  full APM can be a config flip later (`NEXT_PUBLIC_SENTRY_DSN` stub added to `.env.example`
  now so the seam exists).
- **Terraform/Pulumi** (IaC) is **deferred** — for a single Vercel + single Supabase project,
  click-ops + versioned `vercel.json` + a runbook is the pragmatic choice; revisit if/when a
  second environment or additional cloud resources appear.
- **A Dockerfile for the app** is **not** urgently needed while deploying to Vercel (which builds
  Next.js natively). Add one only if moving to a container host (Fly/Render/self-host) or if a
  reproducible local-prod-parity image is wanted.
