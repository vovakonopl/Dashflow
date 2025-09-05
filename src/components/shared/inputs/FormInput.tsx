import { ComponentProps, ReactNode } from 'react';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';

type TInputFieldProps = {
  error?: string;
  label: string;

  // Render specified component instead of default Input
  renderInput?: (inputProps: ComponentProps<'input'>) => ReactNode;
} & ComponentProps<'input'>;

const FormInput = ({
  error,
  label,
  renderInput,
  ...inputProps
}: TInputFieldProps) => {
  const inputClassName = cn(
    error && 'ring-destructive/20 dark:ring-destructive/40 border-destructive',
    inputProps.className,
  );

  return (
    <FormItem>
      <FormLabel className={cn(error && 'text-destructive')}>{label}</FormLabel>

      <FormControl>
        {renderInput ? (
          renderInput({ ...inputProps, className: inputClassName })
        ) : (
          <Input {...inputProps} className={inputClassName} />
        )}
      </FormControl>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormItem>
  );
};

export default FormInput;
