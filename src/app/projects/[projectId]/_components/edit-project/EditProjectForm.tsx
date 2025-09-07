'use client';

import { useDialog } from '@/app/projects/[projectId]/_components/dialog-context';
import ProjectForm from '@/components/shared/forms/ProjectForm';
import { editProject } from '@/lib/actions/project/edit-project';
import { TProject } from '@/lib/types/tables/project';

type TEditProjectFormProps = {
  project: TProject;
};

const EditProjectForm = ({ project }: TEditProjectFormProps) => {
  const { setIsOpen } = useDialog();

  const handleSubmit = async (formData: FormData) => {
    formData.set('id', project.id);
    const result = await editProject(formData);

    if (result.isSuccess) {
      setIsOpen(false);
    }

    return result;
  };

  return (
    <ProjectForm
      defaultValues={{
        name: project.name,
        description: project.description || '',
      }}
      action={handleSubmit}
      submitButtonText="Submit Changes"
    />
  );
};

export default EditProjectForm;
