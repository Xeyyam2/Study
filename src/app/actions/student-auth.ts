'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { crm } from '@/lib/crm';
import { STUDENT_SESSION_COOKIE } from '@/lib/crm/student-session';
import { devStudentLoginSchema } from '@/lib/validations/student';

export async function devStudentLogin(input: unknown) {
  const parsed = devStudentLoginSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const };
  const profile = await crm.getProfile(parsed.data.profileId);
  if (!profile || profile.role !== 'student') return { ok: false as const };
  const store = await cookies();
  store.set(
    STUDENT_SESSION_COOKIE,
    JSON.stringify({ userId: profile.id, fullName: profile.fullName }),
    { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 },
  );
  redirect(`/${parsed.data.locale}/dashboard`);
}

export async function signOutStudent(locale: string) {
  const { getSupabaseSessionClient } = await import('@/lib/supabase/server-session');
  const supabase = await getSupabaseSessionClient();
  await supabase.auth.signOut();
  const store = await cookies();
  store.delete(STUDENT_SESSION_COOKIE);
  redirect(`/${locale}/dashboard/login`);
}
