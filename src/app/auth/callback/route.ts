import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');
  let next = requestUrl.searchParams.get('next') ?? `/${routing.defaultLocale}/dashboard`;
  // Open-redirect qorunması: `next` yalnız lokal, nispi path ola bilər.
  // Tam URL (https://evil.com) və ya `//evil.com` `new URL()` tərəfindən origin-i
  // override edə bilər — ona görə yalnız `/` ilə başlayan və `//` olmayan path-ə icazə veririk.
  if (!next.startsWith('/') || next.startsWith('//')) {
    next = `/${routing.defaultLocale}/dashboard`;
  }
  const redirectTarget = new URL(next, requestUrl.origin);
  const res = NextResponse.redirect(redirectTarget);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return res;
  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(new URL(`/${routing.defaultLocale}/dashboard/login?error=auth`, requestUrl.origin));
    }
  }
  return res;
}
