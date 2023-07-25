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
    //navigationRef?.navigate('ChatUser', {item: {}});
    await notifee.cancelNotification(detail.notification.id);
  }
});

notifee.onForegroundEvent(async ({type, detail: {notification}}) => {
  if (type === EventType.PRESS) {
    if (notification.data.scree == 'proposal') {
      navigationRef?.navigate('DrawerNavigation', {
        screen: 'ProposalNavigator',
        params: {
          screen: '',
        },
      });
    }
    await notifee.cancelNotification(notification.id);
  }
});

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
