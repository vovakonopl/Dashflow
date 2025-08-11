import type { Metadata } from 'next';
import { Inter, Archivo } from 'next/font/google';
import { ReactNode } from 'react';
import ThemeSwitcherDevTool from '@/components/dev/ThemeSwitcherDevTool';
import Footer from '@/components/layout/Footer';
import SideNavbar from '@/components/layout/sidebar';
import Providers from '@/components/providers/Providers';
import './globals.css';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
});

const archivo = Archivo({
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
      <body
        className={`${inter.variable} ${archivo.variable} font-inter min-h-dvh`}
      >
        <Providers>
          <div className="flex max-md:flex-col">
            <SideNavbar />

            <div className="flex flex-1 flex-col">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>

            <ThemeSwitcherDevTool />
          </div>
        </Providers>
      </body>
    </html>
  );
}
