import { TServerActionReturn } from '@/lib/types/form-action-return';
import { TZodObjectErrors } from '@/lib/types/zod-object-errors';

export function actionError<FormData, Result = undefined>(
  errors: TZodObjectErrors<FormData>,
): TServerActionReturn<FormData, Result> {
  return {
    isSuccess: false,
    errors,
  };
}
