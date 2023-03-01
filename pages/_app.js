// 1. import `NextUIProvider` component
import { I18nProvider } from '@/context/i18n.js';
import { NextUIProvider } from '@nextui-org/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    /* 2. Use at the root of your app */
    <NextUIProvider>
      <I18nProvider>
        <Component {...pageProps} />
      </I18nProvider>
    </NextUIProvider>
  );
}

export default MyApp;