import { projectSchema } from '@/lib/validation/project-schema';

describe('Project validation schema', () => {
  test('should validate correct project', () => {
    const project = {
      name: 'New project',
      description: 'Project description',
    };

    const result: boolean = projectSchema.safeParse(project).success;
    expect(result).toBe(true);
  });

  test('should validate with empty description', () => {
    const project = {
      name: 'New project',
      description: '',
    };

    const result: boolean = projectSchema.safeParse(project).success;
    expect(result).toBe(true);
  });

  test('should validate without description field', () => {
    const project = {
      name: 'New project',
    };

    const result: boolean = projectSchema.safeParse(project).success;
    expect(result).toBe(true);
  });

  test('should not validate: name is too short', () => {
    const project = {
      name: 'P',
      description: 'description',
    };

    const result: boolean = projectSchema.safeParse(project).success;
    expect(result).toBe(false);
  });

  test('should not validate: name is too long', () => {
    const project = {
      name: 'a'.repeat(1100),
      description: 'description',
    };

    const result: boolean = projectSchema.safeParse(project).success;
    expect(result).toBe(false);
  });

  test('should not validate: name is undefined', () => {
    const project = {
      description: 'description',
    };

    const result: boolean = projectSchema.safeParse(project).success;
    expect(result).toBe(false);
  });
});
