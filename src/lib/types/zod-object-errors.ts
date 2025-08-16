export type TZodObjectErrors<T> = {
  [Key in keyof T]?: { errors: string[] };
} & {
  root?: { errors: string[] };
};
