'use server';

import { headers } from 'next/headers';
import { leadSchema, type LeadInput } from '@/lib/validations/lead';
import { crm } from '@/lib/crm';
import { rateLimit, getIpFromHeaders } from '@/lib/rate-limit';

export type LeadResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string[]> };

// 5 lead submissions per minute per IP — enough for an honest applicant who
// retries after a typo, but blocks a script flooding the CRM with spam leads.
const leadLimiter = rateLimit({ windowMs: 60_000, max: 5 });

export async function submitLead(input: unknown): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(input);

  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(
      parsed.error.flatten().fieldErrors,
    )) {
      if (Array.isArray(value) && value.length) errors[key] = value;
    }
    return { ok: false, errors };
  }

  const data = parsed.data as LeadInput;

  // Honeypot caught a bot.
  if (data.website) {
    return { ok: true };
  }

  // Rate limit per IP before touching the DB so spam can't fill the leads table.
  const h = await headers();
  const ip = getIpFromHeaders((name) => h.get(name));
  if (!leadLimiter.check(ip)) {
    return {
      ok: false,
      errors: { _form: ['Too many submissions. Please wait a minute and try again.'] },
    };
  }

  // Persist the lead into the CRM. We fail open: a transient DB error must not
  // break the public "Apply Now" UX (the student has already filled the form).
  // The failure is logged server-side so it can be picked up by monitoring.
  try {
    const profile = await crm.findOrCreateStudent({
      email: data.email,
      fullName: `${data.firstName} ${data.lastName}`.trim(),
      phone: data.phone,
      whatsapp: data.whatsapp || null,
      countryCode: data.country,
    });

    await crm.createLead({
      userId: profile.id,
      // university_id is NOT NULL + a soft-ref to seed content; a general
      // application with no specific university page is tagged 'direct'.
      universityId: data.universitySlug || 'direct',
      programId: data.programInterest || null,
      source: 'website',
      notes: data.message || '',
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[lead capture failed]', err);
  }

  return { ok: true };
}
