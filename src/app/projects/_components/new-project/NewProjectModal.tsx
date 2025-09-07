import ProjectForm from '@/components/shared/forms/ProjectForm';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { newProject } from '@/lib/actions/project/new-project';

const NewProjectModal = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Project</DialogTitle>
      </DialogHeader>

      <Separator />

      <ProjectForm action={newProject} submitButtonText="Create Project" />
    </DialogContent>
  );
};

export default NewProjectModal;
