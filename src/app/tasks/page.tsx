import { getTranslations } from 'next-intl/server';
import TitleH1 from '@/components/shared/TitleH1';
import {
  getTasksWithProjectNameForUser,
  GetTasksParams,
} from '@/lib/server/db-queries/tasks';
import { verifySession } from '@/lib/server/session';
import TaskCard from './_components/TaskCard';
import TaskFilters from './_components/TaskFilters';
import TaskPagination from './_components/TaskPagination';

export default async function TasksPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('tasksPage');
  const { userId } = await verifySession();

  const page = Number(searchParams.page) || 1;
  const filter = (searchParams.filter as GetTasksParams['filter']) || 'all';
  const sortBy = (searchParams.sortBy as GetTasksParams['sortBy']) || 'name';
  const sortOrder =
    (searchParams.sortOrder as GetTasksParams['sortOrder']) || 'asc';

  const { tasks: userTasks, totalPages } = await getTasksWithProjectNameForUser(
    userId,
    {
      page,
      filter,
      sortBy,
      sortOrder,
    },
  );

  return (
    <div className="flex flex-col gap-6 p-8 max-md:gap-4 max-md:p-4">
      <div className="flex flex-col gap-4">
        <TitleH1 className="capitalize max-md:text-center">
          {t('title')}
        </TitleH1>
        <TaskFilters />
      </div>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
        {userTasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </ul>

      <TaskPagination totalPages={totalPages} />
    </div>
  );
}
