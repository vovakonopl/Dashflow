import TitleH1 from '@/components/shared/TitleH1';
import { getTasksWithProjectNameForUser } from '@/lib/server/db-queries/tasks';
import { verifySession } from '@/lib/server/session';
import { TTaskWithProjectName } from '@/lib/types/tables/task';
import TaskCard from './_components/TaskCard';

function sortTasksByName(
  tasks: TTaskWithProjectName[],
): TTaskWithProjectName[] {
  return tasks.sort((a, b) => {
    const titleA = a.title;
    const titleB = b.title;
    return titleA.localeCompare(titleB, undefined, {
      sensitivity: 'base',
      numeric: true,
    });
  });
}

export default async function TasksPage() {
  const { userId } = await verifySession();
  const userTasks: TTaskWithProjectName[] = sortTasksByName(
    await getTasksWithProjectNameForUser(userId),
  );

  return (
    <div className="flex flex-col gap-6 p-8 max-md:gap-4 max-md:p-4">
      <TitleH1 className="max-md:text-center">My Tasks</TitleH1>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
        {userTasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </ul>
    </div>
  );
}
