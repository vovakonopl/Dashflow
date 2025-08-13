import { eq } from 'drizzle-orm';
import { cache } from 'react';
import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TUser } from '@/lib/types/user';

export const getUser = cache(async (): Promise<TUser> => {
  const session = await verifySession();

  const user: TUser | undefined = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
    columns: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!user) {
    throw new Error(`User with id ${session.userId} not found`);
  }

  return user;
});
