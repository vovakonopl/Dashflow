'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import OwnerOnly from '@/app/projects/[projectId]/_components/OwnerOnly';
import ErrorMessage from '@/components/shared/ErrorMessage';
import FormInput from '@/components/shared/inputs/FormInput';
import FormTextarea from '@/components/shared/inputs/FormTextarea';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { deleteProject } from '@/lib/actions/project/delete-project';
import { PROJECT_LENGTHS } from '@/lib/constants/field-lengths/project-lengths';
import { useServerAction } from '@/lib/hooks/useServerAction';
import { TServerActionReturn } from '@/lib/types/action-return';
import { projectSchema, TProjectData } from '@/lib/validation/project-schema';

type TProjectFormProps = {
  action: (formData: FormData) => Promise<TServerActionReturn<TProjectData>>;
  defaultValues?: Partial<TProjectData>;
  submitButtonText: string;
  ownerId: string;
  userId: string;
  projectId?: string;
  isEditing?: boolean;
};

const ProjectForm = ({
  defaultValues,
  action: submitServerAction,
  submitButtonText,
  ownerId,
  userId,
  projectId,
  isEditing,
}: TProjectFormProps) => {
  const t = useTranslations('projects.project.form');
  const [submitState, submitAction, submitIsPending] =
    useServerAction(submitServerAction);
  const [deleteState, deleteAction, deleteIsPending] =
    useServerAction(deleteProject);
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
    if (!submitState || submitState.isSuccess) return;

    const { errors } = submitState;
    for (const field in errors) {
      const error = errors[field as keyof typeof errors]?.[0];
      form.setError(field as keyof TProjectData, {
        message: error,
      });
    }
  }, [form, submitState]);

  const onSubmit = (data: TProjectData) => {
    const formData = new FormData();
    for (const key in data) {
      formData.set(key, data[key as keyof TProjectData] ?? '');
    }

    submitAction(formData);
  };

  return (
    <Form {...form}>
      <Dialog>
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
                label={t('field.name.label')}
                placeholder={t('field.name.placeholder')}
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
                label={t('field.description.label')}
                placeholder={t('field.description.placeholder')}
                maxLength={PROJECT_LENGTHS.description.max}
              />
            )}
          />

          <Separator />

          <DialogFooter className="flex flex-row gap-5 max-sm:flex-col-reverse sm:justify-between">
            <OwnerOnly ownerId={ownerId} userId={userId}>
              <div className="max-sm:flex-1">
                {isEditing && (
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full capitalize">
                      {t('deleteProject.action')}
                    </Button>
                  </DialogTrigger>
                )}
              </div>
            </OwnerOnly>

            <div className="flex flex-1 justify-end gap-2 max-sm:flex-col-reverse">
              <DialogClose asChild>
                <Button className="cursor-pointer" variant="outline">
                  {t('cancel')}
                </Button>
              </DialogClose>

              <Button
                className="cursor-pointer capitalize"
                type="submit"
                disabled={submitIsPending}
              >
                {submitButtonText}
              </Button>
            </div>
          </DialogFooter>
        </form>

        <DialogContent className="w-md">
          <DialogHeader>
            <DialogTitle>{t('deleteProject.title')}</DialogTitle>

            <DialogDescription>
              {t('deleteProject.description')}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="flex gap-x-3 gap-y-2 max-sm:flex-col">
              <Button
                disabled={deleteIsPending}
                className="flex-1 capitalize"
                variant="destructive"
                onClick={() => deleteAction(projectId ?? '')}
              >
                {t('deleteProject.action')}
              </Button>

              <DialogClose asChild>
                <Button className="flex-1">{t('cancel')}</Button>
              </DialogClose>
            </div>

            {deleteState && !deleteState.isSuccess && (
              <ErrorMessage className="px-2">
                {deleteState.errors.root}
              </ErrorMessage>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default ProjectForm;
