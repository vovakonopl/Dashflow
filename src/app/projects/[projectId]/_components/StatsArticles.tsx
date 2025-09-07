import CompletionProgress from '@/components/shared/statistics/CompletionProgress';
import OverdueTasks from '@/components/shared/statistics/OverdueTasks';
import TasksInProgress from '@/components/shared/statistics/TasksInProgress';
import TotalTasks from '@/components/shared/statistics/TotalTasks';
import { TTaskWithMemberIds } from '@/lib/types/tables/task';
import { cn } from '@/lib/utils/cn';

type TStatsArticlesProps = {
  tasks: TTaskWithMemberIds[];
};

const StatsArticles = ({ tasks }: TStatsArticlesProps) => {
  const className = 'h-40 w-full max-lg:w-full';

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(13.5rem,1fr))] gap-4">
      <TotalTasks
        className={className}
        tasksCount={tasks.length}
        tasksFor="project"
      />
      <TasksInProgress
        className={className}
        tasksCount={tasks.filter((task) => !task.completed).length}
      />
      <OverdueTasks
        className={className}
        tasksCount={
          tasks.filter((task) => !task.completed && task.deadline < new Date())
            .length
        }
      />
      <CompletionProgress
        className={cn('col-span-2 max-sm:col-span-1', className)}
        completedTasksCount={tasks.filter((task) => task.completed).length}
        totalTasksCount={tasks.length}
      />
    </div>
  );
};

export default StatsArticles;
