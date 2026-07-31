import { NextResponse } from 'next/server';
import { data } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  const limit = Math.min(Number(searchParams.get('limit') ?? 10), 25);

  if (!q.trim()) return NextResponse.json({ results: [] });

  try {
    const results = await data.search.search(q, limit);
    return NextResponse.json({ results });
  } catch (err) {
    console.error('search api error:', err);
    return NextResponse.json({ results: [], error: 'search_failed' }, { status: 500 });
  }
}