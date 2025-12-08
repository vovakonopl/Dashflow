import { useTranslations } from 'next-intl';

type TProjectOverviewProps = {
  projectsCount: number;
};

const ProjectOverview = ({ projectsCount }: TProjectOverviewProps) => {
  const t = useTranslations('projects.overview');

  return (
    <div className="border-border flex flex-col gap-2 rounded-lg border p-6 md:max-w-lg">
      <h2 className="title text-xl font-semibold">{t('title')}</h2>

      <p className="text-muted-foreground text-sm capitalize">
        <span className="text-primary mr-2 text-5xl font-bold">
          {projectsCount}
        </span>
        {t('totalProjects')}
      </p>

      <p className="text-muted-foreground text-sm">{t('description')}</p>
    </div>
  );
};

export default ProjectOverview;
