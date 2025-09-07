'use server';

import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { users } from '@/drizzle/schema';
import { ERROR_MSG } from '@/lib/constants/error-messages';
import { db } from '@/lib/db';
import { createSession } from '@/lib/server/session';
import { TServerActionReturn } from '@/lib/types/action-return';
import { DB_USER_INCLUDED_COLUMNS, TUser } from '@/lib/types/tables/user';
import { actionError } from '@/lib/utils/action-error';
import {
  signInSchema,
  TSignInData,
} from '@/lib/validation/auth/sign-in-schema';

type TSignInReturn = TServerActionReturn<TSignInData, TUser>;

const invalidEmailOrPasswordMsg = 'Invalid email or password.';

export async function signIn(formData: FormData): Promise<TSignInReturn> {
  const validationResult = signInSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationResult.success) {
    return actionError(z.treeifyError(validationResult.error).properties);
  }

  const { email, password } = validationResult.data;
  try {
    const userWithPassword: (TUser & { password: string }) | undefined =
      await db.query.users.findFirst({
        where: eq(users.email, email),
        columns: { ...DB_USER_INCLUDED_COLUMNS, password: true },
      });

    // User was not found
    if (!userWithPassword) {
      return actionError({ root: [invalidEmailOrPasswordMsg] });
    }

    // Compare received and stored passwords
    const { password: storedPassword, ...user } = userWithPassword;
    const isMatching: boolean = await bcrypt.compare(password, storedPassword);

    // Invalid password
    if (!isMatching) {
      return actionError({ root: [invalidEmailOrPasswordMsg] });
    }

    // Create a session
    await createSession({ userId: user.id });
    return {
      isSuccess: true,
      data: user,
    };
  } catch {
    // Return an error if it occurred while searching user data.
    return actionError({
      root: [ERROR_MSG.errorOnServer],
    });
  }
}
