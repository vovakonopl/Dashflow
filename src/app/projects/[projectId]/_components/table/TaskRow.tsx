import DeadlineCell from '@/app/projects/[projectId]/_components/table/DeadlineCell';
import PriorityCell from '@/app/projects/[projectId]/_components/table/PriorityCell';
import StatusCell from '@/app/projects/[projectId]/_components/table/StatusCell';
import { TableCell, TableRow } from '@/components/ui/table';
import { TTask } from '@/lib/types/task';

type TTaskRowProps = {
  task: TTask;
};

const TaskRow = ({ task }: TTaskRowProps) => {
  return (
    <TableRow>
      <TableCell className="break-all whitespace-normal">
        {task.title}
      </TableCell>
      <StatusCell isCompleted={task.completed} />
      <DeadlineCell date={task.deadline} isCompleted={task.completed} />
      <PriorityCell priority={task.priority} />
    </TableRow>
  );
};

export default TaskRow;
