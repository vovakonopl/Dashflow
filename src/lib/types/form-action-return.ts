import { TZodObjectErrors } from '@/lib/types/zod-object-errors';

export type TFormActionReturn<FormData, Result = undefined> =
  | { isSuccess: false; data: null; errors: TZodObjectErrors<FormData> }
  | (Result extends undefined
      ? undefined
      : { isSuccess: true; data: Result; errors: null });
