import { TableCell } from '@/components/ui/table';
import { TTaskPriority } from '@/lib/types/task';
import { cn } from '@/lib/utils/cn';

type TPriorityCellProps = {
  priority: TTaskPriority;
};

const PriorityCell = ({ priority }: TPriorityCellProps) => {
  let priorityClassName: string = '';

  switch (priority) {
    case 'low':
      priorityClassName = 'bg-blue-400/15 text-blue-500 dark:text-indigo-400';
      break;

    case 'medium':
      priorityClassName =
        'bg-yellow-300/20 text-orange-400 dark:bg-amber-500/15';
      break;

    case 'high':
      priorityClassName = 'bg-rose-400/20 text-rose-500 dark:bg-rose-400/15';
      break;

    case 'critical':
      priorityClassName = 'bg-rose-600 text-white dark:bg-rose-700';
      break;
  }

  return (
    <TableCell className="text-right">
      <span
        className={cn(
          'rounded-full px-2 py-1 font-semibold capitalize',
          priorityClassName,
        )}
      >
        {priority}
      </span>
    </TableCell>
  );
};

export default PriorityCell;
