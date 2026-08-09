import createNextIntlPlugin from 'next-intl/plugin';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Fail fast at BUILD time so a misconfigured production deploy throws here
// instead of 500-ing on the first DB/auth request at runtime. Gated on
// production so `next dev` / `next lint` in CI stay lenient without a DB.
function assertEnv() {
  if (process.env.NODE_ENV !== 'production') return;
  const missing = [];
  if (!process.env.DATABASE_URL) missing.push('DATABASE_URL');
  // Supabase keys are only required when the app actually uses Supabase.
  if (process.env.SUPABASE_ENABLED === 'true') {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  }
  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
        'Copy .env.example to .env.local and fill in the values.',
    );
  }
}
assertEnv();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          // next/script inline + GA gtag + Clarity + GA collect.
          // Dev mode requires 'unsafe-eval' (webpack source maps + HMR use eval);
          // production builds don't, so it stays strict there.
          `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms${
            process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''
          }`,
          "style-src 'self' 'unsafe-inline'",
          // next/image öz originindən xidmət edir; uzaq şəkillər yalnız məlum
          // mənbələrdən (Unsplash/Pexels/Supabase) + data/blob URI-lar.
          "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com https://*.supabase.co",
          "font-src 'self' data:",
          // Supabase client (auth/realtime/storage) + GA/Clarity
          "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms",
          "frame-src 'self'",
          "frame-ancestors 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "upgrade-insecure-requests",
        ].join('; '),
      },
    ];
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
