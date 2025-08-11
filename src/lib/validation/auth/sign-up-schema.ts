import { z } from 'zod';
import { MAX_NAME_LENGTH } from '@/lib/constants/names-max-length';
import { passwordSchema } from '@/lib/validation/auth/passwordSchema';
import { emailSchema } from '@/lib/validation/email-schema';

const nameSchema = z
  .string()
  .min(1, {
    message: 'Field is required.',
  })
  .max(MAX_NAME_LENGTH, {
    message: `Name must be at most ${MAX_NAME_LENGTH} characters long.`,
  });

export const signUpSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type TSignUpData = z.infer<typeof signUpSchema>;
