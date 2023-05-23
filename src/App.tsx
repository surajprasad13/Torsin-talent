import 'react-native-gesture-handler';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './routes/Appnavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import store, {persistor} from './redux';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <AppNavigator />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
