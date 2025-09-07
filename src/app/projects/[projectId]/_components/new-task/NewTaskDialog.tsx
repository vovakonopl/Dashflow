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
  return (
    <DialogContent>
      <DialogHeader className="gap-1">
        <DialogTitle className="font-archivo text-2xl">
          Create new task
        </DialogTitle>
        <DialogDescription>
          Enter the task details below. You can assign it to a team member and
          set a due date.
        </DialogDescription>
      </DialogHeader>

      <NewTaskForm {...props} />
    </DialogContent>
  );
};

export default NewTaskDialog;
