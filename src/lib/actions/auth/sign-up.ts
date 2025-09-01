'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';
import { users } from '@/drizzle/schema';
import { SALT_ROUNDS } from '@/lib/constants/auth/SALT_ROUNDS';
import { PostgresErrorCodes } from '@/lib/constants/drizzle-error-codes';
import { db } from '@/lib/db';
import { createSession } from '@/lib/server/session';
import { TFormActionReturn } from '@/lib/types/form-action-return';
import { TUser } from '@/lib/types/user';
import { TZodObjectErrors } from '@/lib/types/zod-object-errors';
import { actionError } from '@/lib/utils/action-error';
import {
  signUpSchema,
  TSignUpData,
} from '@/lib/validation/auth/sign-up-schema';

const errorSchema = z.object({
  cause: z.object({
    code: z.string(),
  }),
});

type TSignUpReturn = TFormActionReturn<TSignUpData, TUser>;

export async function signUp(
  _: unknown,
  formData: FormData,
): Promise<TSignUpReturn> {
  const validationResult = signUpSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validationResult.success) {
    return actionError(
      z.treeifyError(validationResult.error)
        .properties as TZodObjectErrors<TSignUpData>,
    );
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
    // Return an error if it occurred during inserting user data.
    const { success, data: parsedError } = errorSchema.safeParse(error);
    const isUniqueConstraintViolation =
      success &&
      parsedError.cause.code === PostgresErrorCodes.UniqueConstraintViolation;

    const errorMessage = isUniqueConstraintViolation
      ? 'An account with this email address already exists.'
      : 'An error occurred on the server. Please, contact support.';

    return {
      isSuccess: false,
      errors: {
        root: {
          errors: [errorMessage],
        },
      },
    };
  }
}
