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
import { PROJECT_LENGTHS } from '@/lib/constants/project-lengths';
import { TFormActionReturn } from '@/lib/types/form-action-return';
import { projectSchema, TProjectData } from '@/lib/validation/project-schema';

type TProjectFormProps = {
  defaultValues?: Partial<TProjectData>;
  action: (
    _: unknown,
    formData: FormData,
  ) => Promise<TFormActionReturn<TProjectData>>;
  submitButtonText: string;
};

const ProjectForm = ({
  defaultValues,
  action: submitAction,
  submitButtonText,
}: TProjectFormProps) => {
  const [state, action, isPending] = useActionState(submitAction, undefined);
  const form = useForm<TProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      ...defaultValues, // it will override the default empty values
    },
  });

  // handle errors from the action
  useEffect(() => {
    if (!state || state.isSuccess) return;

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
            {submitButtonText}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ProjectForm;
