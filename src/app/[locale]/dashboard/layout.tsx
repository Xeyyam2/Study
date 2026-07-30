import { requireStudent } from '@/lib/crm/student-session';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { StudentTopbar } from '@/components/student/StudentTopbar';
import type { AppLocale } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await requireStudent(locale as AppLocale);
  return (
    <div className="flex min-h-screen">
      <StudentSidebar locale={locale} />
      <div className="flex min-w-0 flex-1 flex-col">
        <StudentTopbar session={session} locale={locale} />
        <main id="main" className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
