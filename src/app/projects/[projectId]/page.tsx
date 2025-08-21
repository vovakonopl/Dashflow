import { eq } from 'drizzle-orm';
import { Pencil, Users } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import LeadersOnly from '@/app/projects/[projectId]/_components/LeadersOnly';
import MembersList from '@/app/projects/[projectId]/_components/MembersList';
import OwnerOnly from '@/app/projects/[projectId]/_components/OwnerOnly';
import SectionCard from '@/app/projects/[projectId]/_components/SectionCard';
import SectionTitle from '@/app/projects/[projectId]/_components/SectionTitle';
import TitleH1 from '@/components/shared/TitleH1';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
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

        <div className="flex gap-3 max-lg:flex-col max-md:flex-row">
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

      <div className="flex gap-6">
        {/* main content */}
        <div className="flex-1">
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

          {/* TODO: list of N tasks and pagination under it (if required) */}
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

        {/* display a modal list on smaller screens */}
        {/* TODO: Sheet component */}
      </div>
    </div>
  );
}
