import { ComponentProps } from 'react';
import StatsArticle from '@/components/shared/statistics/StatsArticle';
import { Progress } from '@/components/ui/progress';

type TCompletionProgressProps = {
  tasksFor: 'project' | 'user';
  completedTasksCount: number;
  totalTasksCount: number;
} & Omit<ComponentProps<'article'>, 'children'>;

const TasksCompletionProgress = ({
  tasksFor,
  completedTasksCount,
  totalTasksCount,
  ...props
}: TCompletionProgressProps) => {
  // the article does not make any sense if tasks count is 0.
  if (totalTasksCount === 0) return null;

  const percentage = (completedTasksCount / totalTasksCount) * 100;
  const description =
    tasksFor === 'project'
      ? `Progress towards project completion`
      : `Personal progress across all tasks`;

  return (
    <StatsArticle
      {...props}
      title="Task completion progress"
      description={description}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <Progress value={percentage} />
        <span className="text-sm font-semibold whitespace-nowrap">
          {Math.floor(percentage)}% ({completedTasksCount} / {totalTasksCount})
        </span>
      </div>
    </StatsArticle>
  );
};

export default TasksCompletionProgress;
