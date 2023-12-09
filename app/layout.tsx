import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout';
import { SignInModal, SignUpModal } from '@/components/modal';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe App',
  description: 'You can find recipes here.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <Header />
        <div className='pt-24'>{children}</div>

        <SignInModal />
        <SignUpModal />
      </body>
    </html>
  );
}
