import { useTranslations } from 'next-intl';
import NewTaskForm from '@/components/shared/forms/TaskForm';
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

      <NewTaskForm projectId={props.projectId} />
    </DialogContent>
  );
};

export default NewTaskDialog;
