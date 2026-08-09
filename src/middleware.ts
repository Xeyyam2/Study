import { createServerClient } from '@supabase/ssr';
import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Hard-coded cookie name instead of importing from lib/crm/session: that module
// pulls in `pg`, which is Node-only and breaks the edge-runtime middleware
// ("Code generation from strings disallowed for this context").
const SESSION_COOKIE = 'admin_session';

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Central admin gate (defense-in-depth): block anonymous access to /admin/*
  // before the route renders. Fine-grained staff/role checks still happen in
  // the admin layout via requireStaff(). /admin/login is exempt. The dev-auth
  // cookie is accepted here so demo logins (DEV_AUTH_ENABLED) keep working —
  // the layout re-validates the actual profile/role.
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    let authenticated = false;
    if (url && anon) {
      const supabase = createServerClient(url, anon, {
        cookies: {
          getAll: () => req.cookies.getAll(),
          setAll: () => {
            // Read-only in middleware; refresh happens via getUser() below.
          },
        },
      });
      // getUser() validates the JWT server-side (preferred over getSession()).
      const {
        data: { user },
      } = await supabase.auth.getUser();
      authenticated = !!user;
    }
    if (!authenticated && req.cookies.get(SESSION_COOKIE)?.value) {
      authenticated = true;
    }
    if (!authenticated) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.search = '';
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // i18n locale handling for public + dashboard routes.
  const res = intlMiddleware(req);

  // Refresh the Supabase access token on each request. After the marketing
  // layout stopped reading the session (ISR), this is the single place that
  // keeps the cookie fresh for public routes.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && anon) {
    const supabase = createServerClient(url, anon, {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
        },
      },
    });
    await supabase.auth.getUser();
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|auth|.*\\..*).*)'],
};
