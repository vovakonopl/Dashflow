'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type TPaginationContext = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const PaginationContext = createContext<TPaginationContext | undefined>(
  undefined,
);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(1);

  return (
    <PaginationContext.Provider value={{ page, setPage }}>
      {children}
    </PaginationContext.Provider>
  );
};

export function usePagination() {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }

  return context;
}
