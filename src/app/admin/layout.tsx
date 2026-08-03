// src/app/admin/layout.tsx
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/en.json';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background font-sans antialiased">
        <NextIntlClientProvider locale="en" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
