'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';

type TStoreProviderProps = {
  children: ReactNode;
};

const StoreProvider = ({ children }: TStoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
