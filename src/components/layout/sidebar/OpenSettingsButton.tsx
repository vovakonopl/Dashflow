'use client';

import { Settings } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { setOpened } from '@/lib/store/slices/settings-slice';

const OpenSettingsButton = () => {
  const dispatch = useDispatch();

  return (
    <SidebarMenuButton onClick={() => dispatch(setOpened(true))}>
      <Settings />
      <span>Settings</span>
    </SidebarMenuButton>
  );
};

export default OpenSettingsButton;
