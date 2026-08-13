# Deploy & Rollback Runbook

> Owners: StudyHub ops · Last reviewed: 2026-08-12
> Stack: Next.js 15 (App Router) on Vercel · Postgres on Supabase.

## Environments

| Env        | Branch                          | Supabase project               | URL                    |
| ---------- | ------------------------------- | ------------------------------ | ---------------------- |
| Production | `main` (Vercel Git auto-deploy) | prod Supabase                  | `NEXT_PUBLIC_SITE_URL` |
| Preview    | PR branches (Vercel preview)    | staging Supabase (recommended) | `*.vercel.app`         |

> Until a staging Supabase project exists, PR previews run against the **prod**
> Supabase with `SUPABASE_ENABLED=false` (direct `pg`). Treat previews as
> read-mostly; never run destructive actions from a preview.

## Required production env vars (Vercel → Settings → Environment Variables)

```
NEXT_PUBLIC_SITE_URL       # real domain — canonical/hreflang/sitemap depend on it
DATABASE_URL               # Supabase direct (non-pooler) connection
SUPABASE_ENABLED=true      # once SupabaseCrmRepository is wired
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY  # server-only
SESSION_SECRET             # long random hex (cookie HMAC)
NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID   # analytics (optional)
UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN  # rate limiting (recommended)
TRUST_PROXY=1              # Vercel is a trusted proxy
```

## Standard deploy sequence (manual, until CD lands)

> The CI pipeline (`.github/workflows/ci.yml`) runs lint → typecheck → migrate+seed
> → unit → build → e2e. **Migrations against prod are NOT yet automated** (QA-2),
> so order matters: **migrate first, then deploy.**

1. **Merge** the PR to `main` (CI must be green).
2. **Apply Supabase-only migrations** that `migrate.ts` skips locally
   (`0005/0006/0007/0009/0013/0018/0021` + any future `SKIP_LOCAL` entry) in the
   Supabase **SQL Editor**, in filename order. General migrations (`0020_leads_dl`,
   `0022_*`, …) go via the migrator below.
3. **Apply general migrations** against prod:
   ```bash
   DATABASE_URL="<prod-direct-conn>" npm run db:migrate
   ```
   The migrator uses the `schema_migrations` ledger + advisory lock + SHA-256
   checksum (QA-4) — it skips already-applied files and refuses edited ones.
4. **Deploy:** push to `main` triggers Vercel. `assertEnv()` fails the build if a
   required prod env var is missing.
5. **Smoke test** after Vercel finishes:
   - `curl -fsS https://<domain>/api/health` → `{"ok":true}` (200).
   - Open the homepage, a university detail page, `/apply`, and `/en/dashboard/login`.
   - Submit a test lead and confirm it appears in `/admin` (CRM).

## Rollback

- **Code:** Vercel keeps instant rollbacks — Dashboard → Deployments → "Instant Rollback"
  to the previous production deployment. This reverts _code_ but **not** the DB schema.
- **Schema:** migrations are **forward-only** (no `down`). To revert a schema change,
  write a _new_ forward migration that undoes it (see `docs/ops/migrations.md`).
- **Data:** restore from the nightly dump (`docs/ops/backup.md`) or Supabase PITR.

## Incident checklist

1. Check `/api/health` (503 → DB/Supabase issue).
2. Vercel deployment logs + runtime logs (structured JSON from `src/lib/logger.ts`).
3. Supabase dashboard → database health / connection count / recent queries.
4. If leads are silently failing: query `leads_dl` (`replayed_at is null`) — these
   are captured-but-not-recorded leads (SEC-1 dead-letter). Replay manually.
5. Roll back code (step above) if a deploy caused it; page on the backup if data is lost.

## "Migrate-first" hard gate (when CD lands — QA-2)

The deploy job MUST run `db:migrate` against prod **before** Vercel goes live and
**fail the deploy** on migration error. Until then, the manual sequence above is the
source of truth — do not let Vercel auto-deploy ahead of an unapplied migration.
