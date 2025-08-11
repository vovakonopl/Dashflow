import { ComponentProps } from 'react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

export const AuthCard = (props: ComponentProps<typeof Card>) => {
  return <Card {...props} className={cn('w-[28rem]', props.className)} />;
};

export const AuthCardTitle = ({
  children,
  ...props
}: ComponentProps<typeof CardTitle>) => {
  return (
    <CardTitle
      {...props}
      className={cn(
        'font-archivo mb-4 text-center text-4xl font-bold',
        props.className,
      )}
    >
      <h1>{children}</h1>
    </CardTitle>
  );
};

export const AuthCardDescription = ({
  children,
  ...props
}: ComponentProps<typeof CardDescription>) => {
  return (
    <CardDescription
      {...props}
      className={cn('text-center text-base', props.className)}
    >
      <p>{children}</p>
    </CardDescription>
  );
};
