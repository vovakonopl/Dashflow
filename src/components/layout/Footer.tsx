import Link from 'next/link';
import Github from '@/../public/icons/github.svg';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/cn';

const Footer = () => {
  return (
    <div className="mt-auto">
      <Separator />

      <footer
        className={cn(
          'flex items-center justify-between gap-4 px-16 py-10',
          'max-lg:px-12 max-lg:py-8',
        )}
      >
        <p>© 2025 Dashflow. All content and design by Vova Konoplianyk.</p>
        <Link
          className="fill-foreground size-6"
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
