'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { projectMembers, projects } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TFormActionReturn } from '@/lib/types/form-action-return';
import { TZodObjectErrors } from '@/lib/types/zod-object-errors';
import { projectSchema, TProjectData } from '@/lib/validation/project-schema';

type TNewProjectReturn = TFormActionReturn<TProjectData>;

function createError(
  errors: TZodObjectErrors<TProjectData>,
): TNewProjectReturn {
  return {
    isSuccess: false,
    data: null,
    errors,
  };
}

export async function newProject(
  _: unknown,
  formData: FormData,
): Promise<TNewProjectReturn> {
  const { userId } = await verifySession();

  const validationResult = projectSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationResult.success) {
    return createError(
      z.treeifyError(validationResult.error) as TZodObjectErrors<TProjectData>,
    );
  }

  const { name, description } = validationResult.data;
  let projectId: string | undefined = undefined;

  try {
    // create project and member (user that created the project) in db
    const [project] = await db
      .insert(projects)
      .values({ name, description, ownerId: userId })
      .returning({ id: projects.id });

    projectId = project.id;

    await db.transaction(async (tx) => {
      const [newProject] = await tx
        .insert(projects)
        .values({ name, description, ownerId: userId })
        .returning({ id: projects.id });

      await tx.insert(projectMembers).values({
        projectId: newProject.id,
        userId: userId,
        role: 'leader',
      });
    });
  } catch {
    projectId = undefined;

    return createError({
      root: {
        errors: ['An error occurred on the server. Please, contact support.'],
      },
    });
  } finally {
    // redirect on success
    if (projectId) {
      redirect(`/projects/${projectId}`);
    }
  }
}
