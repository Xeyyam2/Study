import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EmailOtpForm } from '@/components/auth/EmailOtpForm';
import { Button } from '@/components/ui/button';
import { crm } from '@/lib/crm';
import { isDevAuthEnabled } from '@/lib/crm/student-session';

export const dynamic = 'force-dynamic';

export default async function StudentLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Student.login' });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const callbackUrl = `${base}/auth/callback?next=/${locale}/dashboard`;
  const isDev = isDevAuthEnabled();

  let demoStudents: Awaited<ReturnType<typeof crm.listStudents>> = [];
  if (isDev) demoStudents = await crm.listStudents();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <EmailOtpForm redirectTo={callbackUrl} />
          {isDev && demoStudents.length > 0 && (
            <div className="space-y-2 border-t border-border pt-4">
              <p className="text-xs uppercase text-muted-foreground">Dev login</p>
              {demoStudents.map((s) => (
                <form key={s.id} action={devLoginAction} className="block">
                  <input type="hidden" name="profileId" value={s.id} />
                  <input type="hidden" name="locale" value={locale} />
                  <Button type="submit" variant="outline" size="sm" className="w-full justify-between">
                    <span>{s.fullName}</span>
                    <span className="text-xs text-muted-foreground">{s.email}</span>
                  </Button>
                </form>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

async function devLoginAction(formData: FormData) {
  'use server';
  const { devStudentLogin } = await import('@/app/actions/student-auth');
  await devStudentLogin({
    profileId: String(formData.get('profileId')),
    locale: String(formData.get('locale')),
  });
}
