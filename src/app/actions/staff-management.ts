// src/app/actions/staff-management.ts
'use server';

import { revalidatePath } from 'next/cache';
import { crm } from '@/lib/crm';
import { requireStaff } from '@/lib/crm/session';
import { updateRoleSchema, changePasswordSchema } from '@/lib/validations/crm';

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function updateRoleAction(input: unknown): Promise<ActionResult> {
  const session = await requireStaff();
  if (session.role !== 'admin') return { ok: false, error: 'Not authorized' };
  const parsed = updateRoleSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'Invalid input' };
  if (parsed.data.profileId === session.userId && parsed.data.role !== 'admin')
    return { ok: false, error: 'Cannot demote yourself' };
  try {
    await crm.updateProfileRole(parsed.data.profileId, parsed.data.role, session.userId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to update role';
    return { ok: false, error: msg };
  }
  revalidatePath('/admin/users');
  return { ok: true };
}

export async function changePasswordAction(input: unknown): Promise<ActionResult> {
  // C4/H6: Require staff session — was missing auth guard.
  const session = await requireStaff();
  const parsed = changePasswordSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return { ok: false, error: firstError?.message ?? 'Invalid input' };
  }
  const { currentPassword, newPassword } = parsed.data;
  try {
    const { getSupabaseSessionClient } = await import('@/lib/supabase/server-session');
    const supabase = await getSupabaseSessionClient();
    // C4: Verify current password before updating — prevents session hijack
    // from silently changing the password without knowing the old one.
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: session.profile.email,
      password: currentPassword,
    });
    if (verifyError) return { ok: false, error: 'Current password is incorrect' };
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    if (updateError) return { ok: false, error: updateError.message };
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to change password';
    return { ok: false, error: msg };
  }
}