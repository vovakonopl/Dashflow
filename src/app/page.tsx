import { CalendarDays, CircleCheck, ListTodo, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import StatsArticle from '@/components/shared/statistics/StatsArticle';
import TitleH1 from '@/components/shared/TitleH1';
import { Button } from '@/components/ui/button';
import CenteredContent from '@/components/utils/CenteredContent';
import SignedIn from '@/components/utils/user-state/SignedIn';
import SignedOut from '@/components/utils/user-state/SignedOut';
import { cn } from '@/lib/utils/cn';

// List of snapshot placeholders that will be displayed to unauthorized users
const listOfSnapshotPlaceholders = [
  { key: 'tasksCompleted', icon: CircleCheck },
  { key: 'remainingTasks', icon: ListTodo },
  { key: 'activeProjects', icon: Rocket },
  { key: 'upcomingDeadlines', icon: CalendarDays },
];

export default function Home() {
  const t = useTranslations('homePage');

  return (
    <div className="">
      <header
        className={cn(
          'flex items-center justify-center gap-20 bg-blue-50 px-20 py-28 text-black',
          'max-xl:gap-12 max-xl:px-12',
          'max-lg:flex-col-reverse max-lg:gap-4 max-lg:py-12 max-lg:text-center',
        )}
      >
        <div className="flex max-w-96 flex-col gap-6 max-lg:max-w-lg max-lg:gap-4">
          <TitleH1 className="text-6xl font-extrabold capitalize max-xl:text-5xl max-sm:text-4xl">
            {t('title')}
          </TitleH1>

          <p className="text-xl max-xl:text-lg">{t('description')}</p>

          <Button asChild className="w-fit max-lg:mx-auto">
            <span className="capitalize">
              <SignedOut>
                <Link href="/sign-up">{t('signUp')}</Link>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard">{'toDashboard'}</Link>
              </SignedIn>
            </span>
          </Button>
        </div>

        <CenteredContent className="max-w-96 shrink-0 rounded-md bg-white max-xl:max-w-80">
          <Image
            src="/work-together.png"
            alt="Work together"
            className="w-full object-contain"
            height={524}
            width={784}
          />
        </CenteredContent>
      </header>

      <section className="px-36 py-18 max-xl:px-24 max-xl:py-12 max-lg:px-12 max-lg:py-8 max-sm:px-8">
        <h2 className="mb-9 text-center text-3xl font-bold capitalize max-xl:mb-6 max-lg:mb-4">
          {t('snapshotTitle')}
        </h2>

        <div className="flex flex-wrap justify-center gap-8 max-xl:gap-6">
          <SignedOut>
            {listOfSnapshotPlaceholders.map((placeholder) => (
              <StatsArticle
                title={t(`snapshot.${placeholder.key}.title`)}
                description={t(`snapshot.${placeholder.key}.description`)}
                key={placeholder.key}
              />
            ))}
          </SignedOut>

          <SignedIn>
            {/* TODO: add user-specific info instead of basic placeholders */}
            {listOfSnapshotPlaceholders.map((placeholder) => (
              <StatsArticle
                title={t(`snapshot.${placeholder.key}.title`)}
                description={t(`snapshot.${placeholder.key}.description`)}
                key={placeholder.key}
              />
            ))}
          </SignedIn>
        </div>
      </section>
    </div>
  );
}
