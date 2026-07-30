// src/lib/crm/repositories.ts
import type {
  Application,
  ApplicationDetail,
  ApplicationDocument,
  ApplicationStatus,
  AuditEntryInput,
  AuditFilter,
  AuditLog,
  Lead,
  LeadDetail,
  LeadFilter,
  LeadStatus,
  LeadWithRelations,
  NewDocumentInput,
  NewLeadInput,
  Profile,
  StudentProfileInput,
} from '@/types/crm';

/** Thrown by write methods when the target row does not exist. */
export class NotFoundError extends Error {
  constructor(public readonly entity: string, id: string) {
    super(`${entity} not found: ${id}`);
    this.name = 'NotFoundError';
  }
}

export interface CrmRepository {
  // leads
  listLeads(filter?: LeadFilter): Promise<LeadWithRelations[]>;
  getLead(id: string): Promise<LeadDetail | null>;
  createLead(input: NewLeadInput, actorId?: string): Promise<Lead>;
  updateLeadStatus(id: string, status: LeadStatus, actorId: string): Promise<Lead>;
  assignConsultant(leadId: string, consultantId: string | null, actorId: string): Promise<Lead>;
  // applications
  listApplications(leadId: string): Promise<Application[]>;
  getApplication(id: string): Promise<ApplicationDetail | null>;
  updateApplicationStatus(id: string, status: ApplicationStatus, actorId: string): Promise<Application>;
  // documents
  listDocuments(applicationId: string): Promise<ApplicationDocument[]>;
  addDocument(input: NewDocumentInput, actorId?: string): Promise<ApplicationDocument>;
  // users
  listStaff(): Promise<Profile[]>;
  getProfile(id: string): Promise<Profile | null>;
  findOrCreateStudent(input: StudentProfileInput): Promise<Profile>;
  // stats
  countByStatus(): Promise<Record<string, number>>;
  // audit
  writeAudit(entry: AuditEntryInput): Promise<void>;
  listAudit(filter?: AuditFilter): Promise<AuditLog[]>;
}
