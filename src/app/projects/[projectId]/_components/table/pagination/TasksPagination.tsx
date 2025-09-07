'use client';

import { usePagination } from '@/app/projects/[projectId]/_components/table/pagination/pagination-context';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { TASKS_PER_PAGE } from '@/lib/constants/tasks-per-page';

// Returns array of numbers which are pages that should be displayed
function createDisplayedPagesArray(page: number, pagesCount: number): number[] {
  if (pagesCount <= 2) {
    return new Array(pagesCount).fill(1).map((_, idx) => idx + 1);
  }

  if (page === 1) return [1, 2, 3]; // The first page is active
  if (page === pagesCount) return [page - 2, page - 1, page]; // The last page is active
  return [page - 1, page, page + 1];
}

type TTasksPaginationProps = {
  tasksCount: number;
};

const TasksPagination = ({ tasksCount }: TTasksPaginationProps) => {
  const { page, setPage } = usePagination();
  const pagesCount = Math.ceil(tasksCount / TASKS_PER_PAGE);

  if (pagesCount <= 1) return null; // hide pagination if it is not required

  const handlePrev = () => {
    if (page <= 1) return;
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page >= pagesCount) return;
    setPage((prev) => prev + 1);
  };

  const handleClick = (newPage: number) => {
    if (newPage < 1 || newPage > pagesCount) return;
    setPage(newPage);
  };

  const pagesArray: number[] = createDisplayedPagesArray(page, pagesCount);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="disabled:select-none"
            disabled={page === 1}
            onClick={handlePrev}
          />
        </PaginationItem>

        {pagesCount > 3 && pagesArray[0] !== 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pagesArray.map((val) => (
          <PaginationItem key={val}>
            <PaginationButton
              className="size-9"
              isActive={val === page}
              onClick={() => handleClick(val)}
            >
              {val}
            </PaginationButton>
          </PaginationItem>
        ))}

        {pagesCount > 3 && pagesArray[2] !== pagesCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className="disabled:select-none"
            disabled={page === pagesCount}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TasksPagination;
