'use server';

import { and, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { revalidatePath } from 'next/cache';
import { projectMembers, projects } from '@/drizzle/schema';
import { ERROR_MSG } from '@/lib/constants/error-messages';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TServerActionReturn } from '@/lib/types/action-return';
import { actionError } from '@/lib/utils/action-error';

type TPayload = { projectId: string; userId: string };

export async function removeMember({
  projectId,
  userId,
}: TPayload): Promise<TServerActionReturn> {
  const initiatorSession = await verifySession();
  if (userId === initiatorSession.userId) {
    return actionError({ root: ['You cannot remove yourself.'] });
  }

  const userToRemoveAlias = alias(projectMembers, 'user_to_remove');
  try {
    const [result] = await db
      .select({
        initiatorRole: projectMembers.role,
        userToRemoveRole: userToRemoveAlias.role,
        projectOwnerId: projects.ownerId,
      })
      .from(projectMembers)
      .where(
        and(
          eq(projectMembers.projectId, projectId),
          eq(projectMembers.userId, initiatorSession.userId),
        ),
      )
      .leftJoin(
        userToRemoveAlias,
        and(
          eq(userToRemoveAlias.projectId, projectId),
          eq(userToRemoveAlias.userId, userId),
        ),
      )
      .leftJoin(projects, eq(projects.id, projectId));

    // check if data was found
    if (!result) {
      return actionError({ root: [ERROR_MSG.accessDenied] });
    }

    const { initiatorRole, userToRemoveRole, projectOwnerId } = result;

    // authorization logic
    const isInitiatorLeader = initiatorRole === 'leader';
    const isInitiatorOwner = projectOwnerId === initiatorSession.userId;
    const isUserToRemoveLeader = userToRemoveRole === 'leader';

    // leaders can remove a member
    const canRemoveMember = isInitiatorLeader && !isUserToRemoveLeader;

    // only the owner can remove a leader
    const canRemoveLeader =
      isInitiatorLeader && isInitiatorOwner && isUserToRemoveLeader;

    if (!(canRemoveMember || canRemoveLeader)) {
      return actionError({ root: [ERROR_MSG.accessDenied] });
    }

    await db
      .delete(projectMembers)
      .where(
        and(
          eq(projectMembers.projectId, projectId),
          eq(projectMembers.userId, userId),
        ),
      );

    revalidatePath(`/projects/${projectId}`);
    return { isSuccess: true };
  } catch {
    return actionError({
      root: [ERROR_MSG.errorOnServer],
    });
  }
}
