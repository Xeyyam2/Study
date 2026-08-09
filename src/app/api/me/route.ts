import { NextResponse } from 'next/server';
import { getStudentSessionForLayout } from '@/lib/student-session-server';

// Resolves the current student session for client-side consumption (header
// avatar / sign-in state). Kept as a route handler so the marketing PAGES stay
// statically renderable (ISR) — the per-request cookie read happens here, not
// in the page/layout render tree.
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getStudentSessionForLayout();
  const res = session ?? { profile: null };
  return NextResponse.json(res, {
    headers: { 'cache-control': 'no-store' },
  });
}
