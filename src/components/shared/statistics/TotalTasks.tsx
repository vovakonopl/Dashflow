import { ListTodo } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import StatsArticle from '@/components/shared/statistics/StatsArticle';

type TTotalTasksProps = {
  tasksFor: 'project' | 'user';
  tasksCount: number;
} & Omit<ComponentProps<'article'>, 'children'>;

const TotalTasks = ({ tasksFor, tasksCount, ...props }: TTotalTasksProps) => {
  const t = useTranslations('statistics.totalTasks');

  return (
    <StatsArticle
      {...props}
      title={t('title')}
      description={t(`description.${tasksFor}`)}
      icon={ListTodo}
      value={tasksCount}
    />
  );
};

export default TotalTasks;
