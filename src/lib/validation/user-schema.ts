import { z } from 'zod';
import { emailSchema } from '@/lib/validation/email-schema';
import { nameSchema } from '@/lib/validation/name-schema';

export const userSchema = z.object({
  id: z.string(),
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
});
