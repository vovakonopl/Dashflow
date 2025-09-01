import AddMemberInput from '@/app/projects/[projectId]/_components/add-member/AddMemberInput';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AddMemberDialog = () => {
  return (
    <DialogContent>
      <DialogHeader className="gap-1">
        <DialogTitle className="font-archivo text-2xl">
          Add member to the project
        </DialogTitle>
        <DialogDescription>
          Enter the user&apos;s email address to add them to the project.
        </DialogDescription>
      </DialogHeader>

      <AddMemberInput />
    </DialogContent>
  );
};

export default AddMemberDialog;
