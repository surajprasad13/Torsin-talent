import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {colors, fonts} from '../../theme';

// helpers

const ChatUser = ({route}) => {
  const [messages, setMessages] = useState([]);
  const {chatRoomId} = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chat')
      .doc(chatRoomId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };
          return data;
        });
        setMessages(messages);
      });

    return () => unsubscribe();
  }, []);

  const onSend = async (newMessages = []) => {
    const {chatRoomId} = route.params;
    const message = newMessages[0];
    await firestore()
      .collection('chat')
      .doc(chatRoomId)
      .collection('messages')
      .add({
        ...message,
        createdAt: new Date().getTime(),
      });
  };

  const renderBubble = props => {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: 'white',
            margin: 5,
          },
          left: {
            // Here is the color change
            backgroundColor: colors.primary,
            margin: 5,
          },
        }}
        textStyle={{
          right: {
            color: 'black',
            fontSize: 12,
            fontFamily: fonts.regular,
          },
          left: {
            color: 'white',
            fontSize: 12,
            fontFamily: fonts.regular,
          },
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: chatRoomId, // replace with your own user ID
        }}
        renderBubble={renderBubble}
      />
    </SafeAreaView>
  );
};

export default ChatUser;
