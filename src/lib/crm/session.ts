// src/lib/crm/session.ts — admin/staff auth (Supabase session + dev fallback)
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { crm } from './index';
import { getSessionUser } from '@/lib/supabase/server-session';
import { isDevAuthEnabled } from './student-session';
import type { Profile, UserRole } from '@/types/crm';

export const SESSION_COOKIE = 'admin_session';

const STAFF_ROLES: UserRole[] = ['admin', 'consultant', 'editor'];

export interface AdminSession {
  userId: string;
  role: string;
  fullName: string;
  profile: Profile;
}

/** Real Supabase session resolved to a staff profile (role check). */
async function getStaffSession(): Promise<AdminSession | null> {
  const user = await getSessionUser();
  if (!user) return null;
  const profile = await crm.getStaffProfileByAuthUid(user.id, user.email ?? '');
  if (!profile || !STAFF_ROLES.includes(profile.role)) return null;
  return { userId: profile.id, role: profile.role, fullName: profile.fullName, profile };
}

/** Dev fallback (DEV_AUTH_ENABLED): seeded demo staff via legacy cookie. */
async function getDevStaffSession(): Promise<AdminSession | null> {
  if (!isDevAuthEnabled()) return null;
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    const { userId } = JSON.parse(raw) as { userId: string };
    const profile = await crm.getProfile(userId);
    if (!profile || !STAFF_ROLES.includes(profile.role)) return null;
    return { userId: profile.id, role: profile.role, fullName: profile.fullName, profile };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSession | null> {
  return (await getStaffSession()) ?? (await getDevStaffSession());
}

export async function requireStaff(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return session;
}

export async function getActorProfile(): Promise<Profile | null> {
  const session = await getSession();
  return session?.profile ?? null;
}
