import { ListTodo } from 'lucide-react';
import { ComponentProps } from 'react';
import StatsArticle from '@/components/shared/statistics/StatsArticle';

type TTotalTasksProps = {
  tasksFor: 'project' | 'user';
  tasksCount: number;
} & Omit<ComponentProps<'article'>, 'children'>;

const TotalTasks = ({ tasksFor, tasksCount, ...props }: TTotalTasksProps) => {
  const description: string =
    tasksFor === 'project'
      ? 'All tasks in this project'
      : 'All tasks assigned to you.';

  return (
    <StatsArticle
      {...props}
      title="Total tasks"
      description={description}
      icon={ListTodo}
      value={tasksCount}
    />
  );
};

export default TotalTasks;
