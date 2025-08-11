import Link from 'next/link';
import { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

const AuthLink = (props: ComponentProps<typeof Link>) => {
  return <Link {...props} className={cn('text-primary', props.className)} />;
};

export default AuthLink;
