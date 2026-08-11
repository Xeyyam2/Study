import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingChatButtons } from '@/components/layout/whatsapp-float';
import { FloatingApplyButton } from '@/components/layout/FloatingApplyButton';
// F3: Lazy-load ChatWidget — it's a heavy client component (OpenAI API,
// message state) only used in 4 GEO locales. Don't ship it in every page bundle.
import dynamic from 'next/dynamic';
const ChatWidget = dynamic(() => import('@/components/layout/chat-widget').then((m) => m.ChatWidget), {
  ssr: false,
});
import { isGeoLocale } from '@/lib/seo/geo';

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const showChat = isGeoLocale(locale);

  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingApplyButton />
      <FloatingChatButtons />
      {/* AI chatbot — only in 4 GEO locales (en/tr/az/ru) */}
      {showChat && <ChatWidget />}
    </>
  );
}
