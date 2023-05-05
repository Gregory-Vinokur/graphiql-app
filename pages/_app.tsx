import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ProviderI18n from '../lang/Provider/ProviderI18n';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderI18n>
      <Component {...pageProps} />
    </ProviderI18n>
  );
}
