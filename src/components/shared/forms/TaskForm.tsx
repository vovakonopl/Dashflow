'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDialog } from '@/app/projects/[projectId]/_components/dialog-context';
import MembersToAssignSelect from '@/app/projects/[projectId]/_components/new-task/MembersToAssignSelect';
import PrioritySelect from '@/app/projects/[projectId]/_components/new-task/PrioritySelect';
import { useProjectContext } from '@/app/projects/[projectId]/_components/project-members-context';
import DatePicker from '@/components/shared/inputs/DatePicker';
import FormInput from '@/components/shared/inputs/FormInput';
import FormTextarea from '@/components/shared/inputs/FormTextarea';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { newTask } from '@/lib/actions/task/new-task';
import { updateTask } from '@/lib/actions/task/update-task';
import { TASK_LENGTHS } from '@/lib/constants/field-lengths/tasks-max-lengths';
import { useServerAction } from '@/lib/hooks/useServerAction';
import { TTask } from '@/lib/types/tables/task';
import { taskSchema, TTaskData } from '@/lib/validation/task-schema';

type TTaskFormProps = {
  projectId: string;
  task?: TTask;
  assignedMemberIds?: string[];
  afterSubmit?: () => void;
};

const TaskForm = ({
  projectId,
  task,
  assignedMemberIds: defaultAssignedIds,
  afterSubmit,
}: TTaskFormProps) => {
  const t = useTranslations('projects.project.tasks.modal');
  const actionToUse = task ? updateTask.bind(null, task.id) : newTask;
  const [state, action, isPending] = useServerAction(actionToUse);
  const { members } = useProjectContext();
  const { setIsOpen } = useDialog();

  const form = useForm<TTaskData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
      priority: task?.priority ?? 'low',
      assignedMemberIds: defaultAssignedIds ?? [],
      projectId,
      deadline: task?.deadline ? new Date(task.deadline) : undefined,
    },
  });

  // handle errors from the action
  useEffect(() => {
    if (!state || state.isSuccess) return;

    const { errors } = state;
    for (const field in errors) {
      const error = errors[field as keyof typeof errors]?.[0];
      form.setError(field as keyof TTaskData, {
        message: error,
      });
    }
  }, [form, state]);

  // close the dialog on success
  useEffect(() => {
    if (state?.isSuccess) {
      if (afterSubmit) {
        afterSubmit();
      } else {
        setIsOpen(false);
      }
    }
  }, [setIsOpen, state, afterSubmit]);

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

    action(formData);
  };

  return (
    <ScrollArea className="-mr-4 max-h-[50svh] pr-4">
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
                label={t('field.title.label')}
                placeholder={t('field.title.placeholder')}
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
                label={t('field.description.label')}
                placeholder={t('field.description.placeholder')}
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
                  id="due-date"
                  classNames={{ container: 'flex-1', trigger: 'w-full' }}
                  error={error?.message}
                  label={t('field.dueDate.label')}
                  placeholder={t('field.dueDate.placeholder')}
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
                members={members.map((m) => m.user)}
                values={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Separator />

          <DialogFooter>
            <DialogClose asChild disabled={isPending}>
              <Button className="cursor-pointer capitalize" variant="outline">
                {t('actions.cancel')}
              </Button>
            </DialogClose>

            <Button
              className="cursor-pointer capitalize"
              type="submit"
              disabled={isPending}
            >
              {task ? t('actions.save') : t('actions.create')}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default TaskForm;
