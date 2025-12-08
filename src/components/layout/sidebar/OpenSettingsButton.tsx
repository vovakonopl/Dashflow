'use client';

import { Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { setOpened } from '@/lib/store/slices/settings-slice';

const OpenSettingsButton = () => {
  const t = useTranslations('layout.sidebar.buttons');
  const dispatch = useDispatch();

  return (
    <SidebarMenuButton
      className="cursor-pointer"
      onClick={() => dispatch(setOpened(true))}
    >
      <Settings />
      <span className="capitalize">{t('settings')}</span>
    </SidebarMenuButton>
  );
};

export default OpenSettingsButton;
