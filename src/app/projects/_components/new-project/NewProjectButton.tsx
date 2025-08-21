import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';

const NewProjectButton = () => {
  return (
    <DialogTrigger asChild>
      <Button className="cursor-pointer">Create New Project</Button>
    </DialogTrigger>
  );
};

export default NewProjectButton;
