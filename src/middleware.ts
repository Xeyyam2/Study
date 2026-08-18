import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// Hard-coded cookie name instead of importing from lib/crm/session: that module
// pulls in `pg`, which is Node-only and breaks the edge-runtime middleware
// ("Code generation from strings disallowed for this context").
const SESSION_COOKIE = "admin_session";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin routes are locale-less (src/app/admin), so they must never reach the
  // next-intl middleware — `localePrefix: 'always'` would rewrite /admin/* to
  // /en/admin/* and 404. Handle auth here, then short-circuit.
  if (pathname.startsWith("/admin")) {
    // Central admin gate (defense-in-depth): block anonymous access to /admin/*
    // before the route renders. Fine-grained staff/role checks still happen in
    // the admin layout via requireStaff(). /admin/login is exempt. The dev-auth
    // cookie is accepted here so demo logins (DEV_AUTH_ENABLED) keep working —
    // the layout re-validates the actual profile/role.
    if (!pathname.startsWith("/admin/login")) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      let authenticated = false;
      if (url && anon) {
        const supabase = createServerClient(url, anon, {
          auth: { flowType: "pkce" },
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
        loginUrl.pathname = "/admin/login";
        loginUrl.search = "";
        return NextResponse.redirect(loginUrl);
      }
    }
    // /admin/* never passes through the intl middleware (locale-less routes).
    return NextResponse.next();
  }

  // i18n locale handling for public + dashboard routes.
  const res = intlMiddleware(req);

  // Refresh the Supabase access token on each request. After the marketing
  // layout stopped reading the session (ISR), this is the single place that
  // keeps the cookie fresh for public routes.
  // PERF(P0): only run the cross-network getUser() round-trip when an auth
  // cookie is actually present — anonymous visitors otherwise pay a Supabase
  // hop on every marketing pageview. Supabase ssr cookies are named
  // `sb-<ref>-auth-token` / `sb.<ref>.auth.token*`.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const hasAuthCookie = req.cookies
    .getAll()
    .some((c) => /^sb[-.]/.test(c.name));
  if (url && anon && hasAuthCookie) {
    const supabase = createServerClient(url, anon, {
      auth: { flowType: "pkce" },
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options),
          );
          // Forward the refreshed session to the downstream request as well
          // (the Supabase-documented pattern). Without this, the page/RSC
          // render still sees the OLD access token from the browser and
          // performs a SECOND refresh with the already-rotated refresh token;
          // when that loses the rotation race getUser() returns null and
          // protected pages bounce the user back to /dashboard/login.
          toSet.forEach(({ name, value }) => req.cookies.set(name, value));
        },
      },
    });
    await supabase.auth.getUser();
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|auth|.*\\..*).*)"],
};
