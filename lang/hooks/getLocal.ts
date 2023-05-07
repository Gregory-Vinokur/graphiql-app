import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { LOCALES } from '@/lang/locales';
import English from '../en-US';
import Russian from '../ru-RU';

export default function useGetLocale() {
  const { locale, defaultLocale } = useRouter();

  const messages = useMemo(() => {
    switch (locale) {
      case LOCALES.ENGLISH:
        return English;
        break;
      case LOCALES.RUSSIAN:
        return Russian;
        break;
      default:
        return English;
        break;
    }
  }, [locale]);
  return { locale, messages, defaultLocale };
}
