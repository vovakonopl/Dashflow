import { LucideIcon } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

// both variants of final props will contain these props
type TBaseProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

// simple number or string will be displayed as main content (can be empty)
type TWithValue = {
  children?: never;
  value?: string | number;
};

// component can be displayed as main content
type TWithChildren = {
  children: ReactNode;
  value?: never;
};

type TUserProgressArticleProps = TBaseProps &
  (TWithValue | TWithChildren) &
  ComponentProps<'article'>;

const StatsArticle = ({
  children,
  title,
  description,
  icon: Icon,
  value,
  ...articleProps
}: TUserProgressArticleProps) => {
  return (
    <article
      {...articleProps}
      className={cn(
        'border-border bg-background flex aspect-[4/3] w-64 flex-col justify-between',
        'rounded-lg border px-6 py-4 text-neutral-600 shadow-xs max-lg:w-56 dark:text-neutral-200',
        articleProps.className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold capitalize">{title}</h3>

        {Icon && (
          <span
            className={cn(
              'flex items-center justify-center self-start rounded-full',
              'bg-neutral-200 p-2 dark:bg-neutral-400',
            )}
          >
            <Icon className="size-5" />
          </span>
        )}
      </div>

      {!children && value !== undefined && (
        <span className="text-primary text-4xl font-extrabold">{value}</span>
      )}

      {value === undefined && children}

      <p className="text-sm">{description}</p>
    </article>
  );
};

export default StatsArticle;
