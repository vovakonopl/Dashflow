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
};

const EditProjectDialog = ({ project }: TEditProjectDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader className="gap-1">
        <DialogTitle className="font-archivo text-2xl">
          Edit the project
        </DialogTitle>
        <DialogDescription>
          Change the project&apos;s name and description.
        </DialogDescription>
      </DialogHeader>

      <EditProjectForm project={project} />
    </DialogContent>
  );
};

export default EditProjectDialog;
