import Layout from '@/layout/Layout';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ProviderI18n from '../lang/Provider/ProviderI18n';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderI18n>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ProviderI18n>
  );
}
