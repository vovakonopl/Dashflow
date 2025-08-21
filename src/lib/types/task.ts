import { InferSelectModel } from 'drizzle-orm';
import { taskAssignments, tasks } from '@/drizzle/schema';

export type TTask = InferSelectModel<typeof tasks>;
export type TTaskWithMemberIds = TTask & {
  assignedMembers: InferSelectModel<typeof taskAssignments>[];
};
