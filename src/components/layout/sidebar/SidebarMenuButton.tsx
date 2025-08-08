'use client';

import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils/cn';

type TSidebarMenuButtonProps = ComponentProps<typeof SidebarMenuButton> & {
  href: string;
};

const ActiveSidebarMenuButton = (props: TSidebarMenuButtonProps) => {
  const pathname = usePathname();

  return (
    <SidebarMenuButton
      {...props}
      isActive={props.href === pathname}
      className={cn(
        'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
        props.className,
      )}
    />
  );
};

export default ActiveSidebarMenuButton;
