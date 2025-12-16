import { z } from 'zod';
import { TASK_LENGTHS } from '@/lib/constants/field-lengths/tasks-max-lengths';
import { priorities } from '@/lib/types/tables/task-priority-enum';

export const taskSchema = z.object({
  title: z
    .string()
    .min(
      TASK_LENGTHS.title.min,
      `Minimum lengths is ${TASK_LENGTHS.title.min} characters`,
    )
    .max(
      TASK_LENGTHS.title.max,
      `Maximum lengths is ${TASK_LENGTHS.title.max} characters`,
    ),

  description: z
    .string()
    .max(
      TASK_LENGTHS.description.max,
      `Maximum lengths is ${TASK_LENGTHS.description.max} characters`,
    )
    .optional(),

  deadline: z.date({ message: 'Date is expected' }),

  priority: z.enum(priorities, {
    message: `Priority is required (${priorities.join(' | ')})`,
  }),

  projectId: z.string(),

  assignedMemberIds: z.array(z.string()).min(1, 'Select at least one member'),
});

export type TTaskData = z.infer<typeof taskSchema>;
