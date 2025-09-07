import { Clock } from 'lucide-react';
import { ComponentProps } from 'react';
import StatsArticle from '@/components/shared/statistics/StatsArticle';

type TOverdueTasksProps = {
  tasksCount: number;
} & Omit<ComponentProps<'article'>, 'children'>;

const OverdueTasks = ({ tasksCount, ...props }: TOverdueTasksProps) => {
  return (
    <StatsArticle
      {...props}
      title="Overdue tasks"
      description="Tasks past their due date"
      icon={Clock}
      value={tasksCount}
    />
  );
};

export default OverdueTasks;
