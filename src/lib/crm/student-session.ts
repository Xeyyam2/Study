import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import type { AppLocale } from '@/i18n/routing';
import { crm } from './index';
import { getSessionUser } from '@/lib/supabase/server-session';
import type { Profile } from '@/types/crm';

export const STUDENT_SESSION_COOKIE = 'student_session';

/** Dev-auth fallback is OFF by default. Enable only by setting DEV_AUTH_ENABLED=1
 *  AND running outside production. The NODE_ENV gate is hard: even if the flag
 *  leaks into a production env, the entire dev-auth subsystem (cookie readers
 *  and the devLogin actions) stays inert — neutralizing both the unsigned
 *  cookie and the predictable seed UUIDs in one place. */
export function isDevAuthEnabled(): boolean {
  return process.env.DEV_AUTH_ENABLED === '1' && process.env.NODE_ENV !== 'production';
}

export interface StudentSession {
  userId: string; // local profile.id — CRM queries key on this
  profile: Profile;
}

export async function getStudentSession(): Promise<StudentSession | null> {
  // Same defensive pattern as getStaffSession: a Supabase failure must not
  // block the dev fallback from running.
  try {
    const user = await getSessionUser();
    if (!user) return null;
    const profile = await crm.upsertStudentByAuthUid({
      authUid: user.id,
      email: user.email ?? '',
      fullName: (user.user_metadata?.full_name as string | undefined) ?? '',
    });
    return { userId: profile.id, profile };
  } catch {
    return null;
  }
}

export async function requireStudent(locale: AppLocale): Promise<StudentSession> {
  const session = await getStudentSession();
  if (!session) redirect(`/${locale}/dashboard/login`);
  return session;
}

/** Resolve the student session via either path (Supabase or dev fallback),
 *  WITHOUT redirecting. For use in server actions that must return a result
 *  instead of redirecting — mirrors requireStudentAny's resolution. */
export async function getStudentSessionAny(): Promise<StudentSession | null> {
  return (await getStudentSession()) ?? (await getDevStudentSession());
}

// Dev fallback (DEV_AUTH_ENABLED=1): resolve a seeded demo student via legacy cookie.
export async function getDevStudentSession(): Promise<StudentSession | null> {
  if (!isDevAuthEnabled()) return null;
  const store = await cookies();
  const raw = store.get(STUDENT_SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    const { userId } = JSON.parse(raw) as { userId: string };
    const profile = await crm.getProfile(userId);
    return profile ? { userId: profile.id, profile } : null;
  } catch {
    return null;
  }
}

export async function requireStudentAny(locale: AppLocale): Promise<StudentSession> {
  const session = (await getStudentSession()) ?? (await getDevStudentSession());
  if (!session) redirect(`/${locale}/dashboard/login`);
  return session;
}
