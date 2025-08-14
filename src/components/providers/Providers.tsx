'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import StoreProvider from '@/components/providers/StoreProvider';
import UserFetcher from '@/components/providers/UserFetcher';

type TProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: TProvidersProps) => {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class">{children}</ThemeProvider>

      {/* fetch the user data when the store inits */}
      <UserFetcher />
    </StoreProvider>
  );
};

export default Providers;
