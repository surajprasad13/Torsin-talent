import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAccepted} from '../../redux/actions/userAction';
import moment from 'moment';
import {ChatMessageList} from '../../types/ChatMessage';

const {height} = Dimensions.get('window');

const Chat = ({}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {userToken} = useAppSelector(state => state.auth);
  const {acceptList, loading} = useAppSelector(state => state.user);

  const [isTextInputVisible, setTextInputVisible] = useState(false);

  const handleSearchIconPress = () => {
    setTextInputVisible(true);
  };
  const cancelSearchIconPress = () => {
    setTextInputVisible(false);
  };

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
          source={
            item.image[0]
              ? {uri: item.image[0]}
              : require('../../assets/images/profile.png')
          }
          resizeMode="cover"
          style={styles.image}
        />

        <View style={{width: '80%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
              {item.fullName}
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
      {!isTextInputVisible ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: colors.white,
          }}>
          <Text
            style={{
              fontFamily: fonts.medium,
              color: colors.black,
              fontSize: 16,
            }}>
            Chats
          </Text>
          <Feather
            onPress={handleSearchIconPress}
            name="search"
            size={15}
            style={{position: 'absolute', right: 10, top: 15}}
          />
        </View>
      ) : (
        <Animated.View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
          }}>
          <Feather
            onPress={handleSearchIconPress}
            name="search"
            size={15}
            style={{position: 'absolute', left: 20, top: 20}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.white,
              borderWidth: 1,
              borderRadius: 30,
              borderColor: '#BDBDBD',
              flex: 0.9,
            }}>
            <Feather
              name="search"
              size={18}
              color={colors.primary}
              style={{marginLeft: 10}}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#BDBDBD"
              style={{
                padding: 10,
                flex: 1,
              }}
            />
          </View>
          <Text onPress={cancelSearchIconPress} style={{color: colors.red}}>
            Cancel
          </Text>
        </Animated.View>
      )}
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
    borderWidth: 0.2,
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
