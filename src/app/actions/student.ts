'use server';

import { crm } from '@/lib/crm';
import { getStudentSession } from '@/lib/crm/student-session';
import { sendMessageSchema } from '@/lib/validations/student';

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function sendStudentMessage(input: unknown): Promise<ActionResult> {
  const parsed = sendMessageSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'Invalid input' };
  const session = await getStudentSession();
  if (!session) return { ok: false, error: 'Not authenticated' };
  const lead = await crm.getLead(parsed.data.leadId);
  if (!lead || lead.userId !== session.userId) return { ok: false, error: 'Not allowed' };
  await crm.sendMessage({ leadId: parsed.data.leadId, senderId: session.userId, body: parsed.data.body });
  return { ok: true };
}
