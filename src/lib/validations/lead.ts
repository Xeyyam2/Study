import { z } from 'zod';

export const leadSchema = z.object({
  firstName: z.string().min(2).max(60),
  lastName: z.string().min(2).max(60),
  email: z.string().email().max(120),
  phone: z
    .string()
    .min(7)
    .max(25)
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number'),
  whatsapp: z
    .string()
    .max(25)
    .regex(/^[0-9+\-\s()]*$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  country: z.string().min(2),
  programInterest: z.string().max(120).optional().or(z.literal('')),
  message: z.string().max(1000).optional().or(z.literal('')),
  universitySlug: z.string().max(120).optional().or(z.literal('')),
  locale: z.string().min(2),
  // Honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;
