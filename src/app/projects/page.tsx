import { count, eq, getTableColumns, sql } from 'drizzle-orm';
import NewProjectButton from '@/app/projects/_components/new-project/NewProjectButton';
import NewProjectModal from '@/app/projects/_components/new-project/NewProjectModal';
import ProjectCard from '@/app/projects/_components/ProjectCard';
import ProjectOverview from '@/app/projects/_components/ProjectOverview';
import TitleH1 from '@/components/shared/TitleH1';
import { Dialog } from '@/components/ui/dialog';
import { projectMembers, projects, tasks } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/server/session';
import { TProjectWithTasksProgress } from '@/lib/types/tables/project';

// Fetches all projects in which user is a member
// with information about the number of all tasks and completed ones.
async function getUserProjects(
  userId: string,
): Promise<TProjectWithTasksProgress[]> {
  const result = await db
    .select({
      ...getTableColumns(projects),
      totalTasks: count(tasks.id),
      completedTasks: sql`count(case when ${tasks.completed} = true then 1 else null end)`,
    })
    .from(projects)
    .leftJoin(tasks, eq(projects.id, tasks.projectId))
    .leftJoin(projectMembers, eq(projects.id, projectMembers.projectId))
    .where(eq(projectMembers.userId, userId))
    .groupBy(projects.id);

  return result as TProjectWithTasksProgress[];
}

export default async function ProjectsPage() {
  // Get user id to fetch the required projects
  const { userId } = await verifySession();
  const projects: TProjectWithTasksProgress[] = await getUserProjects(userId);

  return (
    <Dialog>
      <div className="flex flex-col gap-6 p-8 max-md:gap-4 max-md:p-4">
        <div className="flex justify-between gap-4 max-md:flex-col">
          <TitleH1 className="max-md:text-center">My Projects</TitleH1>
          <NewProjectButton />
        </div>

        <ProjectOverview projectsCount={8} />

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(16.75rem,1fr))] gap-6">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <NewProjectModal />
      </div>
    </Dialog>
  );
}
