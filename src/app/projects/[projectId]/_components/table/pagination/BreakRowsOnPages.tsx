'use client';

import { Children, ReactNode, useEffect } from 'react';
import { TASKS_PER_PAGE } from '@/lib/constants/tasks-per-page';
import { useTableState } from '../TableStateContext';

type TBreakRowsOnPagesProps = {
  children: ReactNode;
};

const BreakRowsOnPages = ({ children }: TBreakRowsOnPagesProps) => {
  const { page, setPage } = useTableState();

  // check for bounds
  useEffect(() => {
    const pagesCount = Math.ceil(Children.count(children) / TASKS_PER_PAGE);
    if (pagesCount === 0) return;

    if (page > pagesCount) {
      setPage(pagesCount);
      return;
    }

    if (page <= 0) {
      setPage(1);
    }
  }, [children, page, setPage]);

  const startIdx = (page - 1) * TASKS_PER_PAGE;
  return Children.toArray(children).slice(startIdx, startIdx + TASKS_PER_PAGE);
};

export default BreakRowsOnPages;
