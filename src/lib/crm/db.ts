// src/lib/crm/db.ts
import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set');
    const max = Number(process.env.PGPOOL_MAX ?? 5);
    pool = new Pool({ connectionString: url, max });
    // 4.1: Prevent unhandled EventEmitter errors from crashing the process
    // when an idle client encounters a connection error.
    pool.on('error', (err) => {
      console.error('[crm pool error]', err);
    });
  }
  return pool;
}
