type TProjectOverviewProps = {
  projectsCount: number;
};

const ProjectOverview = ({ projectsCount }: TProjectOverviewProps) => {
  return (
    <div className="border-border flex flex-col gap-2 rounded-lg border p-6 md:max-w-lg">
      <h2 className="text-xl font-semibold">Project Overview</h2>

      <p className="text-muted-foreground text-sm">
        <span className="text-primary mr-2 text-5xl font-bold">
          {projectsCount}
        </span>
        Total Projects
      </p>

      <p className="text-muted-foreground text-sm">
        Effectively manage all your projects, track progress, and collaborate
        seamlessly with your team.
      </p>
    </div>
  );
};

export default ProjectOverview;
