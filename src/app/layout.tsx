import type { Metadata } from 'next';
import { Inter, Archivo } from 'next/font/google';
import { ReactNode } from 'react';
import StoreProvider from '@/components/providers/StoreProvider';
import './globals.css';

const geistSans = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
});

const geistMono = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  title: 'Dashflow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="size-96"></div>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
