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
  console.log('onBackgorund');
  if (type === EventType.PRESS) {
    await notifee.cancelNotification(detail.notification.id);
  }
});

notifee.onForegroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    const data = detail.notification.data;
    if (data.screen == 'proposal') {
      console.log('Foreground Pressed', detail.notification.data);
      navigationRef?.navigate('ProposalDetail', {
        jobId: data.jobId,
        proposalId: data.id,
      });
    }
    await notifee.cancelNotification(detail.notification.id);
  }
});

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
