// src/lib/crm/pg-repository.ts
import type { Pool, QueryResult, QueryResultRow } from 'pg';
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
  Message,
  MessageWithSender,
  NewDocumentInput,
  NewDocumentUploadInput,
  NewLeadInput,
  NewMessageInput,
  Profile,
  StudentNotification,
  StudentProfileInput,
} from '@/types/crm';
import { NotFoundError, type CrmRepository } from './repositories';

function rowToProfile(r: QueryResultRow): Profile {
  return {
    id: r.id,
    email: r.email,
    fullName: r.full_name,
    role: r.role,
    phone: r.phone,
    whatsapp: r.whatsapp,
    countryCode: r.country_code,
    avatarUrl: r.avatar_url,
    createdAt: r.created_at,
  };
}

function rowToLead(r: QueryResultRow): Lead {
  return {
    id: r.id,
    userId: r.user_id,
    universityId: r.university_id,
    programId: r.program_id,
    status: r.status,
    source: r.source,
    assignedConsultantId: r.assigned_consultant_id,
    notes: r.notes,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export function createPgCrm(getPool: () => Pool): CrmRepository {
  const q = async <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params: unknown[] = [],
  ): Promise<QueryResult<T>> => getPool().query<T>(text, params as never[]);

  const audit = async (entry: AuditEntryInput): Promise<void> => {
    await q(
      `insert into public.audit_logs (user_id, action, entity, entity_id, metadata)
       values ($1, $2, $3, $4, $5::jsonb)`,
      [entry.userId, entry.action, entry.entity, entry.entityId ?? null, JSON.stringify(entry.metadata ?? {})],
    );
  };

  return {
    async listLeads(filter: LeadFilter = {}): Promise<LeadWithRelations[]> {
      const where: string[] = [];
      const params: unknown[] = [];
      if (filter.status) {
        params.push(filter.status);
        where.push(`l.status = $${params.length}`);
      }
      if (filter.consultantId) {
        params.push(filter.consultantId);
        where.push(`l.assigned_consultant_id = $${params.length}`);
      }
      if (filter.search) {
        params.push(`%${filter.search}%`);
        where.push(`(s.full_name ilike $${params.length} or s.email ilike $${params.length} or l.university_id ilike $${params.length})`);
      }
      const clause = where.length ? `where ${where.join(' and ')}` : '';
      const res = await q(
        `select l.*, s.id s_id, s.full_name s_name, s.email s_email, s.country_code s_country,
                c.id c_id, c.full_name c_name
         from public.leads l
         join public.profiles s on s.id = l.user_id
         left join public.profiles c on c.id = l.assigned_consultant_id
         ${clause}
         order by l.created_at desc
         limit 200`,
        params,
      );
      return res.rows.map((r) => ({
        ...rowToLead(r),
        student: r.s_id ? { id: r.s_id, fullName: r.s_name, email: r.s_email, countryCode: r.s_country } : null,
        consultant: r.c_id ? { id: r.c_id, fullName: r.c_name } : null,
      }));
    },

    async getLead(id: string): Promise<LeadDetail | null> {
      const res = await q(
        `select l.*, s.id s_id, s.full_name s_name, s.email s_email, s.country_code s_country,
                c.id c_id, c.full_name c_name
         from public.leads l
         join public.profiles s on s.id = l.user_id
         left join public.profiles c on c.id = l.assigned_consultant_id
         where l.id = $1`,
        [id],
      );
      if (res.rowCount === 0) return null;
      const r = res.rows[0];
      const [apps, timeline] = await Promise.all([
        this.listApplications(id),
        this.listAudit({ entity: 'lead', entityId: id, limit: 50 }),
      ]);
      return {
        ...rowToLead(r),
        student: { id: r.s_id, fullName: r.s_name, email: r.s_email, countryCode: r.s_country },
        consultant: r.c_id ? { id: r.c_id, fullName: r.c_name } : null,
        applications: apps,
        timeline,
      };
    },

    async createLead(input: NewLeadInput, actorId?: string): Promise<Lead> {
      const res = await q(
        `insert into public.leads (user_id, university_id, program_id, source, assigned_consultant_id, notes)
         values ($1,$2,$3,$4,$5,$6) returning *`,
        [input.userId, input.universityId, input.programId ?? null, input.source ?? 'website',
         input.assignedConsultantId ?? null, input.notes ?? ''],
      );
      const lead = rowToLead(res.rows[0]);
      if (actorId) await audit({ userId: actorId, action: 'lead.create', entity: 'lead', entityId: lead.id });
      return lead;
    },

    async updateLeadStatus(id: string, status: LeadStatus, actorId: string): Promise<Lead> {
      const prev = await q('select status from public.leads where id = $1', [id]);
      if (prev.rowCount === 0) throw new NotFoundError('lead', id);
      const from = prev.rows[0].status;
      const res = await q('update public.leads set status = $1 where id = $2 returning *', [status, id]);
      await audit({ userId: actorId, action: 'lead.update_status', entity: 'lead', entityId: id, metadata: { from, to: status } });
      return rowToLead(res.rows[0]);
    },

    async assignConsultant(leadId: string, consultantId: string | null, actorId: string): Promise<Lead> {
      const res = await q(
        'update public.leads set assigned_consultant_id = $1 where id = $2 returning *',
        [consultantId, leadId],
      );
      if (res.rowCount === 0) throw new NotFoundError('lead', leadId);
      await audit({ userId: actorId, action: 'lead.assign', entity: 'lead', entityId: leadId, metadata: { consultantId } });
      return rowToLead(res.rows[0]);
    },

    async listApplications(leadId: string): Promise<Application[]> {
      const res = await q('select * from public.applications where lead_id = $1 order by created_at', [leadId]);
      return res.rows.map((r) => ({
        id: r.id, leadId: r.lead_id, universityId: r.university_id, programId: r.program_id,
        status: r.status, assignedConsultantId: r.assigned_consultant_id, notes: r.notes,
        createdAt: r.created_at, updatedAt: r.updated_at,
      }));
    },

    async getApplication(id: string): Promise<ApplicationDetail | null> {
      const res = await q(
        `select a.*, c.id c_id, c.full_name c_name
         from public.applications a
         left join public.profiles c on c.id = a.assigned_consultant_id
         where a.id = $1`,
        [id],
      );
      if (res.rowCount === 0) return null;
      const r = res.rows[0];
      const docs = await this.listDocuments(id);
      return {
        id: r.id, leadId: r.lead_id, universityId: r.university_id, programId: r.program_id,
        status: r.status, assignedConsultantId: r.assigned_consultant_id, notes: r.notes,
        createdAt: r.created_at, updatedAt: r.updated_at,
        consultant: r.c_id ? { id: r.c_id, fullName: r.c_name } : null,
        documents: docs,
      };
    },

    async updateApplicationStatus(id: string, status: ApplicationStatus, actorId: string): Promise<Application> {
      const res = await q('update public.applications set status = $1 where id = $2 returning *', [status, id]);
      if (res.rowCount === 0) throw new NotFoundError('application', id);
      await audit({ userId: actorId, action: 'application.update_status', entity: 'application', entityId: id, metadata: { to: status } });
      const r = res.rows[0];
      return {
        id: r.id, leadId: r.lead_id, universityId: r.university_id, programId: r.program_id,
        status: r.status, assignedConsultantId: r.assigned_consultant_id, notes: r.notes,
        createdAt: r.created_at, updatedAt: r.updated_at,
      };
    },

    async listDocuments(applicationId: string): Promise<ApplicationDocument[]> {
      const res = await q('select * from public.application_documents where application_id = $1 order by created_at', [applicationId]);
      return res.rows.map((r) => ({
        id: r.id, applicationId: r.application_id, fileName: r.file_name, fileUrl: r.file_url,
        mimeType: r.mime_type, sizeBytes: r.size_bytes, verified: r.verified,
        uploadedBy: r.uploaded_by, createdAt: r.created_at,
      }));
    },

    async addDocument(input: NewDocumentInput, actorId?: string): Promise<ApplicationDocument> {
      const res = await q(
        `insert into public.application_documents (application_id, file_name, file_url, mime_type, size_bytes, uploaded_by)
         values ($1,$2,$3,$4,$5,$6) returning *`,
        [input.applicationId, input.fileName, input.fileUrl, input.mimeType ?? null,
         input.sizeBytes ?? null, input.uploadedBy ?? actorId ?? null],
      );
      const r = res.rows[0];
      return {
        id: r.id, applicationId: r.application_id, fileName: r.file_name, fileUrl: r.file_url,
        mimeType: r.mime_type, sizeBytes: r.size_bytes, verified: r.verified,
        uploadedBy: r.uploaded_by, createdAt: r.created_at,
      };
    },

    async listStaff(): Promise<Profile[]> {
      const res = await q(`select * from public.profiles where role in ('admin','consultant','editor') order by full_name`);
      return res.rows.map(rowToProfile);
    },

    async getProfile(id: string): Promise<Profile | null> {
      const res = await q('select * from public.profiles where id = $1', [id]);
      return res.rowCount ? rowToProfile(res.rows[0]) : null;
    },

    async listStudents(): Promise<Profile[]> {
      const res = await q(`select * from public.profiles where role = 'student' order by full_name`);
      return res.rows.map(rowToProfile);
    },

    async listMyLeads(userId: string): Promise<LeadWithRelations[]> {
      const res = await q(
        `select l.*, s.id s_id, s.full_name s_name, s.email s_email, s.country_code s_country,
                c.id c_id, c.full_name c_name
         from public.leads l
         join public.profiles s on s.id = l.user_id
         left join public.profiles c on c.id = l.assigned_consultant_id
         where l.user_id = $1
         order by l.created_at desc`,
        [userId],
      );
      return res.rows.map((r) => ({
        ...rowToLead(r),
        student: { id: r.s_id, fullName: r.s_name, email: r.s_email, countryCode: r.s_country },
        consultant: r.c_id ? { id: r.c_id, fullName: r.c_name } : null,
      }));
    },

    async listMyApplications(userId: string): Promise<Application[]> {
      const res = await q(
        `select a.* from public.applications a
         join public.leads l on l.id = a.lead_id
         where l.user_id = $1
         order by a.created_at desc`,
        [userId],
      );
      return res.rows.map((r) => ({
        id: r.id, leadId: r.lead_id, universityId: r.university_id, programId: r.program_id,
        status: r.status, assignedConsultantId: r.assigned_consultant_id, notes: r.notes,
        createdAt: r.created_at, updatedAt: r.updated_at,
      }));
    },

    async listMyDocuments(userId: string): Promise<ApplicationDocument[]> {
      const res = await q(
        `select d.* from public.application_documents d
         join public.applications a on a.id = d.application_id
         join public.leads l on l.id = a.lead_id
         where l.user_id = $1
         order by d.created_at desc`,
        [userId],
      );
      return res.rows.map((r) => ({
        id: r.id, applicationId: r.application_id, fileName: r.file_name, fileUrl: r.file_url,
        mimeType: r.mime_type, sizeBytes: r.size_bytes, verified: r.verified,
        uploadedBy: r.uploaded_by, createdAt: r.created_at,
      }));
    },

    async listMessages(leadId: string): Promise<MessageWithSender[]> {
      const res = await q(
        `select m.*, p.full_name sender_name, p.role sender_role
         from public.messages m
         join public.profiles p on p.id = m.sender_id
         where m.lead_id = $1
         order by m.created_at asc`,
        [leadId],
      );
      return res.rows.map((r) => ({
        id: r.id, leadId: r.lead_id, senderId: r.sender_id, body: r.body,
        createdAt: r.created_at, readAt: r.read_at,
        senderName: r.sender_name, senderRole: r.sender_role,
      }));
    },

    async sendMessage(input: NewMessageInput): Promise<Message> {
      const res = await q(
        `insert into public.messages (lead_id, sender_id, body) values ($1, $2, $3) returning *`,
        [input.leadId, input.senderId, input.body],
      );
      const r = res.rows[0];
      return {
        id: r.id, leadId: r.lead_id, senderId: r.sender_id, body: r.body,
        createdAt: r.created_at, readAt: r.read_at,
      };
    },

    async markThreadRead(leadId: string, readerId: string): Promise<void> {
      await q(
        `update public.messages set read_at = now()
         where lead_id = $1 and sender_id <> $2 and read_at is null`,
        [leadId, readerId],
      );
    },

    async unreadMessageCount(userId: string): Promise<number> {
      const res = await q(
        `select count(*)::int c from public.messages m
         join public.leads l on l.id = m.lead_id
         where l.user_id = $1 and m.sender_id <> $1 and m.read_at is null`,
        [userId],
      );
      return res.rows[0]?.c ?? 0;
    },

    async listNotifications(userId: string, limit = 20): Promise<StudentNotification[]> {
      const [auditRes, msgRes] = await Promise.all([
        q(
          `select a.id, a.action, a.metadata, a.created_at, l.id lead_id
           from public.audit_logs a
           join public.leads l on l.id = a.entity_id
           where l.user_id = $1 and a.entity = 'lead'
             and a.action in ('lead.create', 'lead.update_status', 'lead.assign')
           order by a.created_at desc limit $2`,
          [userId, limit],
        ),
        q(
          `select m.id, m.body, m.created_at, m.lead_id, p.full_name sender_name
           from public.messages m
           join public.leads l on l.id = m.lead_id
           join public.profiles p on p.id = m.sender_id
           where l.user_id = $1 and m.sender_id <> $1 and m.read_at is null
           order by m.created_at desc limit $2`,
          [userId, limit],
        ),
      ]);
      const notes: StudentNotification[] = [
        ...auditRes.rows.map((r): StudentNotification => ({
          id: `audit-${r.id}`,
          type: r.action === 'lead.assign' ? 'assigned' : 'status_change',
          leadId: r.lead_id,
          metadata: r.metadata ?? {},
          createdAt: r.created_at,
          read: false,
        })),
        ...msgRes.rows.map((r): StudentNotification => ({
          id: `msg-${r.id}`,
          type: 'message',
          leadId: r.lead_id,
          metadata: { senderName: r.sender_name, body: r.body },
          createdAt: r.created_at,
          read: false,
        })),
      ];
      return notes.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, limit);
    },

    async addStudentDocument(input: NewDocumentUploadInput): Promise<ApplicationDocument> {
      const res = await q(
        `insert into public.application_documents
           (application_id, file_name, file_url, mime_type, size_bytes, uploaded_by)
         values ($1, $2, $3, $4, $5, $6) returning *`,
        [input.applicationId, input.fileName, input.filePath, input.mimeType, input.sizeBytes, input.uploadedBy],
      );
      const r = res.rows[0];
      await audit({
        userId: input.uploadedBy,
        action: 'document.create',
        entity: 'application',
        entityId: input.applicationId,
      });
      return {
        id: r.id, applicationId: r.application_id, fileName: r.file_name, fileUrl: r.file_url,
        mimeType: r.mime_type, sizeBytes: r.size_bytes, verified: r.verified,
        uploadedBy: r.uploaded_by, createdAt: r.created_at,
      };
    },

    async findOrCreateStudent(input: StudentProfileInput): Promise<Profile> {
      const found = await q('select * from public.profiles where email = $1', [input.email]);
      if (found.rowCount) return rowToProfile(found.rows[0]);
      const res = await q(
        `insert into public.profiles (email, full_name, role, phone, whatsapp, country_code)
         values ($1, $2, 'student', $3, $4, $5) returning *`,
        [input.email, input.fullName, input.phone ?? null, input.whatsapp ?? null, input.countryCode ?? null],
      );
      return rowToProfile(res.rows[0]);
    },

    async countByStatus(): Promise<Record<string, number>> {
      const res = await q('select status, count(*)::int c from public.leads group by status');
      const out: Record<string, number> = {};
      for (const r of res.rows) out[r.status] = r.c;
      return out;
    },

    async writeAudit(entry: AuditEntryInput): Promise<void> {
      await audit(entry);
    },

    async listAudit(filter: AuditFilter = {}): Promise<AuditLog[]> {
      const where: string[] = [];
      const params: unknown[] = [];
      if (filter.entity) { params.push(filter.entity); where.push(`a.entity = $${params.length}`); }
      if (filter.entityId) { params.push(filter.entityId); where.push(`a.entity_id = $${params.length}`); }
      if (filter.userId) { params.push(filter.userId); where.push(`a.user_id = $${params.length}`); }
      const limit = filter.limit ?? 100;
      params.push(limit);
      const res = await q(
        `select a.*, p.full_name actor_name
         from public.audit_logs a
         left join public.profiles p on p.id = a.user_id
         ${where.length ? `where ${where.join(' and ')}` : ''}
         order by a.created_at desc
         limit $${params.length}`,
        params,
      );
      return res.rows.map((r) => ({
        id: r.id, userId: r.user_id, action: r.action, entity: r.entity,
        entityId: r.entity_id, metadata: r.metadata ?? {}, createdAt: r.created_at,
        actorName: r.actor_name,
      }));
    },
  };
}
