import { LucideIcon } from 'lucide-react';
import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

type TUserProgressArticleProps = {
  description: string;
  icon: LucideIcon;
  title: string;
  value?: string | number;
} & ComponentProps<'article'>;

const UserProgressArticle = ({
  className,
  description,
  icon: Icon,
  title,
  value,
  ...props
}: TUserProgressArticleProps) => {
  return (
    <article
      {...props}
      className={cn(
        'border-border bg-background flex aspect-[4/3] w-64 flex-col justify-between',
        'rounded-lg border px-6 py-4 text-neutral-600 shadow-xs max-lg:w-56 dark:text-neutral-200',
        className,
      )}
    >
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span
          className={cn(
            'flex items-center justify-center rounded-full',
            'bg-neutral-200 p-2 dark:bg-neutral-400',
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>

      {value !== undefined && (
        <span className="text-primary mb-1 text-4xl font-extrabold">
          {value}
        </span>
      )}

      <p className="text-sm">{description}</p>
    </article>
  );
};

export default UserProgressArticle;
