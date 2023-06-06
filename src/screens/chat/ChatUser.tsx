import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

// Helpers
import {appstyle, colors, fonts} from '../../theme';
import {useAppSelector} from '../../hooks';

//icons
import Feather from 'react-native-vector-icons/Feather';

// helpers

const ChatUser = ({route}: any) => {
  const {} = useAppSelector(state => state.user);
  const [messages, setMessages] = useState<any>([]);
  const {userInfo} = useAppSelector(state => state.auth);
  const {item} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ChatRooms')
      .doc(String(item.jobId))
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const _messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          const data: any = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };
          return data;
        });
        const newMessage = _messages.filter(
          _item =>
            _item.jobId == item.jobId && _item.proposalId == item.proposalId,
        );
        setMessages(newMessage);
      });
    return () => unsubscribe();
  }, []);

  const onSend = async (newMessages: any) => {
    const message = newMessages[0];
    await firestore()
      .collection('ChatRooms')
      .doc(String(item.jobId))
      .collection('messages')
      .add({
        ...message,
        createdAt: new Date().getTime(),
        jobId: item.jobId,
        proposalId: item.proposalId,
      })
      .then(() => {
        //console.log('Messeged');
      })
      .catch(() => {
        //console.log(error);
      });
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            margin: 5,
            ...appstyle.shadow,
          },
          left: {
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
            {item.jobName}
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
          _id: String(userInfo?.id),
          name: userInfo?.fullName,
          avatar: userInfo?.profileImage,
        }}
        renderBubble={renderBubble}
      />
    </SafeAreaView>
  );
};

export default ChatUser;
