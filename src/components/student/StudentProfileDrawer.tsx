'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { type LucideIcon } from 'lucide-react';
import { Bell, ExternalLink, FileText, GraduationCap, LogOut, MessageSquare, User, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { signOutStudent } from '@/app/actions/student-auth';
import { signOutAdmin } from '@/app/actions/admin-auth';
import { cn } from '@/lib/utils';
import type { Profile } from '@/types/crm';

type DrawerTab =
  | 'applications'
  | 'documents'
  | 'messages'
  | 'notifications'
  | 'profile'
  | 'signout';

export interface StudentProfileDrawerProps {
  session: { userId: string; profile: Profile };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentProfileDrawer({ session, open, onOpenChange }: StudentProfileDrawerProps) {
  const t = useTranslations('Student');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<DrawerTab>('applications');

  const tabs: { id: DrawerTab; icon: LucideIcon; label: string }[] = [
    { id: 'applications', icon: GraduationCap, label: t('nav.applications') },
    { id: 'documents', icon: FileText, label: t('nav.documents') },
    { id: 'messages', icon: MessageSquare, label: t('nav.messages') },
    { id: 'notifications', icon: Bell, label: t('nav.notifications') },
    { id: 'profile', icon: User, label: t('nav.profile') },
    { id: 'signout', icon: LogOut, label: t('nav.logout') },
  ];

  const dash = `/${locale}/dashboard`;
  const isAdmin = session.profile.role === 'admin';
  const signOutAction = isAdmin ? signOutAdmin : signOutStudent.bind(null, locale);
  const initial = (session.profile.fullName.trim().charAt(0) || '?').toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-overlay',
            'duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-right',
            'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right',
          )}
        >
          <DialogPrimitive.Title className="sr-only">{t('overview.title')}</DialogPrimitive.Title>

          <div className="flex items-start justify-between gap-4 border-b border-border p-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
                {initial}
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-base font-semibold text-foreground">
                  {session.profile.fullName}
                </p>
                <p className="truncate text-sm text-muted-foreground">{session.profile.email}</p>
              </div>
            </div>
            <DialogPrimitive.Close
              aria-label={tCommon('close')}
              className="rounded p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>

          <div
            role="tablist"
            aria-label={t('overview.title')}
            className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'applications' && (
              <OverviewCard
                icon={GraduationCap}
                title={t('applications.title')}
                href={`${dash}/applications`}
                cta={tCommon('viewDetails')}
              />
            )}
            {activeTab === 'documents' && (
              <OverviewCard
                icon={FileText}
                title={t('documents.title')}
                href={`${dash}/documents`}
                cta={tCommon('viewDetails')}
              />
            )}
            {activeTab === 'messages' && (
              <OverviewCard
                icon={MessageSquare}
                title={t('messages.title')}
                href={`${dash}/messages`}
                cta={tCommon('viewDetails')}
              />
            )}
            {activeTab === 'notifications' && (
              <OverviewCard
                icon={Bell}
                title={t('notifications.title')}
                href={`${dash}/notifications`}
                cta={tCommon('viewDetails')}
              />
            )}

            {activeTab === 'profile' && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 rounded-lg border border-border bg-bg-subtle p-5">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {t('nav.profile')}
                    </h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{t('overview.title')}</dt>
                      <dd className="truncate font-medium text-foreground">
                        {session.profile.fullName}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd className="truncate font-medium text-foreground">
                        {session.profile.email}
                      </dd>
                    </div>
                  </dl>
                </div>
                <Button asChild variant="outline" size="sm" className="self-start">
                  <Link href={dash}>
                    {tCommon('viewDetails')}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            )}

            {activeTab === 'signout' && (
              <div className="flex flex-col gap-4 rounded-lg border border-border bg-bg-subtle p-5">
                <div className="flex items-center gap-2">
                  <LogOut className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {t('nav.logout')}
                  </h3>
                </div>
                <form action={signOutAction}>
                  <Button type="submit" variant="destructive" size="sm" className="w-full">
                    {t('nav.logout')}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

function OverviewCard({
  icon: Icon,
  title,
  href,
  cta,
}: {
  icon: LucideIcon;
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-bg-subtle p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
      </div>
      <Button asChild variant="outline" size="sm" className="self-start">
        <Link href={href}>
          {cta}
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </Button>
    </div>
  );
}
