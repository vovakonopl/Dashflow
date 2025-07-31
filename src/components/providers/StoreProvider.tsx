'use client';

import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

type TStoreProviderProps = {
  children: ReactNode;
};

const StoreProvider: FC<TStoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
