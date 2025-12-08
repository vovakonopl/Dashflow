import { useTranslations } from 'next-intl';
import ProjectForm from '@/components/shared/forms/ProjectForm';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { newProject } from '@/lib/actions/project/new-project';

const NewProjectModal = () => {
  const t = useTranslations('projects.project.form.newProject');

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="capitalize">{t('title')}</DialogTitle>
      </DialogHeader>

      <Separator />

      <ProjectForm action={newProject} submitButtonText={t('submit')} />
    </DialogContent>
  );
};

export default NewProjectModal;
