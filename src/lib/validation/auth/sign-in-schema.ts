import { z } from 'zod';
import { passwordSchema } from '@/lib/validation/auth/passwordSchema';
import { emailSchema } from '@/lib/validation/email-schema';

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
