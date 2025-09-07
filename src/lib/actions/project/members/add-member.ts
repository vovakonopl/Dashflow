'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { projectMembers } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { actionError } from '@/lib/utils/action-error';
import { isUniqueConstraintViolation } from '@/lib/utils/is-unique-constraint-violation';

type TPayload = { projectId: string; userId: string };

export async function addMember({ projectId, userId }: TPayload) {
  const initiatorSession = await verifySession();
  const initiator = await db.query.projectMembers.findFirst({
    where: and(
      eq(projectMembers.projectId, projectId),
      eq(projectMembers.userId, initiatorSession.userId),
    ),
  });

  if (!initiator || initiator.role !== 'leader') {
    return actionError({ root: { errors: ['Access denied.'] } });
  }

  try {
    await db.insert(projectMembers).values({
      projectId,
      userId,
      role: 'member',
    });

    revalidatePath(`/projects/${projectId}`);
    return { isSuccess: true as const };
  } catch (error: unknown) {
    const errorMsg = isUniqueConstraintViolation(error)
      ? 'The user is already part of the project.'
      : 'An error occurred on the server. Please, contact support.';

    return actionError({
      root: { errors: [errorMsg] },
    });
  }
}
