import { eq } from 'drizzle-orm';
import { Pencil, Users } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import EditProjectDialog from '@/app/projects/[projectId]/_components/edit-project/EditProjectDialog';
import TitleH1 from '@/components/shared/TitleH1';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { projects } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TProjectWithTasksAndUsers } from '@/lib/types/tables/project';
import { DB_USER_INCLUDED_COLUMNS } from '@/lib/types/tables/user';
import AddMemberDialog from './_components/add-member/AddMemberDialog';
import { DialogProvider } from './_components/dialog-context';
import LeadersOnly from './_components/LeadersOnly';
import MembersList from './_components/members/MembersList';
import OwnerOnly from './_components/OwnerOnly';
import SectionCard from './_components/SectionCard';
import SectionTitle from './_components/SectionTitle';
import { PaginationProvider } from './_components/table/pagination/pagination-context';
import TasksPagination from './_components/table/pagination/TasksPagination';
import TasksTable from './_components/table/TasksTable';

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
    <div className="flex flex-col gap-6 p-8 max-md:p-4">
      <div className="flex justify-between gap-4 break-all max-md:flex-col md:items-center">
        <TitleH1 className="max-sm:text-center">{project.name}</TitleH1>

        <div className="flex gap-3 max-lg:flex-col max-md:flex-row max-sm:flex-col">
          <OwnerOnly ownerId={project.ownerId} userId={userId}>
            <DialogProvider>
              <DialogTrigger asChild>
                <Button className="cursor-pointer" size="lg" variant="outline">
                  <Pencil className="mr-1" />
                  Edit Project
                </Button>
              </DialogTrigger>

              <EditProjectDialog project={project} />
            </DialogProvider>
          </OwnerOnly>

          <LeadersOnly project={project} userId={userId}>
            <DialogProvider>
              <DialogTrigger asChild>
                <Button className="cursor-pointer" size="lg">
                  <Users className="mr-1" />
                  Add Member
                </Button>
              </DialogTrigger>

              <AddMemberDialog />
            </DialogProvider>
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

              <div className="overflow-y-auto pb-4">
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

            <PaginationProvider>
              <CardContent className="flex">
                <TasksTable tasks={project.tasks} />
              </CardContent>

              <CardFooter className="empty:hidden">
                <TasksPagination tasksCount={project.tasks.length} />
              </CardFooter>
            </PaginationProvider>
          </SectionCard>
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

          <CardContent className="px-2">
            <MembersList project={project} userId={userId} />
          </CardContent>
        </SectionCard>
      </div>
    </div>
  );
}
