// src/lib/student-session-server.ts — layout/server-component helper.
// Mirrors the staff getSession() convention in ./crm/session.ts: resolve the
// real Supabase session first, then fall back to the dev-auth demo student so
// the header avatar renders in dev mode (DEV_AUTH_ENABLED=1).
import {
  getStudentSession,
  getDevStudentSession,
  type StudentSession,
} from '@/lib/crm/student-session';

/** Resolve the student session for use in server components/layouts. */
export async function getStudentSessionForLayout(): Promise<StudentSession | null> {
  return (await getStudentSession()) ?? (await getDevStudentSession());
}
