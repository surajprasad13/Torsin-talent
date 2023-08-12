import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import moment from 'moment';

//icons
import Feather from 'react-native-vector-icons/Feather';

//helpers
import {colors, appstyle, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Title} from '../../components';
import {supportChat, supportPostChat} from '../../redux/actions/userAction';

const ChatCard = ({route}) => {
  const item = route.params.item;
  const {loading, support} = useAppSelector(state => state.user);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const [newMessage, setNewMessage] = useState('');

  const reversedMessages = [...support].reverse();

  const onPressText = () => {
    dispatch(
      supportPostChat({
        ticketId: item.ticketId,
        message: newMessage,
      }),
    );
    dispatch(supportChat(item?.ticketId));
    setNewMessage('');
  };

  useEffect(() => {
    dispatch(supportChat(item?.ticketId));
  }, []);

  const LeftMessage = ({message, createdAt}) => {
    const messageDate = moment(createdAt);
    const currentTime = moment();

    const showFullDate = currentTime.diff(messageDate, 'hours') >= 24;

    return (
      <View style={{maxWidth: '100%'}}>
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 10,
            maxWidth: '80%',
            marginVertical: 5,
            alignSelf: 'flex-start',
          }}>
          <Text style={{color: colors.white, fontSize: 12}}>{message}</Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.regular,
            color: colors.grey2,
            fontSize: 10,
            alignSelf: 'flex-end',
          }}>
          {showFullDate ? messageDate.format('llll') : messageDate.format('LT')}
        </Text>
      </View>
    );
  };

  const RightMessage = ({message, createdAt}) => {
    const messageDate = moment(createdAt);
    const currentTime = moment();

    const showFullDate = currentTime.diff(messageDate, 'hours') >= 24;

    return (
      <>
        <View
          style={{
            backgroundColor: '#F7F7FC',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 10,
            maxWidth: '80%',
            marginVertical: 5,
            alignSelf: 'flex-end',
            margin: 10,
          }}>
          <Text style={{color: '#333333', fontSize: 12}}>{message}</Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.regular,
            color: colors.grey2,
            fontSize: 10,
            alignSelf: 'flex-end',
            margin: 10,
          }}>
          {showFullDate ? messageDate.format('llll') : messageDate.format('LT')}
        </Text>
      </>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          alignItems: item.sender === 'user' ? 'center' : 'flex-start',
          marginVertical: 8,
          margin: 5,
        }}>
        {support?.length > 0 &&
          support
            ?.slice()
            .reverse()
            .map((_message, index) => (
              <React.Fragment key={index}>
                {_message?.isSenderAdmin ? (
                  <LeftMessage message={_message.message} />
                ) : (
                  <RightMessage message={_message.message} />
                )}
              </React.Fragment>
            ))}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: insets.bottom - 50,
      }}>
      <Title title={`Ticke No : #${item.ticketId}`} />

      <FlatList
        data={reversedMessages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
            justifyContent: 'space-evenly',
          }}>
          {/* <TouchableOpacity style={{}}>
                        <Feather name="plus" color={colors.primary} size={20} />
                    </TouchableOpacity> */}

          <TextInput
            style={{
              borderRadius: 8,
              padding: 15,
              width: '80%',
              backgroundColor: '#F7F7FC',
              color: '#333333',
            }}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={text => setNewMessage(text)}
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity onPress={onPressText}>
              <Feather name="send" size={20} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatCard;
