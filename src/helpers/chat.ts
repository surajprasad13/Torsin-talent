import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

const handleSendMessage = async ({item, value, userInfo}: any) => {
  try {
    await firestore()
      .collection('ChatRooms')
      .doc(String(item.jobId))
      .collection('messages')
      .add({
        id: new Date().getTime(),
        createdAt: new Date().getTime(),
        jobId: item.jobId,
        proposalId: item.proposalId,
        text: value,
        image: '',
        video: '',
        user: {
          _id: userInfo?.id,
          avatar: userInfo?.profileImage,
          name: userInfo?.fullName,
        },
      });
  } catch (error) {}
};

const handleSendImageMessage = async ({item, value, userInfo}: any) => {
  try {
    await firestore()
      .collection('ChatRooms')
      .doc(String(item.jobId))
      .collection('messages')
      .add({
        id: new Date().getTime(),
        createdAt: new Date().getTime(),
        jobId: item.jobId,
        proposalId: item.proposalId,
        text: '',
        image: value,
        user: {
          _id: userInfo?.id,
          avatar: userInfo?.profileImage,
          name: userInfo?.fullName,
        },
      });
  } catch (error) {}
};

const handleSendVideoMessage = async ({item, value, userInfo}: any) => {
  try {
    await firestore()
      .collection('ChatRooms')
      .doc(String(item.jobId))
      .collection('messages')
      .add({
        id: new Date().getTime(),
        createdAt: new Date().getTime(),
        jobId: item.jobId,
        proposalId: item.proposalId,
        text: '',
        image: '',
        video: value,
        user: {
          _id: userInfo?.id,
          avatar: userInfo?.profileImage,
          name: userInfo?.fullName,
        },
      });
  } catch (error) {}
};

const sendFCMMessage = async (deviceId: string, message: string) => {
  try {
    let data = JSON.stringify({
      notification: {
        body: 'New Message',
        image: 'https://firebase.google.com/images/social.png',
        title: message,
      },
      to: deviceId,
    });
    const response = await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      data,
      {
        headers: {
          Authorization:
            'key=AAAAYwYzGDI:APA91bFi_EQKvXG_K5H3fHhtv2mygDZkTXI5uqFiQ-CA2QrMXfPYA0R_3HKV7JuviiIbKsoD1kLEVWCfEbioI3uuLbW0_i9HGuWJkqenk7156pmI8NCWUHLEJzNxWDz-wG0Gx-7rHg9W',
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('FCM Message sent successfully:', response);
  } catch (error) {
    console.error('Error sending FCM Message:');
  }
};

export {
  handleSendMessage,
  handleSendImageMessage,
  handleSendVideoMessage,
  sendFCMMessage,
};
