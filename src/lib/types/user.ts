export type TUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type TIncludedColumns = { [Key in keyof TUser]: true };
export const DB_USER_INCLUDED_COLUMNS: Readonly<TIncludedColumns> =
  Object.freeze({
    id: true,
    email: true,
    firstName: true,
    lastName: true,
  });
