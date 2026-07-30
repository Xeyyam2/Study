// src/lib/crm/supabase-repository.ts
import type { CrmRepository } from './repositories';

/**
 * Phase 2 stub. Implemented fully in sub-project B once Supabase keys exist.
 * Mirrors PgCrmRepository behaviour via the supabase-js client (RLS-aware).
 */
export function createSupabaseCrm(): CrmRepository {
  throw new Error(
    'SupabaseCrmRepository is not implemented yet (Phase 2 sub-project B). ' +
      'Set SUPABASE_ENABLED=false to use the local PgCrmRepository.',
  );
}
