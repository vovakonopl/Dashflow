import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import OverdueTasks from '@/components/shared/statistics/OverdueTasks';
import TasksCompletionProgress from '@/components/shared/statistics/TasksCompletionProgress';
import TasksInProgress from '@/components/shared/statistics/TasksInProgress';
import TotalTasks from '@/components/shared/statistics/TotalTasks';
import TitleH1 from '@/components/shared/TitleH1';
import { Button } from '@/components/ui/button';
import { getTasksForUser } from '@/lib/server/db-queries/tasks';
import { verifySession } from '@/lib/server/session';

export default async function TasksPage() {
  const t = await getTranslations('dashboardPage');
  const { userId } = await verifySession();

  const tasks = await getTasksForUser(userId);

  const overdueTasksCount: number = tasks.filter(
    (task) => task.deadline < new Date(),
  ).length;
  const completedTasksCount: number = tasks.filter(
    (task) => task.completed,
  ).length;

  return (
    <div className="flex flex-col gap-6 p-8 max-md:gap-4 max-md:p-4">
      <TitleH1 className="capitalize max-md:text-center">{t('title')}</TitleH1>

      <div className="flex flex-wrap gap-4 max-lg:justify-center">
        <TotalTasks tasksFor="user" tasksCount={tasks.length} />
        <OverdueTasks tasksCount={overdueTasksCount} />
        <TasksInProgress tasksCount={completedTasksCount} />
        <TasksCompletionProgress
          tasksFor="user"
          completedTasksCount={completedTasksCount}
          totalTasksCount={tasks.length}
        />
      </div>

      <Button asChild variant="link" className="text-2xl">
        <Link href="/tasks">{t('tasksLink')}</Link>
      </Button>
    </div>
  );
}
