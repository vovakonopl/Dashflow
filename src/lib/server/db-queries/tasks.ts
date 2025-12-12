import {
  and,
  asc,
  count,
  desc,
  eq,
  getTableColumns,
  isNull,
  lt,
} from 'drizzle-orm';
import { projects, taskAssignments, tasks } from '@/drizzle/schema';
import { TASKS_PER_PAGE } from '@/lib/constants/tasks-pagination';
import { db } from '@/lib/db';
import { TTask, TTaskWithProjectName } from '@/lib/types/tables/task';

export async function getTasksForUser(userId: string): Promise<TTask[]> {
  return db
    .select(getTableColumns(tasks))
    .from(taskAssignments)
    .innerJoin(tasks, eq(taskAssignments.taskId, tasks.id))
    .where(eq(taskAssignments.userId, userId));
}

export type GetTasksParams = {
  page?: number;
  filter?: 'incomplete' | 'overdue' | 'all';
  sortBy?: 'name' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
};

export async function getTasksWithProjectNameForUser(
  userId: string,
  {
    page = 1,
    filter = 'all',
    sortBy = 'name',
    sortOrder = 'asc',
  }: GetTasksParams = {},
): Promise<{ tasks: TTaskWithProjectName[]; totalPages: number }> {
  const conditions = [eq(taskAssignments.userId, userId)];

  if (filter === 'incomplete') {
    conditions.push(isNull(tasks.completedAt));
  } else if (filter === 'overdue') {
    conditions.push(
      and(isNull(tasks.completedAt), lt(tasks.deadline, new Date()))!,
    );
  }

  const orderBy = [];
  const orderFn = sortOrder === 'asc' ? asc : desc;

  switch (sortBy) {
    case 'name':
      orderBy.push(orderFn(tasks.title));
      break;
    case 'dueDate':
      orderBy.push(orderFn(tasks.deadline));
      break;
    case 'priority':
      orderBy.push(orderFn(tasks.priority));
      break;
  }

  // Ensure consistent sorting
  orderBy.push(asc(tasks.id));

  const [totalCountResult] = await db
    .select({ count: count() })
    .from(taskAssignments)
    .innerJoin(tasks, eq(taskAssignments.taskId, tasks.id))
    .innerJoin(projects, eq(tasks.projectId, projects.id))
    .where(and(...conditions));

  const totalPages = Math.ceil(totalCountResult.count / TASKS_PER_PAGE);

  const data = await db
    .select({
      ...getTableColumns(tasks),
      relatedProjectName: projects.name,
    })
    .from(taskAssignments)
    .innerJoin(tasks, eq(taskAssignments.taskId, tasks.id))
    .innerJoin(projects, eq(tasks.projectId, projects.id))
    .where(and(...conditions))
    .orderBy(...orderBy)
    .limit(TASKS_PER_PAGE)
    .offset((page - 1) * TASKS_PER_PAGE);

  return { tasks: data, totalPages };
}
