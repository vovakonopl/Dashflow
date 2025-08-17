import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

const TitleH1 = (props: ComponentProps<'h1'>) => {
  return (
    <h1
      {...props}
      className={cn(
        'font-archivo text-6xl font-extrabold max-md:text-5xl',
        props.className,
      )}
    />
  );
};

export default TitleH1;
