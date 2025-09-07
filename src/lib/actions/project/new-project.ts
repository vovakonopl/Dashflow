'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { projectMembers, projects } from '@/drizzle/schema';
import { ERROR_MSG } from '@/lib/constants/error-messages';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TServerActionReturn } from '@/lib/types/action-return';
import { actionError } from '@/lib/utils/action-error';
import { projectSchema, TProjectData } from '@/lib/validation/project-schema';

type TNewProjectReturn = TServerActionReturn<TProjectData>;

export async function newProject(
  formData: FormData,
): Promise<TNewProjectReturn> {
  const { userId } = await verifySession();

  const validationResult = projectSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationResult.success) {
    return actionError(z.treeifyError(validationResult.error).properties);
  }

  const { name, description } = validationResult.data;
  let projectId: string | undefined = undefined;

  try {
    // create project and member (user that created the project) in db
    await db.transaction(async (tx) => {
      const [project] = await tx
        .insert(projects)
        .values({ name, description, ownerId: userId })
        .returning({ id: projects.id });

      await tx.insert(projectMembers).values({
        projectId: project.id,
        userId: userId,
        role: 'leader',
      });

      projectId = project.id;
    });

    return { isSuccess: true };
  } catch {
    return actionError({
      errors: [ERROR_MSG.errorOnServer],
    });
  } finally {
    // redirect on success
    if (projectId) {
      redirect(`/projects/${projectId}`);
    }
  }
}
