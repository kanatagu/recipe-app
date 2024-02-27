import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { Header } from '@/components/layout';
import { SignInModal, SignUpModal } from '@/components/modal';
import { Toaster } from '@/components/ui/toaster';

import { getCurrentUser } from '@/lib/service';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe App',
  description: 'You can find home recipes here.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <body className={font.className}>
        <Header currentUser={currentUser} />
        <div className='pt-4'>{children}</div>

        <SignInModal />
        <SignUpModal />
        <Toaster />

        <Analytics />
      </body>
    </html>
  );
}
