import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {} from '@react-navigation/native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {Divider} from 'react-native-paper';
import {Title} from '../../components';
import {useAppSelector} from '../../hooks';

const Notification = ({}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {userInfo} = useAppSelector(state => state.auth);

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Notification" />
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
      <ScrollView>
        <View
          style={{
            ...appstyle.shadow,
            padding: 10,
            borderRadius: 15,
            backgroundColor: 'white',
            margin: 10,
          }}>
          {[0, 1, 2, 3].map((item, index, item1) => {
            return (
              <View key={index.toString()} style={{}}>
                <TouchableOpacity
                  // onPress={() => {
                  //   //@ts-expect-error
                  //   navigation.navigate('ChatUser', {chatRoomId: item.id});
                  // }}
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
                      Proposal Accepted
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: '#4F4F4F',
                      }}>
                      Your Request has been accepted by
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{fontFamily: fonts.regular, color: '#4F4F4F'}}>
                        Gregory smith.
                      </Text>
                      <Text
                        style={{fontFamily: fonts.regular, color: '#BDBDBD'}}>
                        4 hours ago
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <Divider />
              </View>
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
  },
});

export default Notification;
