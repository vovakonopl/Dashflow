import Link from 'next/link';
import { useTranslations } from 'next-intl';
import TitleH1 from '@/components/shared/TitleH1';
import { Button } from '@/components/ui/button';
import CenteredContent from '@/components/utils/CenteredContent';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <CenteredContent>
      <div className="box-content flex max-w-[28rem] flex-col items-center gap-8 px-6 text-center max-md:gap-4">
        <TitleH1 className="text-6xl font-extrabold capitalize max-md:text-5xl">
          {t('title')}
        </TitleH1>
        <p className="text-muted-foreground text-xl max-md:text-lg">
          {t('description')}
        </p>
        <Button
          asChild
          className="active:bg-primary/80 cursor-pointer capitalize"
        >
          <Link href="/">{t('goBack')}</Link>
        </Button>
      </div>
    </CenteredContent>
  );
}
