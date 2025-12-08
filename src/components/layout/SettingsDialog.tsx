'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useDispatch, useSelector } from 'react-redux';
import { useLocale } from 'use-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { setLocale } from '@/lib/actions/set-locale';
import { APP_LOCALES } from '@/lib/constants/app-locales';
import { useServerAction } from '@/lib/hooks/useServerAction';
import { TTheme, useTheme } from '@/lib/hooks/useTheme';
import { RootState } from '@/lib/store';
import { setOpened } from '@/lib/store/slices/settings-slice';

const SettingsDialog = () => {
  const tSettings = useTranslations('settings');
  const tLocales = useTranslations('locales');
  const locale = useLocale();
  const [, action, isPending] = useServerAction(setLocale);
  const dispatch = useDispatch();
  const { opened } = useSelector((state: RootState) => state.settings);

  return (
    <Dialog open={opened} onOpenChange={(open) => dispatch(setOpened(open))}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="min-h-72"
      >
        <DialogHeader>
          <DialogTitle className="capitalize">{tSettings('title')}</DialogTitle>
          <DialogDescription>{tSettings('description')}</DialogDescription>
        </DialogHeader>

        <ul className="mt-auto flex h-fit flex-col gap-4">
          <li className="flex items-center gap-2 capitalize">
            <span>{tSettings('options.theme')}:</span>

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

          <li className="flex items-center gap-2 capitalize">
            <span>{tSettings('options.language.label')}:</span>

            <Select
              disabled={isPending}
              onValueChange={(locale) => action(locale)}
              value={locale}
            >
              <SelectTrigger className="cursor-pointer text-base">
                <SelectValue
                  className="items-center"
                  placeholder={tSettings('options.language.placeholder')}
                />
              </SelectTrigger>

              <SelectContent>
                {APP_LOCALES.map(({ locale, countryCode }) => (
                  <SelectItem
                    value={locale}
                    key={locale}
                    className="cursor-pointer"
                  >
                    <Locale
                      countryCode={countryCode}
                      label={tLocales(locale)}
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

type TLocaleProps = {
  countryCode: string;
  label: string;
};

const Locale = ({ countryCode, label }: TLocaleProps) => {
  return (
    <div className="flex items-center gap-2">
      <ReactCountryFlag
        countryCode={countryCode}
        style={{ height: '0.875em', width: 'auto' }}
        svg
      />
      <span className="capitalize">{label}</span>
    </div>
  );
};
