'use client';

import { Eye, EyeClosed } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';

type TPasswordInputProps = Omit<ComponentProps<typeof Input>, 'type'> & {
  containerProps?: Omit<ComponentProps<'div'>, 'children'>;
};

const PasswordInput = ({ containerProps, ...props }: TPasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const onClick = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div
      {...containerProps}
      className={cn('relative w-full', containerProps?.className)}
    >
      <Input
        {...props}
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={props.placeholder || '••••••••'}
      />
      <button
        className="absolute top-1/2 right-0 -translate-y-1/2 p-2"
        onClick={onClick}
        type="button"
      >
        {isPasswordVisible ? (
          <Eye className="size-4" />
        ) : (
          <EyeClosed className="size-4" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
