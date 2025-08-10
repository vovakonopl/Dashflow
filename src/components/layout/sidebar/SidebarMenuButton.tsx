'use client';

import { usePathname } from 'next/navigation';
import React, { ComponentProps } from 'react';
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils/cn';

type TSidebarMenuButtonProps = ComponentProps<typeof SidebarMenuButton> & {
  href: string;
};

const ActiveSidebarMenuButton = (props: TSidebarMenuButtonProps) => {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  // Handle click event to close the sidebar on mobile
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClick?.(e);
    setOpenMobile(false);
  };

  return (
    <SidebarMenuButton
      {...props}
      isActive={props.href === pathname}
      className={cn(
        'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
        props.className,
      )}
      onClick={onClick}
    />
  );
};

export default ActiveSidebarMenuButton;
