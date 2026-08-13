import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { routing } from "@/i18n/routing";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const errorParam = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  let next =
    requestUrl.searchParams.get("next") ??
    `/${routing.defaultLocale}/dashboard`;
  // 3.1: Open redirect protection — reject non-relative paths and protocol-relative URLs.
  if (!next.startsWith("/") || next.startsWith("//")) {
    next = `/${routing.defaultLocale}/dashboard`;
  }
  // 3.1: Additional origin-equality check — resolve against request origin
  // and verify the redirect target's origin matches.
  const redirectTarget = new URL(next, requestUrl.origin);
  if (redirectTarget.origin !== requestUrl.origin) {
    next = `/${routing.defaultLocale}/dashboard`;
  }

  // Supabase auth error redirect (e.g. from email link)
  if (errorParam) {
    logger.error(
      "auth callback: Supabase error",
      { code: errorParam },
      new Error(errorDescription ?? errorParam),
    );
    return NextResponse.redirect(
      new URL(
        `/${routing.defaultLocale}/dashboard/login?error=auth`,
        requestUrl.origin,
      ),
    );
  }

  const res = NextResponse.redirect(redirectTarget);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    logger.error("auth callback: missing Supabase env vars");
    return res;
  }
  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options),
        );
      },
    },
  });

  if (code) {
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      logger.error(
        "auth callback: exchangeCodeForSession failed",
        { code: error.code },
        error,
      );
      return NextResponse.redirect(
        new URL(
          `/${routing.defaultLocale}/dashboard/login?error=auth`,
          requestUrl.origin,
        ),
      );
    }
    // QA-1 / SEC-10: log WITHOUT the email (PII). A boolean is all operators need.
    logger.info("auth callback: session established", { hasUser: !!data.user });
  }
  return res;
}
