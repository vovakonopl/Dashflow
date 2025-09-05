'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PrioritySelect from '@/app/projects/[projectId]/_components/new-task/PrioritySelect';
import DatePicker from '@/components/shared/inputs/DatePicker';
import FormInput from '@/components/shared/inputs/FormInput';
import FormTextarea from '@/components/shared/inputs/FormTextarea';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TASK_LENGTHS } from '@/lib/constants/field-lengths/tasks-max-lenths';
import { TUser } from '@/lib/types/tables/user';
import { taskSchema, TTaskData } from '@/lib/validation/task-schema';

type TNewTaskFormProps = {
  members: TUser[];
  projectId: string;
};

const NewTaskForm = ({ members, projectId }: TNewTaskFormProps) => {
  const form = useForm<TTaskData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'low',
      projectId,
    },
  });

  const onSubmit = (data: TTaskData) => {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key as keyof TTaskData];
      let strValue: string;

      if (value instanceof Date) {
        // stringify date object
        strValue = value.toISOString();
      } else {
        // description may be empty
        strValue = value ?? '';
      }

      formData.set(key, strValue);
    }

    // startTransition(() => action(formData));
  };

  return (
    <ScrollArea className="-mr-4 h-[50dvh] pr-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
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
                  label="Description"
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

          <Separator />

          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button className="cursor-pointer" type="submit">
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default NewTaskForm;
