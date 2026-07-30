// src/components/admin/AdminTopbar.tsx
import { devLogout } from '@/app/actions/admin-auth';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import type { AdminSession } from '@/lib/crm/session';

export function AdminTopbar({ session }: { session: AdminSession }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
      <p className="font-display text-sm font-semibold text-foreground">
        {siteConfig.name} Admin
      </p>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{session.fullName}</span>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold uppercase text-secondary-foreground">
          {session.role}
        </span>
        <form action={devLogout}>
          <Button type="submit" variant="ghost" size="sm">
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}
