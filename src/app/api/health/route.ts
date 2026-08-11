import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

/**
 * Health check endpoint for uptime monitors / orchestrators.
 * Runs `select 1` against Postgres (with a short timeout) so a dead DB actually
 * fails the check — `ok:true` must mean the app can serve requests.
 */
export async function GET() {
  let db = false;
  if (process.env.DATABASE_URL) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 2000,
      max: 1,
    });
    try {
      await pool.query('select 1');
      db = true;
    } catch {
      db = false;
    } finally {
      await pool.end().catch(() => {});
    }
  }
  if (!db) {
    return NextResponse.json({ ok: false, db }, { status: 503 });
  }
  return NextResponse.json({ ok: true, db }, { status: 200 });
}
