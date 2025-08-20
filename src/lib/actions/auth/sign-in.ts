'use server';

import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { createSession } from '@/lib/server/session';
import { TFormActionReturn } from '@/lib/types/form-action-return';
import { DB_USER_INCLUDED_COLUMNS, TUser } from '@/lib/types/user';
import { TZodObjectErrors } from '@/lib/types/zod-object-errors';
import {
  signInSchema,
  TSignInData,
} from '@/lib/validation/auth/sign-in-schema';

type TSignInReturn = TFormActionReturn<TUser, TSignInData>;

function createError(errors: TZodObjectErrors<TSignInData>): TSignInReturn {
  return {
    isSuccess: false,
    data: null,
    errors,
  };
}

export async function signIn(
  _: unknown,
  formData: FormData,
): Promise<TSignInReturn> {
  const validationResult = signInSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationResult.success) {
    return createError(
      z.treeifyError(validationResult.error) as TZodObjectErrors<TSignInData>,
    );
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
      return createError({ root: { errors: ['Invalid email or password.'] } });
    }

    // Compare received and stored passwords
    const { password: storedPassword, ...user } = userWithPassword;
    const isMatching: boolean = await bcrypt.compare(password, storedPassword);

    // Invalid password
    if (!isMatching) {
      return createError({ root: { errors: ['Invalid email or password.'] } });
    }

    // Create a session
    await createSession({ userId: user.id });
    return {
      isSuccess: true,
      data: user,
      errors: null,
    };
  } catch {
    // Return an error if it occurred while searching user data.
    return createError({
      root: {
        errors: ['An error occurred on the server. Please, contact support.'],
      },
    });
  }
}
