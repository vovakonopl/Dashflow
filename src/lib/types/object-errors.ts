export type TObjectErrors<T> = {
  [Key in keyof T]?: string[];
} & {
  root?: string[];
};
