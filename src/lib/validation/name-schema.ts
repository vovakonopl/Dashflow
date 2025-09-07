import { z } from 'zod';
import { MAX_NAME_LENGTH } from '@/lib/constants/field-lengths/names-max-length';

export const nameSchema = z
  .string()
  .min(1, {
    message: 'Required.',
  })
  .max(MAX_NAME_LENGTH, {
    message: `Name must be at most ${MAX_NAME_LENGTH} characters long.`,
  });
