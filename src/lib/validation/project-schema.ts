import { z } from 'zod';
import { PROJECT_LENGTHS } from '@/lib/constants/project-lengths';

export const projectSchema = z.object({
  name: z
    .string()
    .min(PROJECT_LENGTHS.name.min, {
      message: `Minimum length is ${PROJECT_LENGTHS.name.min} characters`,
    })
    .max(PROJECT_LENGTHS.name.max, {
      message: `Maximum length is ${PROJECT_LENGTHS.name.max} characters`,
    }),
  description: z
    .string()
    .max(PROJECT_LENGTHS.description.max, {
      message: `Maximum length is ${PROJECT_LENGTHS.description.max} characters`,
    })
    .optional(),
});

export type TProjectData = z.infer<typeof projectSchema>;
