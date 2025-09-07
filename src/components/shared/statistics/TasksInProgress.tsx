import { CircleCheckBig } from 'lucide-react';
import { ComponentProps } from 'react';
import StatsArticle from '@/components/shared/statistics/StatsArticle';

type TTasksInProgressProps = {
  tasksCount: number;
} & Omit<ComponentProps<'article'>, 'children'>;

const TasksInProgress = ({ tasksCount, ...props }: TTasksInProgressProps) => {
  return (
    <StatsArticle
      {...props}
      title="Tasks in progress"
      description="Currently active tasks"
      icon={CircleCheckBig}
      value={tasksCount}
    />
  );
};

export default TasksInProgress;
