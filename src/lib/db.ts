// src/lib/db.ts — single shared pg.Pool for the whole app.
// BE-1: both the CRM and the marketing data layer previously created their own
// pools (max 2 + max 5) against the same DATABASE_URL — up to ~7 connections
// per serverless instance. One pool with a sane default avoids exhausting
// Supabase `max_connections`.
import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    const max = Number(process.env.PGPOOL_MAX ?? 10);
    pool = new Pool({ connectionString: url, max });
    // Prevent unhandled EventEmitter errors from crashing the process when an
    // idle client hits a connection error.
    pool.on("error", (err) => {
      console.error("[pg pool error]", err);
    });
  }
  return pool;
}
