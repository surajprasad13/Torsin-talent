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
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

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
    dispatch(fetchNotification());
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#f9fbff', flex: 1}}>
      <Title title="Notification" />

      <FlatList
        data={notification}
        style={{flex: 1}}
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
          <View style={[styles.centerContainer, {flex: 1}]}>
            <Image
              source={require('../../assets/images/noModule/notification.png')}
              style={styles.emptyImage}
            />
            <Text style={styles.noNotificationText}>No Notifications</Text>
          </View>
        }
        renderItem={({item}) => {
          return <NotificationCard item={item} />;
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: '70%',
    height: 200,
    resizeMode: 'contain',
    marginLeft: '15%',
    marginTop: '50%',
  },
  noNotificationText: {
    marginTop: 20,
    fontFamily: fonts.semibold,
    fontSize: 24,
    color: '#000F1A',
  },
});

export default Notification;
