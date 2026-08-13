import { NextResponse } from "next/server";
import { Pool } from "pg";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

/**
 * Health check endpoint for uptime monitors / orchestrators.
 * Runs `select 1` against Postgres (with a short timeout) so a dead DB actually
 * fails the check — `ok:true` must mean the app can serve requests.
 */
export async function GET() {
  let dbOk = false;
  if (process.env.DATABASE_URL) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 2000,
      max: 1,
    });
    try {
      await pool.query("select 1");
      dbOk = true;
    } catch (err) {
      dbOk = false;
      // QA-1: surface DB-outage as a structured error so an uptime monitor +
      // log drain can page on it (no PII, no connection-string leak).
      logger.error("health check failed: DB unreachable", undefined, err);
    } finally {
      await pool.end().catch(() => {});
    }
  }
  // L2: don't leak DB presence to the public — return only ok/status.
  if (!dbOk) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
