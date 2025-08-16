import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

const CenteredContent = (props: ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={cn(
        'flex size-full items-center justify-center',
        props.className,
      )}
    />
  );
};

export default CenteredContent;
