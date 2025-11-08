import TaskPriorityBadge from '@/components/shared/TaskPriorityBadge';
import { TableCell } from '@/components/ui/table';
import { TTaskPriority } from '@/lib/types/tables/task';

type TPriorityCellProps = {
  priority: TTaskPriority;
};

const PriorityCell = ({ priority }: TPriorityCellProps) => {
  return (
    <TableCell className="text-right">
      <TaskPriorityBadge priority={priority} />
    </TableCell>
  );
};

export default PriorityCell;
