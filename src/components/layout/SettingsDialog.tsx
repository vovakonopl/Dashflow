'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TTheme, useTheme } from '@/lib/hooks/useTheme';
import { RootState } from '@/lib/store';
import { setOpened } from '@/lib/store/slices/settings-slice';

const SettingsDialog = () => {
  const dispatch = useDispatch();
  const { opened } = useSelector((state: RootState) => state.settings);

  return (
    <Dialog open={opened} onOpenChange={(open) => dispatch(setOpened(open))}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="min-h-72"
      >
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure your app preferences</DialogDescription>
        </DialogHeader>

        <ul className="mt-auto flex h-fit flex-col gap-2">
          <li className="flex items-center gap-2 capitalize">
            <span>App theme:</span>

            <ul className="flex gap-1">
              <li>
                <ThemeButton theme="light" tooltip="Light theme">
                  <Sun />
                </ThemeButton>
              </li>
              <li>
                <ThemeButton theme="dark" tooltip="Dark theme">
                  <Moon />
                </ThemeButton>
              </li>

              <li>
                <ThemeButton theme="system" tooltip="System default theme">
                  <Monitor />
                </ThemeButton>
              </li>
            </ul>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;

type TThemeButtonProps = {
  theme: TTheme;
  tooltip: string;
  children: ReactNode;
};

const ThemeButton = ({ theme, tooltip, children }: TThemeButtonProps) => {
  const { setTheme, theme: appTheme } = useTheme();

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant={appTheme === theme ? 'default' : 'outline'}
          onClick={() => setTheme(theme)}
        >
          {children}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
