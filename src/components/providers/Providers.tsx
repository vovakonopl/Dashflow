'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import StoreProvider from '@/components/providers/StoreProvider';

type TProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: TProvidersProps) => {
  return (
    <StoreProvider>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </StoreProvider>
  );
};

export default Providers;
