import { eq } from 'drizzle-orm';
import { cache } from 'react';
import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { getSession, verifySession } from '@/lib/server/session';
import { DB_USER_INCLUDED_COLUMNS, TUser } from '@/lib/types/user';

async function fetchUserFromDb(userId: string): Promise<TUser> {
  const user: TUser | undefined = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: DB_USER_INCLUDED_COLUMNS,
  });

  if (!user) {
    throw new Error(`User with id ${userId} was not found`);
  }

  return user;
}

// This function checks for a valid session, and if there is a valid one, it returns the user data.
// If there is no valid session, it redirects to the sign-in page.
export const getUser = cache(async (): Promise<TUser> => {
  const session = await verifySession();
  return fetchUserFromDb(session.userId);
});

// This function checks for a valid session, and if there is a valid one, it returns the user data.
// Otherwise, it returns null.
export const tryGetUser = cache(async (): Promise<TUser | null> => {
  const session = await getSession();
  if (!session) {
    return null;
  }

  return fetchUserFromDb(session.userId);
});
