// src/lib/validations/crm.ts
import { z } from 'zod';
import { LEAD_PIPELINE } from '@/types/crm';

export const updateLeadStatusSchema = z.object({
  leadId: z.string().uuid(),
  status: z.enum(LEAD_PIPELINE as [string, ...string[]]),
});

export const assignConsultantSchema = z.object({
  leadId: z.string().uuid(),
  consultantId: z.string().uuid().nullable(),
});

export const devLoginSchema = z.object({
  profileId: z.string().uuid(),
});
