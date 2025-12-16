'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';

export type TSortBy = 'name' | 'status' | 'dueDate' | 'priority';
export type TSortOrder = 'asc' | 'desc';

type TTableStateContext = {
  page: number;
  sortBy: TSortBy;
  sortOrder: TSortOrder;
  setPage: (page: number) => void;
  setSortBy: (sortBy: TSortBy, sortOrder: TSortOrder) => void;
  setSortOrder: (column: TSortBy) => void;
};

const TableStateContext = createContext<TTableStateContext | undefined>(
  undefined,
);

export const TableStateProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || 1;
  const sortBy = (searchParams.get('sort') as TSortBy) || 'name';
  const sortOrder = (searchParams.get('order') as TSortOrder) || 'asc';

  const updateURL = useCallback(
    (params: { page?: number; sort?: TSortBy; order?: TSortOrder }) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (params.page !== undefined) {
        newParams.set('page', params.page.toString());
      }

      if (params.sort !== undefined) {
        newParams.set('sort', params.sort);
      }

      if (params.order !== undefined) {
        newParams.set('order', params.order);
      }

      const queryString = newParams.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, pathname, router],
  );

  const setPage = useCallback(
    (newPage: number) => {
      updateURL({ page: newPage });
    },
    [updateURL],
  );

  const setSortBy = useCallback(
    (newSortBy: TSortBy, newSortOrder: TSortOrder) => {
      updateURL({ sort: newSortBy, order: newSortOrder, page: 1 });
    },
    [updateURL],
  );

  const setSortOrder = useCallback(
    (column: TSortBy) => {
      if (sortBy === column) {
        // Toggle order if clicking same column
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        updateURL({ order: newOrder });
      } else {
        // New column, default to ascending
        updateURL({ sort: column, order: 'asc', page: 1 });
      }
    },
    [sortBy, sortOrder, updateURL],
  );

  const value = useMemo(
    () => ({
      page,
      sortBy,
      sortOrder,
      setPage,
      setSortBy,
      setSortOrder,
    }),
    [page, sortBy, sortOrder, setPage, setSortBy, setSortOrder],
  );

  return (
    <TableStateContext.Provider value={value}>
      {children}
    </TableStateContext.Provider>
  );
};

export function useTableState() {
  const context = useContext(TableStateContext);
  if (!context) {
    throw new Error('useTableState must be used within a TableStateProvider');
  }
  return context;
}
