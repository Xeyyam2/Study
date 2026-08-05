// src/components/admin/AdminSidebar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, ScrollText, GraduationCap, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'admin_seen_applications_count';

const NAV = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/applications', label: 'Müraciətlər / Applications', icon: FileText },
  { href: '/admin/leads', label: 'Leads (CRM)', icon: GraduationCap },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/audit', label: 'Audit Log', icon: ScrollText },
];

export function AdminSidebar({ newApplicationsCount = 0 }: { newApplicationsCount?: number }) {
  const pathname = usePathname();
  const [seenCount, setSeenCount] = useState<number | null>(null);
  const onApplicationsPage = pathname === '/admin/applications' || pathname.startsWith('/admin/applications');

  useEffect(() => {
    const stored = Number(localStorage.getItem(STORAGE_KEY) ?? '0');
    setSeenCount(stored);
    if (onApplicationsPage) {
      localStorage.setItem(STORAGE_KEY, String(newApplicationsCount));
      setSeenCount(newApplicationsCount);
    }
  }, [onApplicationsPage, newApplicationsCount]);

  const unread = seenCount !== null ? Math.max(0, newApplicationsCount - seenCount) : newApplicationsCount;

  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-card lg:block">
      <nav className="flex flex-col gap-1 p-4">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === '/admin' ? pathname === href : pathname.startsWith(href);
          const badge = href === '/admin/applications' && unread > 0 ? unread : 0;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge > 0 && (
                <span
                  className={cn(
                    'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold tabular-nums',
                    active
                      ? 'bg-primary-foreground text-primary'
                      : 'bg-primary text-primary-foreground',
                  )}
                >
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
