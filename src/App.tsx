import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { encode } from 'base-64';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  Sentry.init({
    dsn:
      'https://8ad225ac089f4fe080ac812c7bf6ba8d@o202067.ingest.sentry.io/5660297',
    environment: __DEV__ ? 'Development' : 'Production',
  });

  if (!global.btoa) {
    global.btoa = encode;
  }

  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#212121"
          barStyle="light-content"
        />
        <Routes />
      </GestureHandlerRootView>
    </AppProvider>
  );
};

export default App;
