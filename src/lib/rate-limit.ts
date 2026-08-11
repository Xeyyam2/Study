/**
 * In-memory sliding-window rate limiter.
 *
 * Keeps a per-key array of request timestamps and drops the ones older than
 * the window. If the remaining count is under `max`, the request is allowed and
 * the timestamp is recorded; otherwise it's rejected.
 *
 * Runtime notes:
 * - Works in both Edge and Node runtimes (no Node-specific APIs).
 * - In a serverless deploy (Vercel), each function instance keeps its own
 *   counts, so the effective limit is `max * instance_count`. This is an
 *   acceptable first line of defence against casual abuse; for precise,
 *   instance-independent limiting migrate to `@upstash/ratelimit` + Redis
 *   (tracked as a follow-up).
 * - The store grows at most `max` entries per distinct key, and entries are
 *   pruned on every check, so memory stays bounded for typical traffic.
 */

interface Limiter {
  /** Returns true when the request is under the limit (allowed). */
  check(key: string): boolean;
}

export function rateLimit(opts: { windowMs: number; max: number }): Limiter {
  const { windowMs, max } = opts;
  const hits = new Map<string, number[]>();

  return {
    check(key: string): boolean {
      const now = Date.now();
      const since = now - windowMs;
      const arr = hits.get(key);
      // Keep only timestamps inside the sliding window.
      const recent = arr ? arr.filter((t) => t > since) : [];
      if (recent.length >= max) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.set(key, recent);
      return true;
    },
  };
}

/**
 * Resolve the caller IP from request headers. The `x-forwarded-for` header is
 * client-spoofable, so we only trust it when the app is explicitly configured
 * to sit behind a trusted proxy (`TRUST_PROXY=1` — e.g. Vercel). Otherwise we
 * use `x-real-ip` (set by the proxy after validation) or fall back to a fixed
 * string so the limiter still has a key.
 */
export function getIpFromHeaders(
  headerLookup: (name: string) => string | null,
): string {
  const trustProxy = process.env.TRUST_PROXY === '1';
  if (trustProxy) {
    const forwarded = headerLookup('x-forwarded-for');
    if (forwarded) {
      // "client, proxy1, proxy2" — take the first (the original client).
      return forwarded.split(',')[0].trim();
    }
  }
  return headerLookup('x-real-ip') ?? 'unknown';
}
﻿
