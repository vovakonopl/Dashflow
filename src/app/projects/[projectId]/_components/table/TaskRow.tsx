import DeadlineCell from '@/app/projects/[projectId]/_components/table/DeadlineCell';
import PriorityCell from '@/app/projects/[projectId]/_components/table/PriorityCell';
import StatusCell from '@/app/projects/[projectId]/_components/table/StatusCell';
import { TableCell, TableRow } from '@/components/ui/table';
import { TTask } from '@/lib/types/tables/task';

type TTaskRowProps = {
  task: TTask;
};

const TaskRow = ({ task }: TTaskRowProps) => {
  const isCompleted = !!task.completedAt;
  return (
    <TableRow>
      <TableCell className="break-all whitespace-normal">
        {task.title}
      </TableCell>
      <StatusCell isCompleted={isCompleted} />
      <DeadlineCell date={task.deadline} isCompleted={isCompleted} />
      <PriorityCell priority={task.priority} />
    </TableRow>
  );
};

export default TaskRow;
