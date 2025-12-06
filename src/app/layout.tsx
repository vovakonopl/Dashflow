import type { Metadata } from 'next';
import { Inter, Archivo } from 'next/font/google';
import { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import SettingsDialog from '@/components/layout/SettingsDialog';
import SideNavbar from '@/components/layout/sidebar';
import Providers from '@/components/providers/Providers';
import { Toaster } from '@/components/ui/sonner';
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

const toastDuration = 6000; // 6 seconds

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${archivo.variable} font-inter`}>
        <Providers>
          <div className="flex min-h-dvh max-md:flex-col">
            <SideNavbar />

            <div className="flex flex-1 flex-col">
              <Toaster position="top-center" duration={toastDuration} />
              <main className="grid flex-1">{children}</main>
              <Footer />
            </div>

            {/*<ThemeSwitcherDevTool />*/}
          </div>

          <SettingsDialog />
        </Providers>
      </body>
    </html>
  );
}
