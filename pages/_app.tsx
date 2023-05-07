import initStore from '@/store/store';
import { Provider } from 'react-redux';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const store = initStore();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
