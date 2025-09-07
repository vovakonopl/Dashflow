import { TZodObjectErrors } from '@/lib/types/zod-object-errors';

export type TServerActionReturn<FormData = object, Result = undefined> =
  | { isSuccess: false; errors: TZodObjectErrors<FormData> }
  | (Result extends undefined
      ? { isSuccess: true }
      : { isSuccess: true; data: Result });
