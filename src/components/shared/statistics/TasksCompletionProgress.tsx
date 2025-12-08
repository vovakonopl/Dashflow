import { useTranslations } from 'next-intl';
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
  const t = useTranslations('statistics.completionProgress');
  // the article does not make any sense if tasks count is 0.
  if (totalTasksCount === 0) return null;

  const percentage = (completedTasksCount / totalTasksCount) * 100;

  return (
    <StatsArticle
      {...props}
      title={t('title')}
      description={t(`description.${t(tasksFor)}`)}
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
