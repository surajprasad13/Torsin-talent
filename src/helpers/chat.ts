import firestore from '@react-native-firebase/firestore';

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

export {handleSendMessage, handleSendImageMessage, handleSendVideoMessage};
