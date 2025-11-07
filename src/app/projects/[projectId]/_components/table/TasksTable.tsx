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
  return (
    <ScrollArea className="w-1 flex-1 pb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Priority</TableHead>
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
          <TableCaption className="text-base italic">No tasks yet</TableCaption>
        )}
      </Table>

      <ScrollBar orientation="horizontal" className="w-full" />
    </ScrollArea>
  );
};

export default TasksTable;
