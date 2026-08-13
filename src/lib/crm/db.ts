// src/lib/crm/db.ts — re-export of the shared pool (BE-1).
// Kept for backward compatibility; new code should import from '@/lib/db'.
export { getPool } from "../db";
