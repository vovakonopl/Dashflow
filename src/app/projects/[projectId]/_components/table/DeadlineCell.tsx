'use client'; // required to display the date for user's timezone

import { TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils/cn';

const dateOptions = {
  year: 'numeric' as const,
  month: '2-digit' as const,
  day: '2-digit' as const,
};

type TDeadlineCellProps = {
  date: Date;
  isCompleted: boolean;
};

const DeadlineCell = ({ date, isCompleted }: TDeadlineCellProps) => {
  const currentDate = new Date();
  const isOverdue: boolean = !isCompleted && currentDate > date;

  const formattedDate = date
    .toLocaleDateString(undefined, dateOptions)
    .replace(/\//g, '-');

  return (
    <TableCell
      className={cn('whitespace-normal', isOverdue && 'text-destructive')}
    >
      {formattedDate}
      {isOverdue && <span className="ml-1">(Overdue)</span>}
    </TableCell>
  );
};

export default DeadlineCell;
