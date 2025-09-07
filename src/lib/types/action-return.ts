import { TObjectErrors } from '@/lib/types/object-errors';

export type TServerActionReturn<FormData = object, Result = undefined> =
  | { isSuccess: false; errors: TObjectErrors<FormData> }
  | (Result extends undefined
      ? { isSuccess: true }
      : { isSuccess: true; data: Result });
