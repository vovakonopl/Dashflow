'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

interface TaskPaginationProps {
  totalPages: number;
}

export default function TaskPagination({ totalPages }: TaskPaginationProps) {
  const t = useTranslations('tasksPage.pagination');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  function setPage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center gap-4">
      <Button
        variant="outline"
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {t('previous')}
      </Button>
      <span className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
        {currentPage} / {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        {t('next')}
      </Button>
    </div>
  );
}
