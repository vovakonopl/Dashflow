import NewProjectForm from '@/app/projects/_components/new-project/NewProjectForm';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const NewProjectModal = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Project</DialogTitle>
      </DialogHeader>

      <Separator />

      {/* Contains DialogFooter component*/}
      <NewProjectForm />
    </DialogContent>
  );
};

export default NewProjectModal;
