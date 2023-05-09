import React from 'react';
import { IntlProvider } from 'react-intl';
import useGetLocale from '../hooks/getLocal';
import { LOCALES } from '../locales';

interface IPropProvaider {
  children?: React.ReactNode;
}

export default function ProviderI18n({ children }: IPropProvaider) {
  const { locale, messages, defaultLocale } = useGetLocale();
  return (
    <IntlProvider
      messages={messages}
      locale={locale ? locale : LOCALES.ENGLISH}
      defaultLocale={defaultLocale}
    >
      {children}
    </IntlProvider>
  );
}
