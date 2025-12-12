'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TaskFilters() {
  const t = useTranslations('tasksPage.filters');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentFilter = searchParams.get('filter') || 'all';
  const currentSort = searchParams.get('sortBy') || 'name';
  const currentOrder = searchParams.get('sortOrder') || 'asc';

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    // Reset page on filter/sort change
    params.set('page', '1');

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <Card className="flex gap-4 px-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="filter"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {t('filter.label')}
          </label>
          <Select
            value={currentFilter}
            onValueChange={(value) => updateParam('filter', value)}
            disabled={isPending}
          >
            <SelectTrigger className="w-[11.25rem]">
              <SelectValue placeholder={t('filter.label')} />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="all">{t('filter.all')}</SelectItem>
              <SelectItem value="incomplete">
                {t('filter.incomplete')}
              </SelectItem>
              <SelectItem value="overdue">{t('filter.overdue')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {t('sort.label')}
          </label>
          <div className="flex gap-2">
            <Select
              value={currentSort}
              onValueChange={(value) => updateParam('sortBy', value)}
              disabled={isPending}
            >
              <SelectTrigger className="w-[11.25rem]">
                <SelectValue placeholder={t('sort.label')} />
              </SelectTrigger>
              <SelectContent className="dark:bg-card">
                <SelectItem value="name">{t('sort.name')}</SelectItem>
                <SelectItem value="dueDate">{t('sort.dueDate')}</SelectItem>
                <SelectItem value="priority">{t('sort.priority')}</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="size-9"
              onClick={() =>
                updateParam(
                  'sortOrder',
                  currentOrder === 'asc' ? 'desc' : 'asc',
                )
              }
              disabled={isPending}
              title={currentOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {currentOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
