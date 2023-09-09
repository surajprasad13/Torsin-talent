import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

import AppNavigator from './routes/AppNavigator';

import store, {persistor} from './redux';
import {injectStore} from './api';

async function checkApplicationPermission() {
  const setting = await notifee.requestPermission();
  if (setting.authorizationStatus) {
  } else {
    console.log('User has disabled notification');
  }
}

async function onAppBootstrap() {
  // Register the device with FCM
  //  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log(token);
  // Save the token
}

const App = () => {
  useEffect(() => {
    checkApplicationPermission();
    onAppBootstrap();
  }, []);

  injectStore(store);

  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor="white"
      />
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
