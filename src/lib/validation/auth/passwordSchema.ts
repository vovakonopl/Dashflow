import { z } from 'zod';
import { PASSWORD } from '@/lib/constants/auth/password-lengths';

export const passwordSchema = z
  .string()
  .min(PASSWORD.minLength, {
    message: `Password must be at least ${PASSWORD.minLength} characters long.`,
  })
  .max(PASSWORD.maxLength, {
    message: `Password must be at most ${PASSWORD.maxLength} characters long.`,
  });
