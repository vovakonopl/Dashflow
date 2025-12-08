import { useTranslations } from 'next-intl';
import { TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils/cn';

type TStatusCellProps = {
  isCompleted: boolean;
};

const StatusCell = ({ isCompleted }: TStatusCellProps) => {
  const t = useTranslations('projects.project.tasks.table.status');

  return (
    <TableCell>
      <span
        className={cn(
          'rounded-full px-2 py-1 font-semibold capitalize',
          isCompleted
            ? 'bg-emerald-500/15 text-emerald-500'
            : 'bg-amber-500/15 text-amber-500',
        )}
      >
        {t(isCompleted ? 'completed' : 'inProgress')}
      </span>
    </TableCell>
  );
};

export default StatusCell;
