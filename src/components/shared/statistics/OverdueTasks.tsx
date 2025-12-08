import { Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import StatsArticle from '@/components/shared/statistics/StatsArticle';

type TOverdueTasksProps = {
  tasksCount: number;
} & Omit<ComponentProps<'article'>, 'children'>;

const OverdueTasks = ({ tasksCount, ...props }: TOverdueTasksProps) => {
  const t = useTranslations('statistics.overdueTasks');

  return (
    <StatsArticle
      {...props}
      title={t('title')}
      description={t('description')}
      icon={Clock}
      value={tasksCount}
    />
  );
};

export default OverdueTasks;
