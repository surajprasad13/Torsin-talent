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
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

//icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {useAppSelector} from '../../hooks';
import {uploadDocument, uploadMedia} from '../../helpers';
import {
  handleSendDocumentMessage,
  handleSendImageMessage,
  handleSendVideoMessage,
  sendFCMMessage,
} from '../../helpers/chat';
import {ChatMessageList} from '../../types/ChatMessage';
import Message from './components/Message';

enum ChatStatus {
  active = 'active',
  inactive = 'inactive',
}

const ChatUser = ({route}: any) => {
  const insets = useSafeAreaInsets();

  const {} = useAppSelector(state => state.user);
  const [messages, setMessages] = useState<any>([]);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | ChatStatus>(ChatStatus.inactive);

  const {userInfo} = useAppSelector(state => state.auth);

  const {item}: {item: ChatMessageList} = route.params;
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      database().ref(`Users/u2id${userInfo?.id}/status`).set('inactive');
    });
    database().ref(`Users/u2id${userInfo?.id}/status`).set('active');

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/Users/u1id${item.clientId}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const data = snapshot.val();

          setStatus(data.status);
        }
      });

    return () =>
      database().ref(`/Users/u1id${item.clientId}`).off('value', onValueChange);
  }, []);

  useEffect(() => {
    const chatRef = database().ref(
      `Chat/jobid${item.jobId}-proposalid${item.proposalId}`,
    );
    chatRef.orderByKey().on('value', snapshot => {
      const _messages = snapshot.val();
      if (_messages) {
        const messageList = Object.keys(_messages)
          .map(key => ({
            ..._messages[key],
          }))
          .sort((a, b) => b.id - a.id);

        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });
    return () => {
      chatRef.off('value');
    };
  }, []);

  const handleSendMessage = async () => {
    if (value.length == 0) {
      return;
    }
    setLoading(true);
    database()
      .ref(`Chat/jobid${item.jobId}-proposalid${item.proposalId}`)
      .push({
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
        read: false,
      });
    if (status == ChatStatus.inactive) {
      database()
        .ref(`/Tokens/u1id${item.clientId}`)
        .once('value')
        .then(snapshot => {
          const data = snapshot.val();
          if (data) {
            sendFCMMessage(data.device_token, value);
          }
        });
    }
    setLoading(false);
    setValue('');
  };

  useEffect(() => {
    updateKeyInDatabase();
  }, []);

  const updateKeyInDatabase = () => {
    // Get a reference to the Firebase database
    // Access the specific data path you want to update
    const dataRef = database().ref(
      `Chat/jobid${item.jobId}-proposalid${item.proposalId}`,
    );

    // Update the value of the specific key in the entire database
    dataRef.once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        if (childData.user._id !== userInfo?.id) {
          // Modify the value of the specific key
          childData.read = true;
          // Update the modified data back to the database
          dataRef.child(childKey).set(childData);
        }
      });
    });
  };

  const renderItem = ({item, index}: any) => {
    return <Message userInfo={userInfo} item={item} key={index.toString()} />;
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
            {item.fullname}
          </Text>
        </View>
        <Feather name="more-vertical" size={20} />
      </View>

      <Modal
        visible={isPopupVisible}
        animationType="slide"
        style={{}}
        transparent>
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
                      status,
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
                      status,
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
                onPress={async () => {
                  const data = await uploadDocument();
                  setLoading(true);
                  setPopupVisible(false);
                  if (data) {
                    await handleSendDocumentMessage({
                      item,
                      value: data as string,
                      userInfo,
                      status,
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
