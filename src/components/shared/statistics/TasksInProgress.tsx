import { CircleCheckBig } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import StatsArticle from '@/components/shared/statistics/StatsArticle';

type TTasksInProgressProps = {
  tasksCount: number;
} & Omit<ComponentProps<'article'>, 'children'>;

const TasksInProgress = ({ tasksCount, ...props }: TTasksInProgressProps) => {
  const t = useTranslations('statistics.tasksInProgress');

  return (
    <StatsArticle
      {...props}
      title={t('title')}
      description={t('description')}
      icon={CircleCheckBig}
      value={tasksCount}
    />
  );
};

export default TasksInProgress;
