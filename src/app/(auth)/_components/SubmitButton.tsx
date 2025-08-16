import { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

const SubmitButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button
      {...props}
      className={cn(
        'bg-primary text-primary-foreground h-fit w-full px-6 py-3 text-lg font-semibold',
        props.className,
      )}
    />
  );
};

export default SubmitButton;
