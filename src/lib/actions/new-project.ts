'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { projects } from '@/drizzle/schema';
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
    const project = await db
      .insert(projects)
      .values({ name, description, ownerId: userId })
      .returning({ id: projects.id });

    projectId = project[0].id;
  } catch {
    return createError({
      root: {
        errors: ['An error occurred on the server. Please, contact support.'],
      },
    });
  }

  // redirect on success
  if (projectId) {
    redirect(`/projects/${projectId}`);
  }
}
