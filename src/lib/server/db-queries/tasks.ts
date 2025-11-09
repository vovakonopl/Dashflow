import 'server-only';
import { eq, getTableColumns } from 'drizzle-orm';
import { projects, taskAssignments, tasks } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { TTask, TTaskWithProjectName } from '@/lib/types/tables/task';

export async function getTasksForUser(userId: string): Promise<TTask[]> {
  return db
    .select(getTableColumns(tasks))
    .from(taskAssignments)
    .innerJoin(tasks, eq(taskAssignments.taskId, tasks.id))
    .where(eq(taskAssignments.userId, userId));
}

export async function getTasksWithProjectNameForUser(
  userId: string,
): Promise<TTaskWithProjectName[]> {
  return db
    .select({
      ...getTableColumns(tasks),
      relatedProjectName: projects.name,
    })
    .from(taskAssignments)
    .innerJoin(tasks, eq(taskAssignments.taskId, tasks.id))
    .innerJoin(projects, eq(tasks.projectId, projects.id))
    .where(eq(taskAssignments.userId, userId));
}
