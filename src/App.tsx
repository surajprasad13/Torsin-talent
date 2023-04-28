import 'react-native-gesture-handler';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Appnavigator from './routes/Appnavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import store from './redux';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <Appnavigator />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
