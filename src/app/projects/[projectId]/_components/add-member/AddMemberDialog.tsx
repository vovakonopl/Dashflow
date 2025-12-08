import { useTranslations } from 'next-intl';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AddMemberInput from './AddMemberInput';

const AddMemberDialog = () => {
  const t = useTranslations('projects.project.members.modal');

  return (
    <DialogContent>
      <DialogHeader className="gap-1">
        <DialogTitle className="font-archivo text-2xl">
          {t('title')}
        </DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
      </DialogHeader>

      <AddMemberInput />
    </DialogContent>
  );
};

export default AddMemberDialog;
