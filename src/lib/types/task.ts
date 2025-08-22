import { InferSelectModel } from 'drizzle-orm';
import { taskAssignments, taskPriorityEnum, tasks } from '@/drizzle/schema';

export type TTask = InferSelectModel<typeof tasks>;
export type TTaskWithMemberIds = TTask & {
  assignedMembers: InferSelectModel<typeof taskAssignments>[];
};

export type TTaskPriority = (typeof taskPriorityEnum.enumValues)[number];
