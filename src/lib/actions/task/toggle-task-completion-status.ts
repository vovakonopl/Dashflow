'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { tasks, taskAssignments } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { actionError } from '@/lib/utils/action-error';

export async function toggleTaskCompletionStatus(taskId: string) {
  const initiatorSession = await verifySession();
  const initiatorId = initiatorSession.userId;

  try {
    // Ensure initiator is assigned to the task
    const assignment = await db.query.taskAssignments.findFirst({
      where: and(
        eq(taskAssignments.taskId, taskId),
        eq(taskAssignments.userId, initiatorId),
      ),
    });

    if (!assignment) {
      return actionError({ root: ['Permission denied'] });
    }

    const task = await db.query.tasks.findFirst({
      where: eq(tasks.id, assignment.taskId),
    });

    if (!task) {
      return actionError({ root: ['Task not found'] });
    }

    await db
      .update(tasks)
      .set({ completed: !task.completed })
      .where(eq(tasks.id, task.id));

    // revalidate paths for tasks page and project page of the task
    revalidatePath('/tasks');
    revalidatePath(`/projects/${task.projectId}`);

    return { isSuccess: true };
  } catch {
    return actionError({ root: ["Can't update the task"] });
  }
}
