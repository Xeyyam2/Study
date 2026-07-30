// src/app/actions/crm.ts
'use server';

import { revalidatePath } from 'next/cache';
import { crm } from '@/lib/crm';
import { getActorProfile } from '@/lib/crm/session';
import {
  assignConsultantSchema,
  updateLeadStatusSchema,
} from '@/lib/validations/crm';

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function updateLeadStatusAction(input: unknown): Promise<ActionResult> {
  const parsed = updateLeadStatusSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'Invalid input' };
  const actor = await getActorProfile();
  if (!actor) return { ok: false, error: 'Not authenticated' };
  await crm.updateLeadStatus(parsed.data.leadId, parsed.data.status as never, actor.id);
  revalidatePath('/admin/leads');
  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  revalidatePath('/admin');
  return { ok: true };
}

export async function assignConsultantAction(input: unknown): Promise<ActionResult> {
  const parsed = assignConsultantSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'Invalid input' };
  const actor = await getActorProfile();
  if (!actor) return { ok: false, error: 'Not authenticated' };
  await crm.assignConsultant(parsed.data.leadId, parsed.data.consultantId, actor.id);
  revalidatePath('/admin/leads');
  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  return { ok: true };
}
