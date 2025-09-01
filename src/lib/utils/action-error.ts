import { TFormActionReturn } from '@/lib/types/form-action-return';
import { TZodObjectErrors } from '@/lib/types/zod-object-errors';

export function actionError<FormData, Result = undefined>(
  errors: TZodObjectErrors<FormData>,
): TFormActionReturn<FormData, Result> {
  return {
    isSuccess: false,
    errors,
  };
}
