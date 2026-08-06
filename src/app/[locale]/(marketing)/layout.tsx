import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/layout/whatsapp-float';
import { ChatWidget } from '@/components/layout/chat-widget';
import { isGeoLocale } from '@/lib/seo/geo';
import { getStudentSessionForLayout } from '@/lib/student-session-server';

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const showChat = isGeoLocale(locale);
  const session = await getStudentSessionForLayout();

  return (
    <>
      <Header session={session} />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFloat />
      {/* AI chatbot — only in 4 GEO locales (en/tr/az/ru) */}
      {showChat && <ChatWidget />}
    </>
  );
}
