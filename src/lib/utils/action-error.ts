import { ERROR_MSG } from '@/lib/constants/error-messages';
import { TServerActionReturn } from '@/lib/types/action-return';
import { TObjectErrors } from '@/lib/types/object-errors';

type TZodObjectErrors<T> = {
  [Key in keyof T]?: { errors: string[] };
} & {
  root?: { errors: string[] };
};

type TErrorEntry = [key: string, val: string[] | { errors: string[] }];

export function actionError<FormData, Result = undefined>(
  errors: TObjectErrors<FormData> | TZodObjectErrors<FormData> | undefined,
): TServerActionReturn<FormData, Result> {
  // if errors are undefined, then the wrong type of data was passed
  if (!errors) {
    return {
      isSuccess: false,
      errors: { root: [ERROR_MSG.invalidDataFormat] },
    };
  }

  const errorsEntries = Object.entries(errors).map(
    ([key, value]: TErrorEntry) => {
      if (Array.isArray(value)) {
        return [key, value];
      }

      return [key, value.errors] as [string, string[]];
    },
  );

  return {
    isSuccess: false,
    errors: Object.fromEntries(errorsEntries),
  };
}
