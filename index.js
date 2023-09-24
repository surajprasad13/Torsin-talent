import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

import messaging from '@react-native-firebase/messaging';

import {navigationRef, navigate} from './src/routes/RootNavigation';

async function onMessageReceived(message) {
  // Do something
  console.log(message, 'onMessageReceived');
  await notifee.displayNotification({
    title: message.notification?.title,
    body: message.notification?.body,
    data: message.data,
  });
}

notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    console.log('onBackgorund Press');
    const data = detail.notification.data;
    if (data.screen == 'proposal') {
      navigate('ProposalNavigator', {
        screen: 'ProposalDetail',
        params: {
          id: data.id,
        },
      });
    }
    await notifee.cancelNotification(detail.notification.id);
  }
});

notifee.onForegroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    console.log('OnForeground Press', detail);
    const data = detail.notification.data;
    // if (data.screen == 'proposal') {
    navigate('ProposalNavigator', {
      screen: 'ProposalDetail',
      params: {
        id: data.id,
      },
    });
    // }
    await notifee.cancelNotification(detail.notification.id);
  }
});

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
