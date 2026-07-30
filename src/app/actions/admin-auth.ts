// src/app/actions/admin-auth.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { crm } from '@/lib/crm';
import { SESSION_COOKIE } from '@/lib/crm/session';
import { devLoginSchema } from '@/lib/validations/crm';

export async function devLogin(input: unknown) {
  const parsed = devLoginSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const };
  const profile = await crm.getProfile(parsed.data.profileId);
  if (!profile) return { ok: false as const };
  const store = await cookies();
  store.set(SESSION_COOKIE, JSON.stringify({ userId: profile.id, role: profile.role, fullName: profile.fullName }), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  redirect('/admin');
}

export async function devLogout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect('/admin/login');
}
