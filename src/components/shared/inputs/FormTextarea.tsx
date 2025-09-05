import { ComponentProps } from 'react';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils/cn';

type TFormTextareaProps = {
  error?: string;
  label: string;
} & ComponentProps<'textarea'>;

const FormTextarea = ({
  error,
  label,
  ...textareaProps
}: TFormTextareaProps) => {
  return (
    <FormItem>
      <FormLabel className={cn(error && 'text-destructive')}>{label}</FormLabel>

      <FormControl>
        <Textarea
          {...textareaProps}
          className={cn(
            textareaProps.className,
            error &&
              'ring-destructive/20 dark:ring-destructive/40 border-destructive',
          )}
        />
      </FormControl>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormItem>
  );
};

export default FormTextarea;
