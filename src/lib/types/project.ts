import { InferSelectModel } from 'drizzle-orm';
import { projects } from '@/drizzle/schema';

export type TProject = InferSelectModel<typeof projects>;
export type TProjectWithTasksProgress = TProject & {
  totalTasks: number;
  completedTasks: number;
};
