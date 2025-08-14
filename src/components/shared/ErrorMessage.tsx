import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

const ErrorMessage = (props: ComponentProps<'p'>) => {
  return (
    <p {...props} className={cn('text-destructive text-sm', props.className)} />
  );
};

export default ErrorMessage;
