import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const EditProjectDialog = () => {
  return (
    <DialogContent>
      <DialogHeader className="gap-1">
        <DialogTitle className="font-archivo text-2xl">
          Edit the project
        </DialogTitle>
      </DialogHeader>
    </DialogContent>
  );
};

export default EditProjectDialog;
