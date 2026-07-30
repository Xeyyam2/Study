// src/app/admin/login/page.tsx
import { crm } from '@/lib/crm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Allow this page to render without the locale layout's chrome interfering.
export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const staff = await crm.listStaff();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin (dev login)</CardTitle>
          <CardDescription>
            Demo only. Pick a staff profile to continue. Real auth arrives with Supabase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {staff.map((p) => (
            <form key={p.id} action={devLoginAction} className="block">
              <input type="hidden" name="profileId" value={p.id} />
              <Button type="submit" variant="outline" className="w-full justify-between">
                <span>{p.fullName}</span>
                <span className="text-xs uppercase text-muted-foreground">{p.role}</span>
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Server action wrapper (can't import 'use server' action into a server component inline).
async function devLoginAction(formData: FormData) {
  'use server';
  const { devLogin } = await import('@/app/actions/admin-auth');
  await devLogin({ profileId: String(formData.get('profileId')) });
}
