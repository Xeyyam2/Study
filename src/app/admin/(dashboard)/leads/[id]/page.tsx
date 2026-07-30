// src/app/admin/(dashboard)/leads/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { crm } from '@/lib/crm';
import { APPLICATION_STATUS_LABELS } from '@/types/crm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadStatusBadge } from '@/components/admin/LeadStatusBadge';
import { PipelineStepper } from '@/components/admin/PipelineStepper';
import { LeadActions } from '@/components/admin/AssignConsultant';

export const dynamic = 'force-dynamic';

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [lead, consultants] = await Promise.all([crm.getLead(id), crm.listStaff()]);
  if (!lead) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/leads" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to leads
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-headline-lg text-foreground">
            {lead.student?.fullName ?? 'Unknown'}
          </h1>
          <LeadStatusBadge status={lead.status} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {lead.student?.email} · {lead.student?.countryCode ?? '—'}
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Pipeline</CardTitle></CardHeader>
        <CardContent>
          <PipelineStepper current={lead.status} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Applications</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {lead.applications.length === 0 ? (
                <p className="text-sm text-muted-foreground">No applications yet.</p>
              ) : (
                lead.applications.map((app) => (
                  <Link
                    key={app.id}
                    href={`/admin/applications/${app.id}`}
                    className="flex items-center justify-between rounded border border-border p-3 hover:bg-accent"
                  >
                    <span className="text-sm font-medium">{app.universityId}</span>
                    <span className="text-xs text-muted-foreground">
                      {APPLICATION_STATUS_LABELS[app.status]}
                    </span>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
            <CardContent>
              {lead.timeline.length === 0 ? (
                <p className="text-sm text-muted-foreground">No events.</p>
              ) : (
                <ul className="space-y-3">
                  {lead.timeline.map((a) => (
                    <li key={a.id} className="flex justify-between text-sm">
                      <span>
                        <span className="font-medium">{a.actorName ?? 'System'}</span>{' '}
                        <span className="text-muted-foreground">{a.action}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(a.createdAt).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
          <CardContent>
            <LeadActions
              leadId={lead.id}
              status={lead.status}
              consultants={consultants.filter((c) => c.role === 'consultant')}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
