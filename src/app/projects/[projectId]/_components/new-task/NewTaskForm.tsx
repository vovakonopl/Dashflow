'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDialog } from '@/app/projects/[projectId]/_components/dialog-context';
import MembersToAssignSelect from '@/app/projects/[projectId]/_components/new-task/MembersToAssignSelect';
import PrioritySelect from '@/app/projects/[projectId]/_components/new-task/PrioritySelect';
import DatePicker from '@/components/shared/inputs/DatePicker';
import FormInput from '@/components/shared/inputs/FormInput';
import FormTextarea from '@/components/shared/inputs/FormTextarea';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { newTask } from '@/lib/actions/task/new-task';
import { TASK_LENGTHS } from '@/lib/constants/field-lengths/tasks-max-lenths';
import { TUser } from '@/lib/types/tables/user';
import { taskSchema, TTaskData } from '@/lib/validation/task-schema';

type TNewTaskFormProps = {
  members: TUser[];
  projectId: string;
};

const NewTaskForm = ({ members, projectId }: TNewTaskFormProps) => {
  const [state, action, isPending] = useActionState(newTask, undefined);
  const { setIsOpen } = useDialog();
  const form = useForm<TTaskData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'low',
      assignedMemberIds: [],
      projectId,
    },
  });

  // handle errors from the action
  useEffect(() => {
    if (!state || state.isSuccess) return;

    const { errors } = state;
    for (const field in errors) {
      const error = errors[field as keyof typeof errors]?.errors[0];
      form.setError(field as keyof TTaskData, {
        message: error,
      });
    }
  }, [form, state]);

  // close the dialog on success
  useEffect(() => {
    if (state?.isSuccess) {
      setIsOpen(false);
    }
  }, [setIsOpen, state]);

  const onSubmit = (data: TTaskData) => {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key as keyof TTaskData];

      // stringify date object
      if (value instanceof Date) {
        formData.set(key, value.toISOString());
        continue;
      }

      // append each id in array
      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(key, val));
        continue;
      }

      formData.set(key, value ?? '');
    }

    startTransition(() => action(formData));
  };

  return (
    <ScrollArea className="-mr-4 h-[50dvh] pr-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-4 px-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field, fieldState: { error } }) => (
              <FormInput
                {...field}
                error={error?.message}
                label="Task title"
                placeholder="New task"
                type="text"
                minLength={TASK_LENGTHS.title.min}
                maxLength={TASK_LENGTHS.title.max}
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
                label="Description"
                placeholder="Optional task description"
                maxLength={TASK_LENGTHS.description.max}
              />
            )}
          />

          <div className="flex justify-between gap-4 max-sm:flex-col">
            <FormField
              control={form.control}
              name="deadline"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  id="deadline"
                  classNames={{ container: 'flex-1', trigger: 'w-full' }}
                  error={error?.message}
                  label="Deadline"
                />
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field, fieldState: { error } }) => (
                <PrioritySelect {...field} error={error?.message} />
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="assignedMemberIds"
            render={({ field, fieldState: { error } }) => (
              <MembersToAssignSelect
                error={error?.message}
                members={members}
                values={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Separator />

          <DialogFooter>
            <DialogClose asChild disabled={isPending}>
              <Button className="cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default NewTaskForm;
