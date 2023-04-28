import 'react-native-gesture-handler';
import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Appnavigator from './routes/Appnavigator';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appnavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
