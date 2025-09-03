import { InferSelectModel } from 'drizzle-orm';
import { users } from '@/drizzle/schema';

type TUserDb = InferSelectModel<typeof users>;
type TIncludedKeys = 'id' | 'email' | 'firstName' | 'lastName';

// Type for client user objects
export type TUser = Pick<TUserDb, TIncludedKeys>;

// Object with all included fields for db query
type TIncludedColumns = { [Key in keyof TUser]: true };
export const DB_USER_INCLUDED_COLUMNS: Readonly<TIncludedColumns> =
  Object.freeze({
    id: true,
    email: true,
    firstName: true,
    lastName: true,
  });

// Object with all included fields for db query with select method
type TSelectedColumns = Pick<typeof users, TIncludedKeys>;
export const DB_USER_SELECTED_COLUMNS: Readonly<TSelectedColumns> =
  Object.freeze({
    id: users.id,
    email: users.email,
    firstName: users.firstName,
    lastName: users.lastName,
  });
