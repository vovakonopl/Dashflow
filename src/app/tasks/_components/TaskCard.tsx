import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TaskDescription from '@/app/tasks/_components/TaskDescription';
import ToggleTaskCompletionButton from '@/app/tasks/_components/ToggleTaskCompletionButton';
import TaskPriorityBadge from '@/components/shared/TaskPriorityBadge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { TTaskWithProjectName } from '@/lib/types/tables/task';
import { cn } from '@/lib/utils/cn';

type TTaskCardProps = {
  task: TTaskWithProjectName;
};

const TaskCard = ({ task }: TTaskCardProps) => {
  const t = useTranslations('tasksPage.task');
  const isCompleted = !!task.completedAt;

  return (
    <Card>
      <CardHeader className="flex justify-between gap-4 max-md:gap-2">
        <h3 className="text-lg">{task.title}</h3>

        <div className="flex flex-col items-end gap-2 text-xs">
          <TaskPriorityBadge priority={task.priority} />

          <span
            className={cn(
              'rounded-full px-2 py-1 font-medium whitespace-nowrap capitalize',
              isCompleted
                ? 'bg-primary text-primary-foreground'
                : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-400 dark:text-neutral-800',
            )}
          >
            {t(isCompleted ? 'completed' : 'inProgress')}
          </span>

          {!isCompleted && new Date(task.deadline) < new Date() && (
            <span className="rounded-full bg-red-100 px-2 py-1 font-medium text-red-600 capitalize dark:bg-red-900/30 dark:text-red-400">
              {t('overdue')}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <TaskDescription description={task.description} />
      </CardContent>

      <CardFooter className="text-muted-foreground mt-auto flex-col items-start gap-2 text-sm">
        <span>
          {t('inProject')} {task.relatedProjectName}
        </span>

        <div className="flex items-center gap-1">
          <Calendar className="size-4" />
          <span>
            {t('due')}: {task.deadline.toDateString()}
          </span>
        </div>

        <ToggleTaskCompletionButton
          isCompleted={isCompleted}
          taskId={task.id}
        />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
