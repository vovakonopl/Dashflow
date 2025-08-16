import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CenteredContent from '@/components/utils/CenteredContent';

export default function NotFound() {
  return (
    <CenteredContent>
      <div className="box-content flex max-w-[28rem] flex-col items-center gap-8 px-6 text-center max-md:gap-4">
        <h1 className="font-archivo text-6xl font-extrabold max-md:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="text-muted-foreground text-xl max-md:text-lg">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable. Please check the URL or return
          to main page.
        </p>
        <Button asChild className="active:bg-primary/80 cursor-pointer">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </CenteredContent>
  );
}
