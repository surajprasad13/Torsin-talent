import React, {useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

// Helpers
import {appstyle, colors, fonts} from '../../theme';
import {useAppSelector} from '../../hooks';

//icons
import Feather from 'react-native-vector-icons/Feather';
import {Divider} from 'react-native-paper';

// helpers

const ChatUser = ({route}: any) => {
  const {} = useAppSelector(state => state.user);
  const [messages, setMessages] = useState<any>([]);
  const [inputText, setInputText] = useState<string>('');

  const {userInfo} = useAppSelector(state => state.auth);
  const {item} = route.params;
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);

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

  const handleSendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }
    await firestore()
      .collection('ChatRooms')
      .doc(String(item.jobId))
      .collection('messages')
      .add({
        id: new Date().getTime(),
        createdAt: new Date().getTime(),
        jobId: item.jobId,
        proposalId: item.proposalId,
        text: inputText,
        user: {
          _id: userInfo?.id,
          avatar: userInfo?.profileImage,
          name: userInfo?.fullName,
        },
      })
      .then(() => {
        //console.log('Messeged');
      })
      .catch(() => {
        //console.log(error);
      });

    setInputText('');
  };

  const renderItem = ({item, index}: any) => {
    return (
      <View style={{padding: 15}}>
        {item.user._id === userInfo?.id ? (
          <View style={{width: '70%', alignSelf: 'flex-end', flex: 1}}>
            <View
              style={{
                backgroundColor: '#E8E9EB',
                padding: 15,
                borderRadius: 10,
                borderBottomRightRadius: 0,
                borderColor: '#8A9099',
                borderWidth: 0.2,
              }}>
              <Text
                style={{
                  color: '#595F69',
                  fontFamily: fonts.medium,
                  fontSize: 12,
                }}>
                {item.text}
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'left',
                fontFamily: fonts.medium,
                color: '#8A9099',
                fontSize: 10,
              }}>
              {moment(item.createdAt).fromNow()}
            </Text>
          </View>
        ) : (
          <View style={{width: '70%'}}>
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                borderBottomLeftRadius: 0,
                padding: 15,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fonts.medium,
                  fontSize: 12,
                }}>
                {item.text}
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'right',
                fontFamily: fonts.medium,
                color: '#8A9099',
                fontSize: 10,
              }}>
              {moment(item.createdAt).fromNow()}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
      {/* <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: String(userInfo?.id),
          name: userInfo?.fullName,
          avatar: userInfo?.profileImage,
        }}
        //renderBubble={renderBubble}
        scrollToBottom
        renderInputToolbar={props => customtInputToolbar(props)}
      /> */}
      <Modal
        visible={isPopupVisible}
        animationType="slide"
        style={{}}
        transparent>
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}>
          <View
            style={{
              position: 'absolute',
              bottom: '15%',
              width: '100%',
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
              }}>
              <Pressable style={{padding: 5, margin: 5}}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    color: '#4F4F4F',
                  }}>
                  Photo & Video Liberary
                </Text>
              </Pressable>
              <Divider />
              <Pressable style={{padding: 5, margin: 5}}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    color: '#4F4F4F',
                  }}>
                  Documents
                </Text>
              </Pressable>
            </View>
            <View style={{margin: 20, marginTop: -10}}>
              <TouchableOpacity
                onPress={() => {
                  setPopupVisible(false);
                }}
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: fonts.regular,
                    color: colors.primary,
                    fontSize: 16,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{flexGrow: 1}}
        inverted
      />
      <KeyboardAvoidingView behavior="padding">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            justifyContent: 'space-between',
            height: 90,
            ...appstyle.shadow,
          }}>
          <TouchableOpacity onPress={() => setPopupVisible(true)} style={{}}>
            <Feather name="plus" color={colors.primary} size={20} />
          </TouchableOpacity>

          <TextInput
            style={{
              borderRadius: 8,
              padding: 15,
              width: '80%',
              backgroundColor: '#F7F7FC',
              color: '#333333',
            }}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity onPress={handleSendMessage} style={{}}>
            <Feather name="send" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatUser;
