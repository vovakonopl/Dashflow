'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import BreakRowsOnPages from '@/app/projects/[projectId]/_components/table/pagination/BreakRowsOnPages';
import {
  TSortBy,
  useTableState,
} from '@/app/projects/[projectId]/_components/table/TableStateContext';
import TaskRow from '@/app/projects/[projectId]/_components/table/TaskRow';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TTaskWithMemberIds } from '@/lib/types/tables/task';

// Priority order for sorting
const PRIORITY_ORDER: Record<string, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

type TTasksTableProps = {
  tasks: TTaskWithMemberIds[];
};

const TasksTable = ({ tasks }: TTasksTableProps) => {
  const t = useTranslations('projects.project.tasks.table');
  const { sortBy, sortOrder, setSortOrder } = useTableState();

  // Sort tasks based on current sort state
  const sortedTasks = useMemo(() => {
    const sorted = tasks.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;

        case 'status':
          // null completedAt = in progress (comes first in asc)
          const aCompleted = a.completedAt ? 1 : 0;
          const bCompleted = b.completedAt ? 1 : 0;
          comparison = aCompleted - bCompleted;
          break;

        case 'dueDate':
          comparison =
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
          break;

        case 'priority':
          comparison =
            (PRIORITY_ORDER[a.priority] || 0) -
            (PRIORITY_ORDER[b.priority] || 0);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return [...sorted];
  }, [tasks, sortBy, sortOrder]);

  // Sortable header component
  const SortableHeader = ({
    column,
    children,
    className,
  }: {
    column: TSortBy;
    children: React.ReactNode;
    className?: string;
  }) => {
    const isActive = sortBy === column;

    return (
      <TableHead className={className}>
        <Button
          variant="ghost"
          onClick={() => setSortOrder(column)}
          className="-ml-3 h-8 gap-1 px-3 font-medium hover:bg-transparent"
        >
          {children}
          {isActive &&
            (sortOrder === 'asc' ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            ))}
        </Button>
      </TableHead>
    );
  };

  return (
    <ScrollArea className="w-1 flex-1 pb-4">
      <Table>
        <TableHeader>
          <TableRow className="capitalize">
            <SortableHeader column="name">{t('head.name')}</SortableHeader>
            <SortableHeader column="status">{t('head.status')}</SortableHeader>
            <SortableHeader column="dueDate">
              {t('head.dueDate')}
            </SortableHeader>
            <SortableHeader column="priority" className="text-right">
              {t('head.priority')}
            </SortableHeader>
          </TableRow>
        </TableHeader>

        <TableBody className="text-muted-foreground">
          <BreakRowsOnPages>
            {sortedTasks.map((task) => (
              <TaskRow task={task} key={task.id} />
            ))}
          </BreakRowsOnPages>
        </TableBody>

        {tasks.length === 0 && (
          <TableCaption className="text-base italic">
            {t('caption')}
          </TableCaption>
        )}
      </Table>

      <ScrollBar orientation="horizontal" className="w-full" />
    </ScrollArea>
  );
};

export default TasksTable;
