/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <ScrollView>
        {loading && <ActivityIndicator />}
        <View
          style={{
            ...appstyle.shadow,
            padding: 10,
            borderRadius: 15,
            backgroundColor: 'white',
            margin: 10,
          }}>
          {acceptList.map((item, index) => {
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
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderWidth: 0.5,
                  }}
                />
                <View style={{width: '80%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
                      {item.jobName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: '#BDBDBD',
                        textAlign: 'right',
                      }}>
                      {moment(item.createdAt).fromNow()}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      color: '#1E202B',
                      opacity: 0.6,
                      marginTop: 10,
                    }}>
                    {item.jobDescription}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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
    borderBottomWidth: 0.2,
    borderBottomColor: '#D3D3D3',
  },
});

export default Chat;
