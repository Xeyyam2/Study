import { getTranslations } from 'next-intl/server';
import { crm } from '@/lib/crm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function StudentLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Student.login' });
  const students = await crm.listStudents();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {students.map((s) => (
            <form key={s.id} action={loginAction} className="block">
              <input type="hidden" name="profileId" value={s.id} />
              <input type="hidden" name="locale" value={locale} />
              <Button type="submit" variant="outline" className="w-full justify-between">
                <span>{s.fullName}</span>
                <span className="text-xs text-muted-foreground">{s.email}</span>
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

async function loginAction(formData: FormData) {
  'use server';
  const { devStudentLogin } = await import('@/app/actions/student-auth');
  await devStudentLogin({
    profileId: String(formData.get('profileId')),
    locale: String(formData.get('locale')),
  });
}
