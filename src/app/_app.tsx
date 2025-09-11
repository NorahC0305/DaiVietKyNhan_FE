import type { AppProps } from 'next/app';
import QueryProviderWrapper from '@components/providers/QueryProviderWrapper';
import '@/app/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProviderWrapper>
      <Component {...pageProps} />
    </QueryProviderWrapper>
  );
}


