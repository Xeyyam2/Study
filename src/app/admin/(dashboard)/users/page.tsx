// src/app/admin/(dashboard)/users/page.tsx
import { crm } from '@/lib/crm';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const staff = await crm.listStaff();
  const leads = await crm.listLeads();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-headline-lg text-foreground">Users</h1>
        <p className="text-sm text-muted-foreground">Staff & consultants</p>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Active leads</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((p) => {
              const active = leads.filter(
                (l) => l.assignedConsultantId === p.id && l.status !== 'completed',
              ).length;
              return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">{p.email}</TableCell>
                  <TableCell><Badge variant={p.role === 'admin' ? 'default' : 'secondary'}>{p.role}</Badge></TableCell>
                  <TableCell className="tabular-nums">{active}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
