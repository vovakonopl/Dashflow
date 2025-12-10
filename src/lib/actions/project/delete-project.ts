'use server';

import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { projects } from '@/drizzle/schema';
import { ERROR_MSG } from '@/lib/constants/error-messages';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TServerActionReturn } from '@/lib/types/action-return';
import { actionError } from '@/lib/utils/action-error';

export async function deleteProject(
  projectId: string,
): Promise<TServerActionReturn> {
  const { userId } = await verifySession();

  // verify if the user is the owner of the project
  const initiator = await db.query.projects.findFirst({
    where: and(eq(projects.id, projectId), eq(projects.ownerId, userId)),
  });

  if (!initiator) {
    return actionError({ root: [ERROR_MSG.accessDenied] });
  }

  try {
    await db.delete(projects).where(eq(projects.id, projectId));
  } catch {
    return actionError({
      root: [ERROR_MSG.errorOnServer],
    });
  }

  redirect('/projects');
}
