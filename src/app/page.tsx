import { CalendarDays, CircleCheck, ListTodo, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';
import TitleH1 from '@/components/shared/TitleH1';
import UserProgressArticle from '@/components/shared/UserProgressArticle';
import { Button } from '@/components/ui/button';
import CenteredContent from '@/components/utils/CenteredContent';
import SignedIn from '@/components/utils/user-state/SignedIn';
import SignedOut from '@/components/utils/user-state/SignedOut';
import { cn } from '@/lib/utils/cn';

// List of snapshot placeholders that will be displayed to unauthorised users
const listOfSnapshotPlaceholders: ComponentProps<typeof UserProgressArticle>[] =
  [
    {
      title: 'Tasks Completed',
      description: "Track how many tasks you've completed this week",
      icon: CircleCheck,
    },
    {
      title: 'Remaining Tasks',
      description: 'See how many tasks remain to be completed',
      icon: ListTodo,
    },
    {
      title: 'Active Projects',
      description: 'See how many projects are currently in progress',
      icon: Rocket,
    },
    {
      title: 'Upcoming Deadlines',
      description: 'View your most critical project deadlines',
      icon: CalendarDays,
    },
  ];

export default function Home() {
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
          <TitleH1 className="max-xl:text-5xl max-sm:text-4xl">
            Unlock Your Check&apos;s Full Potential
          </TitleH1>

          <p className="text-xl max-xl:text-lg">
            Streamline project tasks, collaborate effortlessly, and achieve your
            goals faster with Dashflow. Your ultimate hub for productivity.
          </p>

          <Button asChild className="w-fit max-lg:mx-auto">
            <span>
              <SignedOut>
                <Link href="/sign-up">Get Started – It&apos;s Free</Link>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard">Go To Dashboard</Link>
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
        <h2 className="mb-9 text-center text-3xl font-bold max-xl:mb-6 max-lg:mb-4">
          Your Productivity Snapshot
        </h2>

        <div className="flex flex-wrap justify-center gap-8 max-xl:gap-6">
          <SignedOut>
            {listOfSnapshotPlaceholders.map((placeholder) => (
              <UserProgressArticle {...placeholder} key={placeholder.title} />
            ))}
          </SignedOut>

          <SignedIn>
            {/* TODO: add user-specific info instead of basic placeholders */}
            {listOfSnapshotPlaceholders.map((placeholder) => (
              <UserProgressArticle {...placeholder} key={placeholder.title} />
            ))}
          </SignedIn>
        </div>
      </section>
    </div>
  );
}
