import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

//icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {useAppSelector} from '../../hooks';
import Message from './components/Message';
import {uploadDocument, uploadMedia} from '../../helpers';
import {
  handleSendImageMessage,
  handleSendVideoMessage,
} from '../../helpers/chat';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const ChatUser = ({route}: any) => {
  const insets = useSafeAreaInsets();

  const {} = useAppSelector(state => state.user);
  const [messages, setMessages] = useState<any>([]);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const {userInfo} = useAppSelector(state => state.auth);
  const {item} = route.params;
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
        setMessages(newMessage);
      });
    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (value.length == 0) {
      return;
    }
    setLoading(true);
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
        user: {
          _id: userInfo?.id,
          avatar: userInfo?.profileImage,
          name: userInfo?.fullName,
        },
      })
      .then(() => {
        setLoading(false);
        setValue('');
        //console.log('Messeged');
      })
      .catch(() => {
        setLoading(false);
        //console.log(error);
      });
  };

  const renderItem = ({item, index}: any) => {
    return <Message item={item} userInfo={userInfo} key={index.toString()} />;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: insets.bottom - 50,
      }}>
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
            {userInfo?.fullName}
          </Text>
          <Text style={{fontFamily: fonts.regular, fontSize: 9}}>
            Last seen {moment().format('lll')}
          </Text>
        </View>
        <Feather name="more-vertical" size={20} />
      </View>
      <Modal visible={isPopupVisible} animationType="slide" transparent>
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}>
          <View
            style={{
              position: 'absolute',
              bottom: '10%',
              width: '100%',
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
              }}>
              <Pressable
                style={{padding: 5, margin: 5}}
                onPress={async () => {
                  const data = await uploadMedia({type: 'image'});
                  setLoading(true);
                  setPopupVisible(false);
                  if (data) {
                    await handleSendImageMessage({
                      item,
                      value: data as string,
                      userInfo,
                    });
                    setLoading(false);
                  } else {
                    setPopupVisible(false);
                    setLoading(false);
                  }
                }}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    color: '#4F4F4F',
                  }}>
                  Photo Library
                </Text>
              </Pressable>

              <Divider />

              <Pressable
                style={{padding: 5, margin: 5}}
                onPress={async () => {
                  const data = await uploadMedia({type: 'video'});
                  setLoading(true);
                  setPopupVisible(false);
                  if (data) {
                    await handleSendVideoMessage({
                      item,
                      value: data as string,
                      userInfo,
                    });
                    setLoading(false);
                  } else {
                    setPopupVisible(false);
                    setLoading(false);
                  }
                }}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    color: '#4F4F4F',
                  }}>
                  Video Library
                </Text>
              </Pressable>

              <Divider />

              <Pressable
                style={{padding: 5, margin: 5}}
                onPress={() => {
                  const data = uploadDocument();
                  console.log(data);
                }}>
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
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{flexGrow: 1}}
        inverted
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8,
            ...appstyle.shadow,
            justifyContent: 'space-between',
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
            value={value}
            onChangeText={text => setValue(text)}
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity onPress={handleSendMessage} style={{}}>
              <Feather name="send" size={20} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatUser;
