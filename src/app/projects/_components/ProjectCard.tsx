import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TProjectWithTasksProgress } from '@/lib/types/tables/project';
import { cn } from '@/lib/utils/cn';

type TProjectCardProps = {
  project: TProjectWithTasksProgress;
};

const ProjectCard = ({ project }: TProjectCardProps) => {
  const t = useTranslations('projects.project');
  const progressPercentage: number =
    (project.completedTasks / project.totalTasks) * 100;

  return (
    <Card className="h-full justify-between">
      <CardHeader>
        <h3 className="text-lg font-semibold hover:underline">
          <Link href={`/projects/${project.id}`}>{project.name}</Link>
        </h3>
      </CardHeader>

      <CardContent>
        {project.description && (
          <p
            className={cn(
              'text-muted-foreground mb-4 line-clamp-4 max-h-20 text-sm break-words break-all text-ellipsis',
            )}
          >
            {project.description}
          </p>
        )}

        {/* Slider with % of completed tasks */}
        <div className="text-sm">
          {project.totalTasks <= 0 ? (
            <span className="text-muted-foreground italic">{t('noTasks')}</span>
          ) : (
            <>
              <Progress value={progressPercentage} className="mb-1" />
              <span className="text-primary">
                {project.completedTasks}/{project.totalTasks}{' '}
                {t('tasksCompleted')}
              </span>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/projects/${project.id}`} className="capitalize">
            {t('view')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
