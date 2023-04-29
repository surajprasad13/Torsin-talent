import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

const ForegroundHandler = () => {
  useEffect(() => {
    const unSubscribe = messaging().onMessage(async () => {
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: 'Android App',
        body: 'Test Body',
        soundName: 'default',
        vibrate: true,
        playSound: true,
      });
    });
    return unSubscribe;
  }, []);
  return null;
};

export default ForegroundHandler;
