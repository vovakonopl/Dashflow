import { eq } from 'drizzle-orm';
import { Pencil, Users } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import LeadersOnly from '@/app/projects/[projectId]/_components/LeadersOnly';
import MembersList from '@/app/projects/[projectId]/_components/MembersList';
import OwnerOnly from '@/app/projects/[projectId]/_components/OwnerOnly';
import SectionCard from '@/app/projects/[projectId]/_components/SectionCard';
import SectionTitle from '@/app/projects/[projectId]/_components/SectionTitle';
import TaskRow from '@/app/projects/[projectId]/_components/table/TaskRow';
import TitleH1 from '@/components/shared/TitleH1';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { projects } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TProjectWithTasksAndUsers } from '@/lib/types/project';
import { DB_USER_INCLUDED_COLUMNS } from '@/lib/types/user';

type TProjectPage = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: TProjectPage) {
  const { userId } = await verifySession();
  const projectId = (await params).projectId;

  // project data + all tasks + all users
  const project: TProjectWithTasksAndUsers | undefined =
    await db.query.projects.findFirst({
      where: eq(projects.id, projectId),
      with: {
        tasks: {
          with: {
            assignedMembers: true,
          },
        },

        members: {
          with: {
            user: {
              columns: DB_USER_INCLUDED_COLUMNS,
            },
          },
        },
      },
    });

  // if project is not found
  if (!project) {
    notFound();
  }

  // if the user is not a member of the project
  if (!project.members.some(({ userId: memberId }) => userId === memberId)) {
    redirect('/projects');
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex justify-between gap-4 break-all max-md:flex-col">
        <TitleH1>{project.name}</TitleH1>

        <div className="flex gap-3 max-lg:flex-col max-md:flex-row max-sm:flex-col">
          <OwnerOnly ownerId={project.ownerId} userId={userId}>
            <Button className="cursor-pointer" size="lg" variant="outline">
              <Pencil className="mr-1" />
              Edit Project
            </Button>
          </OwnerOnly>

          <LeadersOnly project={project} userId={userId}>
            <Button className="cursor-pointer" size="lg">
              <Users className="mr-1" />
              Add Member
            </Button>
          </LeadersOnly>
        </div>
      </div>

      {/* articles */}
      <div className="">{/* TODO: add articles */}</div>

      <div className="flex gap-6 max-lg:flex-col">
        {/* display modal sheet with list of members on smaller screens */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full">View Members</Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader className="gap-0">
                <SheetTitle>Assigned Members</SheetTitle>
              </SheetHeader>

              <Separator className="mx-2 -mt-4" />

              <div className="overflow-y-auto px-4 pb-4">
                <MembersList
                  project={project}
                  userId={userId}
                  className="h-full w-full"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* main content */}
        <div className="flex flex-1 flex-col gap-6">
          {project.description && (
            <SectionCard>
              <CardHeader>
                <SectionTitle>Project Description</SectionTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </SectionCard>
          )}

          {/* list of tasks */}
          <SectionCard>
            <CardHeader>
              <SectionTitle>Project Tasks</SectionTitle>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due date</TableHead>
                    <TableHead className="text-right">Priority</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="text-muted-foreground">
                  {project.tasks.map((task) => (
                    <TaskRow task={task} key={task.id} />
                  ))}
                </TableBody>

                {project.tasks.length === 0 && (
                  <TableCaption className="text-base italic">
                    No tasks yet
                  </TableCaption>
                )}
              </Table>
            </CardContent>
          </SectionCard>

          {/* TODO: pagination under table (if required) */}
        </div>

        {/* member list */}
        {/* display the list on larger screens*/}
        <SectionCard
          cardClassName="w-full"
          className="w-fit max-w-96 min-w-72 max-lg:hidden"
        >
          <CardHeader className="gap-0">
            <SectionTitle>Assigned Members</SectionTitle>
          </CardHeader>

          <CardContent className="">
            <MembersList project={project} userId={userId} />
          </CardContent>
        </SectionCard>
      </div>
    </div>
  );
}
