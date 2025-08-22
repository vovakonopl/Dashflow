import { TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils/cn';

type TStatusCellProps = {
  isCompleted: boolean;
};

const StatusCell = ({ isCompleted }: TStatusCellProps) => {
  return (
    <TableCell>
      <span
        className={cn(
          'rounded-full px-2 py-1 font-semibold',
          isCompleted
            ? 'bg-emerald-500/15 text-emerald-500'
            : 'bg-amber-500/15 text-amber-500',
        )}
      >
        {isCompleted ? 'Completed' : 'In Progress'}
      </span>
    </TableCell>
  );
};

export default StatusCell;
