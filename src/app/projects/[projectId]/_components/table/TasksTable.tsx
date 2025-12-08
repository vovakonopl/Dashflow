import { useTranslations } from 'next-intl';
import BreakRowsOnPages from '@/app/projects/[projectId]/_components/table/pagination/BreakRowsOnPages';
import TaskRow from '@/app/projects/[projectId]/_components/table/TaskRow';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TTask } from '@/lib/types/tables/task';

type TTasksTableProps = {
  tasks: TTask[];
};

const TasksTable = ({ tasks }: TTasksTableProps) => {
  const t = useTranslations('projects.project.tasks.table');

  return (
    <ScrollArea className="w-1 flex-1 pb-4">
      <Table>
        <TableHeader>
          <TableRow className="capitalize">
            <TableHead>{t('head.name')}</TableHead>
            <TableHead>{t('head.status')}</TableHead>
            <TableHead>{t('head.dueDate')}</TableHead>
            <TableHead className="text-right">{t('head.priority')}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-muted-foreground">
          <BreakRowsOnPages>
            {tasks.map((task) => (
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
