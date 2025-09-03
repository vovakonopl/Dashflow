import { z } from 'zod';
import { PostgresErrorCodes } from '@/lib/constants/drizzle-error-codes';

const errorSchema = z.object({
  cause: z.object({
    code: z.string(),
  }),
});

export function isUniqueConstraintViolation(error: unknown): boolean {
  const { success, data: parsedError } = errorSchema.safeParse(error);
  return (
    success &&
    parsedError.cause.code === PostgresErrorCodes.UniqueConstraintViolation
  );
}
