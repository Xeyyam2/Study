import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Health check endpoint for uptime monitors / orchestrators.
 * Returns 200 with a trivial payload; optionally verifies the DB pool when
 * DATABASE_URL is set.
 */
export async function GET() {
  const db = !!process.env.DATABASE_URL;
  return NextResponse.json({ ok: true, db }, { status: 200 });
}
