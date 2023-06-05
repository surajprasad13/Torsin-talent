import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
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

const list = [
  {
    name: 'ChatRoom1',
    email: 'Chat',
    id: 'ChatRoom1',
  },
];

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
        <TouchableOpacity
          style={{
            padding: 5,
            margin: 10,
            backgroundColor: colors.white,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: '#D3D3D3',
          }}>
          <Feather
            name="search"
            size={18}
            color={colors.black}
            style={{marginLeft: 10}}
          />

          <TextInput
            placeholder="Search"
            disableFullscreenUI
            placeholderTextColor="#D3D3D3"
            style={{
              padding: 10,
              flex: 0.95,
            }}
          />
        </TouchableOpacity>
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '80%',
                    left: 10,
                  }}>
                  <View style={{}}>
                    <Text
                      style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
                      {item.jobName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: '#1E202B',
                        top: 10,
                        opacity: 0.6,
                      }}>
                      {item.jobDescription}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: '#BDBDBD',
                        textAlign: 'right',
                      }}>
                      {moment(item.createdAt).fromNow()}
                    </Text>
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        width: 20,
                        height: 20,
                        marginTop: 10,
                        left: 60,
                      }}>
                      <Text style={{color: '#ffffff'}}>2</Text>
                    </View>
                  </View>
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
    padding: 20,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderBottomColor: '#D3D3D3',
  },
});

export default Chat;
