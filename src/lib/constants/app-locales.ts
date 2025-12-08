import { TLocale } from '@/lib/types/locales';

export const APP_LOCALES = [
  {
    locale: 'ua',
    countryCode: 'ua',
  },
  {
    locale: 'en',
    countryCode: 'gb',
  },
] as const satisfies Readonly<TLocale[]>;
