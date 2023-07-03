/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

import messaging from '@react-native-firebase/messaging';

import {navigationRef} from './src/routes/RootNavigation';

// is required for both subscribers.
async function onMessageReceived(message) {
  // Do something
}

notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    console.log('Background Pressed');
    //navigationRef?.navigate('ChatUser', {item: {}});
    await notifee.cancelNotification(detail.notification.id);
  }
});

notifee.onForegroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    console.log('Foreground Pressed');
    navigationRef?.navigate('ChatUser', {item: {}});
    await notifee.cancelNotification(detail.notification.id);
  }
});

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
