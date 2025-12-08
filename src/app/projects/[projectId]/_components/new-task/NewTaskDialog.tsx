import { useTranslations } from 'next-intl';
import NewTaskForm from '@/app/projects/[projectId]/_components/new-task/NewTaskForm';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TUser } from '@/lib/types/tables/user';

type TNewTaskDialogProps = {
  projectId: string;
  members: TUser[];
};

const NewTaskDialog = (props: TNewTaskDialogProps) => {
  const t = useTranslations('projects.project.tasks.modal');

  return (
    <DialogContent>
      <DialogHeader className="gap-1">
        <DialogTitle className="font-archivo text-2xl capitalize">
          {t('title')}
        </DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
      </DialogHeader>

      <NewTaskForm {...props} />
    </DialogContent>
  );
};

export default NewTaskDialog;
