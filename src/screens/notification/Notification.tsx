import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import notifee from '@notifee/react-native';
import {Divider} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import moment from 'moment';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// helpers
import {colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchNotification} from '../../redux/actions/userAction';

const Notification = ({}) => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const {userInfo} = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();
  const {notification} = useAppSelector(state => state.user);

  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    if (isEnabled) {
      const setting = await notifee.requestPermission();
      if (setting.authorizationStatus) {
        const token = await messaging().getToken();
        const ref = database().ref(`/Tokens/u2id${userInfo?.id}`);
        await ref.update({device_token: token});
      } else {
        console.log('User has disabled notification');
      }
    }
  };

  useEffect(() => {
    dispatch(fetchNotification(''));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          alignItems: 'center',
          margin: 5,
        }}>
        <Text style={{fontSize: 16, fontFamily: fonts.semibold}}>
          Permissions
        </Text>
        <Switch
          trackColor={{false: '#767577', true: colors.primary}}
          thumbColor={isEnabled ? colors.white : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
        />
      </View>
      <FlatList
        data={notification}
        renderItem={({item, index}) => {
          return (
            <View key={index.toString()} style={{}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DrawerNavigation', {
                    screen: 'ContractNavigator',
                    params: {
                      screen: 'ViewContract',
                      params: {
                        id: item.render_id,
                      },
                    },
                  })
                }
                style={styles.container}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    backgroundColor: '#d4d9f7',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="notifications-circle"
                    size={30}
                    color={colors.primary}
                  />
                </View>
                <View style={{width: '80%'}}>
                  <Text
                    style={{
                      fontFamily: fonts.semibold,
                      color: '#333333',
                      fontSize: 14,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      color: '#4F4F4F',
                    }}>
                    {item.desc}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontFamily: fonts.regular, color: '#4F4F4F'}}>
                      {item.sender_name}
                    </Text>
                    <Text style={{fontFamily: fonts.regular, color: '#BDBDBD'}}>
                      {moment(item.createdAt).format('lll')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <Divider />
            </View>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
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
  },
});

export default Notification;
