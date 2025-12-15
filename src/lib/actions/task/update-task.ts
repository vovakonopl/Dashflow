'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { projectMembers, taskAssignments, tasks } from '@/drizzle/schema';
import { ERROR_MSG } from '@/lib/constants/error-messages';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TServerActionReturn } from '@/lib/types/action-return';
import { actionError } from '@/lib/utils/action-error';
import { taskSchema, TTaskData } from '@/lib/validation/task-schema';

// FormData keys
const arrayKey: keyof TTaskData = 'assignedMemberIds';
const dateKey: keyof TTaskData = 'deadline';

type TFormObject = {
  [key: string]: unknown;
};

export async function updateTask(
  taskId: string,
  formData: FormData,
): Promise<TServerActionReturn<TTaskData>> {
  const initiatorSession = await verifySession();

  const formObject: TFormObject = Object.fromEntries(formData.entries());
  formObject[arrayKey] = formData.getAll(arrayKey); // get as array

  // create a date object from the ISO string
  const dateStr = formData.get(dateKey);
  if (typeof dateStr === 'string') {
    formObject[dateKey] = new Date(dateStr);
  }

  const validationResult = taskSchema.safeParse(formObject);
  if (!validationResult.success) {
    return actionError(z.treeifyError(validationResult.error).properties);
  }

  try {
    const initiator = await db.query.projectMembers.findFirst({
      where: and(
        eq(projectMembers.projectId, validationResult.data.projectId),
        eq(projectMembers.userId, initiatorSession.userId),
      ),
    });

    if (initiator?.role !== 'leader') {
      return actionError({ root: [ERROR_MSG.accessDenied] });
    }

    const { assignedMemberIds, ...taskData } = validationResult.data;

    await db.transaction(async (tx) => {
      // update task
      await tx.update(tasks).set(taskData).where(eq(tasks.id, taskId));

      // delete existing assignments
      await tx
        .delete(taskAssignments)
        .where(eq(taskAssignments.taskId, taskId));

      // insert new assignments
      if (assignedMemberIds.length > 0) {
        const membersToInsert = assignedMemberIds.map((userId) => ({
          taskId,
          userId,
        }));
        await tx.insert(taskAssignments).values(membersToInsert);
      }
    });

    revalidatePath(`/projects/${validationResult.data.projectId}`);
    return { isSuccess: true };
  } catch {
    return actionError({
      root: [ERROR_MSG.errorOnServer],
    });
  }
}
