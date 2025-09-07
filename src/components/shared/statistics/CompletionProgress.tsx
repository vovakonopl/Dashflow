import { ComponentProps } from 'react';
import StatsArticle from '@/components/shared/statistics/StatsArticle';
import { Progress } from '@/components/ui/progress';

type TCompletionProgressProps = {
  completedTasksCount: number;
  totalTasksCount: number;
} & Omit<ComponentProps<'article'>, 'children'>;

const CompletionProgress = ({
  completedTasksCount,
  totalTasksCount,
  ...props
}: TCompletionProgressProps) => {
  const percentage = (completedTasksCount / totalTasksCount) * 100;

  return (
    <StatsArticle
      {...props}
      title="Tasks in progress"
      description="Currently active tasks"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <Progress value={percentage} />
        <span className="text-sm font-semibold">{Math.floor(percentage)}%</span>
      </div>
    </StatsArticle>
  );
};

export default CompletionProgress;
