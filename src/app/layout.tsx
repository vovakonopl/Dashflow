import type { Metadata } from 'next';
import { Inter, Archivo } from 'next/font/google';
import { ReactNode } from 'react';
import ThemeSwitcherDevTool from '@/components/dev/ThemeSwitcherDevTool';
import SideNavbar from '@/components/layout/sidebar';
import Providers from '@/components/providers/Providers';
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <SideNavbar />
          <main>{children}</main>
          <ThemeSwitcherDevTool />
        </Providers>
      </body>
    </html>
  );
}
