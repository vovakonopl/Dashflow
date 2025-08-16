import { z } from 'zod';
import { passwordSchema } from '@/lib/validation/auth/passwordSchema';
import { emailSchema } from '@/lib/validation/email-schema';
import { nameSchema } from '@/lib/validation/name-schema';

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
