import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { AppLocale } from '@/i18n/routing';

export const STUDENT_SESSION_COOKIE = 'student_session';

export interface StudentSession {
  userId: string;
  fullName: string;
}

export async function getStudentSession(): Promise<StudentSession | null> {
  const store = await cookies();
  const raw = store.get(STUDENT_SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StudentSession;
  } catch {
    return null;
  }
}

export async function requireStudent(locale: AppLocale): Promise<StudentSession> {
  const session = await getStudentSession();
  if (!session) redirect(`/${locale}/dashboard/login`);
  return session;
}
