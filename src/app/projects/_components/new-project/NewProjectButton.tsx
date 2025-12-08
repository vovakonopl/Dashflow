import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';

const NewProjectButton = () => {
  const t = useTranslations('projects');

  return (
    <DialogTrigger asChild>
      <Button className="cursor-pointer capitalize">{t('newProject')}</Button>
    </DialogTrigger>
  );
};

export default NewProjectButton;
