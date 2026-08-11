'use server';

import { headers } from 'next/headers';
import { getSupabaseServer } from '@/lib/supabase/server';
import { isAllowedOrigin } from '@/lib/security/origin';

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'application/pdf'];
// Server-side allowlist for the storage path segment — the client may not
// dictate arbitrary prefixes into the bucket.
const ALLOWED_FIELDNAMES = new Set([
  'passport',
  'diploma',
  'photo',
  'motivationLetter',
  'motivation-letter',
]);
const BUCKET = 'apply-documents';

/**
 * Handles a single document upload from the public Apply form (no auth — this
 * runs before a lead is even created). When Supabase Storage is configured the
 * file is pushed to the `apply-documents` bucket; otherwise we hand back a
 * deterministic local placeholder path so the form keeps working in dev.
 */
export async function uploadApplyDocument(formData: FormData): Promise<UploadResult> {
  // Reject cross-origin browser calls (unauth storage abuse vector).
  const h = await headers();
  if (!isAllowedOrigin(h.get('origin'))) return { ok: false, error: 'Request rejected' };

  const file = formData.get('file');
  const fieldname = String(formData.get('fieldname') ?? 'document');
  if (!(file instanceof File)) return { ok: false, error: 'No file provided' };
  if (file.size === 0 || file.size > MAX_BYTES) return { ok: false, error: 'Invalid file size' };
  if (!ALLOWED_MIME.includes(file.type)) return { ok: false, error: 'Unsupported file type' };
  // M12: don't let the client pick an arbitrary storage prefix.
  if (!ALLOWED_FIELDNAMES.has(fieldname)) return { ok: false, error: 'Invalid field name' };

  // Dev/preview path — no Supabase configured. Return a stable placeholder URL
  // so the rest of the submit flow (leadSchema + submitLead) keeps working.
  if (process.env.SUPABASE_ENABLED !== 'true') {
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
    const url = `/uploads/placeholder-${fieldname}-${Date.now()}.${ext}`;
    return { ok: true, url };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
    const path = `apply/${fieldname}-${crypto.randomUUID()}.${ext}`;
    const supabase = getSupabaseServer();
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: false });
    if (error) return { ok: false, error: `Storage upload failed: ${error.message}` };
    return { ok: true, url: path };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return { ok: false, error: msg };
  }
}
