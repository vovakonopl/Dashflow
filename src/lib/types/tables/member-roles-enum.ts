import { projectRoleEnum } from '@/drizzle/schema';

export type TMemberRole = (typeof projectRoleEnum.enumValues)[number];
