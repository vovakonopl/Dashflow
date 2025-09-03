'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/shared/FormInput';
import FormTextarea from '@/components/shared/FormTextarea';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { newProject } from '@/lib/actions/project/new-project';
import { PROJECT_LENGTHS } from '@/lib/constants/project-lengths';
import { projectSchema, TProjectData } from '@/lib/validation/project-schema';

const NewProjectForm = () => {
  const [state, action, isPending] = useActionState(newProject, undefined);
  const form = useForm<TProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (!state) return;

    const { errors } = state;
    for (const field in errors) {
      const error = errors[field as keyof typeof errors]?.errors[0];
      form.setError(field as keyof TProjectData, {
        message: error,
      });
    }
  }, [form, state]);

  const onSubmit = (data: TProjectData) => {
    const formData = new FormData();
    for (const key in data) {
      formData.set(key, data[key as keyof TProjectData] ?? '');
    }

    startTransition(() => action(formData));
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <FormInput
              {...field}
              error={error?.message}
              label="Project name"
              placeholder="My project"
              type="text"
              minLength={PROJECT_LENGTHS.name.min}
              maxLength={PROJECT_LENGTHS.name.max}
            />
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState: { error } }) => (
            <FormTextarea
              {...field}
              className="min-h-24"
              error={error?.message}
              label="Project description"
              placeholder="Optional description"
              maxLength={PROJECT_LENGTHS.description.max}
            />
          )}
        />

        <Separator />

        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button className="cursor-pointer" type="submit" disabled={isPending}>
            Create Project
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default NewProjectForm;
