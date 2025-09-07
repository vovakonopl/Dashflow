'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { projectMembers, projects } from '@/drizzle/schema';
import { ERROR_MSG } from '@/lib/constants/error-messages';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TServerActionReturn } from '@/lib/types/action-return';
import { TMemberRole } from '@/lib/types/tables/member-roles-enum';
import { actionError } from '@/lib/utils/action-error';

type TPayload = {
  newRole: TMemberRole;
  userId: string;
  projectId: string;
};

export async function updateMemberRole({
  userId,
  newRole,
  projectId,
}: TPayload): Promise<TServerActionReturn> {
  const initiatorSession = await verifySession();
  if (initiatorSession.userId === userId) {
    return actionError({ root: ['You cannot update yourself.'] });
  }

  try {
    const ownerId = await db.query.projects.findFirst({
      where: eq(projects.id, projectId),
      columns: { ownerId: true },
    });

    if (!ownerId || ownerId.ownerId !== initiatorSession.userId) {
      return actionError({ root: [ERROR_MSG.accessDenied] });
    }

    await db
      .update(projectMembers)
      .set({ role: newRole })
      .where(
        and(
          eq(projectMembers.projectId, projectId),
          eq(projectMembers.userId, userId),
        ),
      );

    revalidatePath(`/projects/${projectId}`);
    return { isSuccess: true };
  } catch (err) {
    console.log(err);
    return actionError({
      root: [ERROR_MSG.errorOnServer],
    });
  }
}
