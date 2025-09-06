import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { projectMembers, taskAssignments, tasks } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TServerActionReturn } from '@/lib/types/form-action-return';
import { TZodObjectErrors } from '@/lib/types/zod-object-errors';
import { actionError } from '@/lib/utils/action-error';
import { taskSchema, TTaskData } from '@/lib/validation/task-schema';

// FormData object contains several elements appended with the same key,
// so it is necessary to create an array of these elements.
const arrayKey: keyof TTaskData = 'assignedMemberIds';
type TFormObject = {
  [key: string]: unknown;
};

export async function newTask(
  _: unknown,
  formData: FormData,
): Promise<TServerActionReturn<TTaskData>> {
  const initiatorSession = await verifySession();

  const formObject: TFormObject = Object.fromEntries(formData.entries());
  formObject[arrayKey] = formData.getAll('assignedMemberIds');

  const validationResult = taskSchema.safeParse(formObject);
  if (!validationResult.success) {
    return actionError(
      z.treeifyError(validationResult.error)
        .properties as TZodObjectErrors<TTaskData>,
    );
  }

  try {
    const initiator = await db.query.projectMembers.findFirst({
      where: and(
        eq(projectMembers.projectId, validationResult.data.projectId),
        eq(projectMembers.userId, initiatorSession.userId),
      ),
    });

    if (initiator?.role !== 'leader') {
      return actionError({ root: { errors: ['Access denied.'] } });
    }

    const { assignedMemberIds, ...taskData } = validationResult.data;
    await db.transaction(async (tx) => {
      // insert task
      const [newTask] = await tx
        .insert(tasks)
        .values(taskData)
        .returning({ taskId: tasks.id });

      if (!newTask) {
        throw new Error('Task creation failed');
      }

      // insert assigned members
      const membersToInsert = assignedMemberIds.map((userId) => ({
        taskId: newTask.taskId,
        userId,
      }));

      tx.insert(taskAssignments).values(membersToInsert);
    });

    revalidatePath(`/projects/${validationResult.data.projectId}`);
    return { isSuccess: true };
  } catch {
    return actionError({
      root: {
        errors: ['An error occurred on the server. Please, contact support.'],
      },
    });
  }
}
