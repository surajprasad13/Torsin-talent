import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// helpers
import {appstyle, fonts} from '../../theme';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAccepted} from '../../redux/actions/userAction';
import moment from 'moment';

const Chat = ({}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {userToken} = useAppSelector(state => state.auth);
  const {acceptList, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getAccepted({userToken}));
  }, []);

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        key={index.toString()}
        onPress={() => {
          navigation.navigate('ChatUser', {item});
        }}
        style={styles.container}>
        <FastImage
          source={{uri: item.profileImage}}
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
          <Text style={styles.title}>{item.jobName}</Text>
          <Text style={{}}>{item.jobDescription}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <FlatList
        data={acceptList}
        renderItem={renderItem}
        ListEmptyComponent={<View>{loading && <ActivityIndicator />}</View>}
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
    marginTop: 5,
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
});

export default Chat;
