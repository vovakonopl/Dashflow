import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Github from '@/../public/icons/github.svg';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/cn';

const Footer = () => {
  const t = useTranslations('layout.footer');

  return (
    <div className="mt-auto">
      <Separator />

      <footer
        className={cn(
          'flex items-center justify-between gap-4 px-16 py-10',
          'max-lg:px-12 max-lg:py-8',
        )}
      >
        <p>{t('caption')}</p>
        <Link
          className="fill-foreground size-6 min-w-6"
          href="https://github.com/vovakonopl/Dashflow"
          target="_blank"
        >
          <Github />
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
