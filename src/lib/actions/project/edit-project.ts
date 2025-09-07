'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { projectMembers, projects } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TServerActionReturn } from '@/lib/types/form-action-return';
import { TZodObjectErrors } from '@/lib/types/zod-object-errors';
import { actionError } from '@/lib/utils/action-error';
import { projectSchema, TProjectData } from '@/lib/validation/project-schema';

const projectWithIdSchema = projectSchema.extend({
  id: z.string().min(1),
});

export async function editProject(
  formData: FormData,
): Promise<TServerActionReturn<TProjectData>> {
  const { userId } = await verifySession();
  const validationResult = projectWithIdSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationResult.success) {
    return actionError(
      z.treeifyError(validationResult.error)
        .properties as TZodObjectErrors<TProjectData>,
    );
  }

  // verify if the user is the leader of the project
  const { id: projectId, name, description } = validationResult.data;
  const initiator = await db.query.projectMembers.findFirst({
    where: and(
      eq(projectMembers.projectId, projectId),
      eq(projectMembers.userId, userId),
    ),
  });

  if (!initiator || initiator.role !== 'leader') {
    return actionError({ root: { errors: ['Access denied.'] } });
  }

  try {
    // create project and member (user that created the project) in db
    await db
      .update(projects)
      .set({ name, description })
      .where(eq(projects.id, projectId))
      .returning({ id: projects.id });

    revalidatePath(`/projects/${projectId}`);

    return { isSuccess: true };
  } catch {
    return actionError({
      root: {
        errors: ['An error occurred on the server. Please, contact support.'],
      },
    });
  }
}
