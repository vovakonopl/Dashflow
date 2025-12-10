import { useTranslations } from 'next-intl';
import EditProjectForm from '@/app/projects/[projectId]/_components/edit-project/EditProjectForm';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TProject } from '@/lib/types/tables/project';

type TEditProjectDialogProps = {
  project: TProject;
  userId: string;
};

const EditProjectDialog = ({ project, userId }: TEditProjectDialogProps) => {
  const t = useTranslations('projects.project.form.editProject');

  return (
    <DialogContent>
      <DialogHeader className="gap-1">
        <DialogTitle className="font-archivo text-2xl">
          {t('title')}
        </DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
      </DialogHeader>

      <EditProjectForm project={project} userId={userId} />
    </DialogContent>
  );
};

export default EditProjectDialog;
