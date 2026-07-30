// src/components/admin/LeadStatusBadge.tsx
import { Badge } from '@/components/ui/badge';
import { LEAD_STATUS_LABELS, type LeadStatus } from '@/types/crm';

const TONE: Record<LeadStatus, 'default' | 'secondary' | 'tertiary' | 'cta' | 'verified' | 'destructive' | 'outline'> = {
  new: 'tertiary',
  contacted: 'secondary',
  document_collection: 'secondary',
  application_submitted: 'default',
  offer_received: 'verified',
  accepted: 'verified',
  visa_processing: 'cta',
  arrived: 'cta',
  completed: 'default',
  lost: 'destructive',
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <Badge variant={TONE[status]}>{LEAD_STATUS_LABELS[status]}</Badge>;
}
