// src/lib/crm/session.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { crm } from './index';
import type { Profile } from '@/types/crm';

export const SESSION_COOKIE = 'admin_session';

export interface AdminSession {
  userId: string;
  role: string;
  fullName: string;
}

export async function getSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export async function requireStaff(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return session;
}

export async function getActorProfile(): Promise<Profile | null> {
  const session = await getSession();
  if (!session) return null;
  return crm.getProfile(session.userId);
}
