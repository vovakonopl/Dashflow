import { TZodObjectErrors } from '@/lib/types/zod-object-errors';

export type TFormActionReturn<Result, FormData> =
  | { isSuccess: true; data: Result; errors: null }
  | { isSuccess: false; data: null; errors: TZodObjectErrors<FormData> };
