import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import {} from '@react-navigation/native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

//icons

// helpers
import {colors, fonts} from '../../theme';
import {Title} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchNotification} from '../../redux/actions/userAction';
import NotificationCard from './components/NotificationCard';

const Notification = ({}) => {
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
      }
    }
  };

  useEffect(() => {
    dispatch(fetchNotification(''));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Notification" />

      <FlatList
        data={notification}
        ListHeaderComponent={
          <View>
            {notification && notification.length > 0 && (
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
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Image
              source={require('../../assets/images/noModule/notification.png')}
              style={styles.image}
            />
            <Text style={styles.noNotificationText}>No Notifications</Text>
          </View>
        }
        renderItem={({item}) => {
          return <NotificationCard item={item} />;
        }}
        contentContainerStyle={{flex: 1}}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  noNotificationText: {
    marginTop: 20,
    fontFamily: fonts.semibold,
    fontSize: 24,
    color: '#000F1A',
  },
});

export default Notification;
