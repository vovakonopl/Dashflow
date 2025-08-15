import { ClassValue } from 'clsx';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/cn';

type TButtonSkeletonProps = { textLineClassName?: ClassValue };

const ButtonSkeleton = ({ textLineClassName }: TButtonSkeletonProps) => {
  return (
    <div className="gap flex h-8 w-full items-center gap-2 px-2">
      <Skeleton className="bg-muted-foreground/40 dark:bg-muted-foreground/20 size-4 rounded" />
      <Skeleton
        className={cn(
          'bg-muted-foreground/40 dark:bg-muted-foreground/20 h-[0.875rem] w-full rounded-md',
          textLineClassName,
        )}
      />
    </div>
  );
};

export default ButtonSkeleton;
