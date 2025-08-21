import { InferSelectModel } from 'drizzle-orm';
import { projectMembers, projects } from '@/drizzle/schema';
import { TTaskWithMemberIds } from '@/lib/types/task';
import { TUser } from '@/lib/types/user';

export type TProject = InferSelectModel<typeof projects>;
export type TProjectWithTasksProgress = TProject & {
  totalTasks: number;
  completedTasks: number;
};
export type TProjectWithTasksAndUsers = TProject & {
  tasks: TTaskWithMemberIds[];
  members: (InferSelectModel<typeof projectMembers> & { user: TUser })[];
};
