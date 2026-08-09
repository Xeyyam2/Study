// src/app/actions/admin-auth.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { crm } from '@/lib/crm';
import { SESSION_COOKIE } from '@/lib/crm/session';
import { isDevAuthEnabled } from '@/lib/crm/student-session';
import { devLoginSchema } from '@/lib/validations/crm';

const STAFF_ROLES = ['admin', 'consultant', 'editor'];

export async function devLogin(input: unknown) {
  if (!isDevAuthEnabled()) return { ok: false as const };
  const parsed = devLoginSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const };
  const profile = await crm.getProfile(parsed.data.profileId);
  // Dev fallback must never grant staff access to a non-staff profile.
  if (!profile || !STAFF_ROLES.includes(profile.role)) return { ok: false as const };
  const store = await cookies();
  store.set(SESSION_COOKIE, JSON.stringify({ userId: profile.id, role: profile.role, fullName: profile.fullName }), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  redirect('/admin');
}

export async function signOutAdmin() {
  const { getSupabaseSessionClient } = await import('@/lib/supabase/server-session');
  const supabase = await getSupabaseSessionClient();
  await supabase.auth.signOut();
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect('/admin/login');
}
