import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Pool } from 'pg';
import { createPgCrm } from '@/lib/crm/pg-repository';
import type { CrmRepository } from '@/lib/crm/repositories';

const STUDENT = '44444444-4444-4444-4444-444444444444'; // Ali Veli (seed)
let pool: Pool;
let crm: CrmRepository;

beforeEach(async () => {
  pool = new Pool({ connectionString: process.env.DATABASE_URL!, max: 3 });
  crm = createPgCrm(() => pool);
});

afterEach(async () => {
  await pool.end();
});

describe('student-scoped reads', () => {
  it('lists students only', async () => {
    const students = await crm.listStudents();
    expect(students.length).toBeGreaterThan(0);
    expect(students.every((s) => s.role === 'student')).toBe(true);
  });

  it('lists the student own leads', async () => {
    const leads = await crm.listMyLeads(STUDENT);
    expect(leads.length).toBeGreaterThan(0);
    expect(leads.every((l) => l.userId === STUDENT)).toBe(true);
  });

  it('lists the student own applications (via leads)', async () => {
    const apps = await crm.listMyApplications(STUDENT);
    expect(Array.isArray(apps)).toBe(true);
  });

  it('lists the student own documents (via leads)', async () => {
    const docs = await crm.listMyDocuments(STUDENT);
    expect(Array.isArray(docs)).toBe(true);
  });
});
