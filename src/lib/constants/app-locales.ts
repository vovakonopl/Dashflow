import { TLocale } from '@/lib/types/locales';

export const APP_LOCALES = [
  { locale: 'en', countryCode: 'gb' },
  { locale: 'ua', countryCode: 'ua' },
  { locale: 'de', countryCode: 'de' },
  { locale: 'fr', countryCode: 'fr' },
  { locale: 'pl', countryCode: 'pl' },
  { locale: 'ja', countryCode: 'jp' },
  { locale: 'zh', countryCode: 'cn' },
  { locale: 'ar', countryCode: 'sa' },
] as const satisfies Readonly<TLocale[]>;
