import { taskPriorityEnum } from '@/drizzle/schema';

export const priorities = ['low', 'medium', 'high', 'critical'] as const;

export type TTaskPriority = (typeof taskPriorityEnum.enumValues)[number];
