// src/lib/crm/index.ts
import { getPool } from './db';
import { createPgCrm } from './pg-repository';
import { createSupabaseCrm } from './supabase-repository';
import type { CrmRepository } from './repositories';

function createCrmLayer(): CrmRepository {
  if (process.env.SUPABASE_ENABLED === 'true') return createSupabaseCrm();
  return createPgCrm(getPool);
}

export const crm: CrmRepository = createCrmLayer();

export type { CrmRepository } from './repositories';
