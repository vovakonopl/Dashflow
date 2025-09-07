'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';
import { users } from '@/drizzle/schema';
import { SALT_ROUNDS } from '@/lib/constants/auth/SALT_ROUNDS';
import { ERROR_MSG } from '@/lib/constants/error-messages';
import { db } from '@/lib/db';
import { createSession } from '@/lib/server/session';
import { TServerActionReturn } from '@/lib/types/action-return';
import { TUser } from '@/lib/types/tables/user';
import { actionError } from '@/lib/utils/action-error';
import { isUniqueConstraintViolation } from '@/lib/utils/is-unique-constraint-violation';
import {
  signUpSchema,
  TSignUpData,
} from '@/lib/validation/auth/sign-up-schema';

type TSignUpReturn = TServerActionReturn<TSignUpData, TUser>;

export async function signUp(formData: FormData): Promise<TSignUpReturn> {
  const validationResult = signUpSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationResult.success) {
    return actionError(z.treeifyError(validationResult.error).properties);
  }

  // Create user
  const { firstName, lastName, email } = validationResult.data;
  const hashedPassword = await bcrypt.hash(
    validationResult.data.password,
    SALT_ROUNDS,
  );

  try {
    const user: TUser[] = await db
      .insert(users)
      .values({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
      });

    // Create a session
    await createSession({ userId: user[0].id });
    return {
      isSuccess: true,
      data: user[0],
    };
  } catch (error: unknown) {
    const errorMessage = isUniqueConstraintViolation(error)
      ? 'An account with this email address already exists.'
      : ERROR_MSG.errorOnServer;

    return actionError({ root: [errorMessage] });
  }
}
