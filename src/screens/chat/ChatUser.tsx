import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {appstyle, colors, fonts} from '../../theme';

//icons
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

// helpers

const ChatUser = ({route}) => {
  const [messages, setMessages] = useState([]);
  const {chatRoomId} = route.params;
  const navigation = useNavigation();

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
            margin: 5,
            ...appstyle.shadow,
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
            textAlign: 'center',
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#d3d3d3',
        }}>
        <Feather
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={20}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{textTransform: 'capitalize', fontSize: 16}}>
            {chatRoomId}
          </Text>
          <Text style={{fontFamily: fonts.regular, fontSize: 9}}>
            Last seen {moment().format('lll')}
          </Text>
        </View>
        <Feather name="more-vertical" size={20} />
      </View>
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
