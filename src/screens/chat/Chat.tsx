import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// helpers
import {appstyle, fonts} from '../../theme';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAccepted} from '../../redux/actions/userAction';
import moment from 'moment';
import {ChatMessageList} from '../../types/ChatMessage';
import {Title} from '../../components';

const {height} = Dimensions.get('window');

const Chat = ({}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {userToken} = useAppSelector(state => state.auth);
  const {acceptList, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getAccepted({userToken}));
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: ChatMessageList;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        key={index.toString()}
        onPress={() => {
          navigation.navigate('ChatUser', {item});
        }}
        style={styles.container}>
        <FastImage
          source={{uri: item.image[0]}}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={{width: '80%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
              {item.fullname}
            </Text>
            <Text style={styles.time}>{moment(item.createdAt).fromNow()}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.title}>{item.jobName}</Text>
              <Text style={{}}>
                {item.jobDescription.length > 30
                  ? item.jobDescription.substring(0, 30).concat('....')
                  : item.jobDescription}
              </Text>
            </View>
            <Text style={{}}>{item.read > 0 ? item.read : null}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Chat" />
      <FlatList
        data={acceptList}
        renderItem={renderItem}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              minHeight: height * 0.7,
              justifyContent: 'center',
            }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <FastImage
                  source={require('../../assets/images/noModule/chat.png')}
                  style={styles.emptyImage}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontFamily: fonts.semibold,
                    fontSize: 20,
                    color: '#000F1A',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  No chats avilable!
                </Text>
              </>
            )}
          </View>
        }
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ...appstyle.shadow,
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
  },
  title: {
    fontFamily: fonts.semibold,
    color: '#1E202B',
    opacity: 0.8,
  },
  description: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    opacity: 0.6,
    marginTop: 5,
  },
  time: {
    fontFamily: fonts.regular,
    color: '#BDBDBD',
    textAlign: 'right',
  },
  emptyImage: {
    width: 'auto',
    height: 200,
    resizeMode: 'contain',
  },
});

export default Chat;
