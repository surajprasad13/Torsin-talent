import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import {Title} from '../../components';

const list = [
  {
    name: 'Vaibhav',
    email: 'vaibhav@gmail.com',
    id: 'vaibhav',
  },
  {
    name: 'Shreyash',
    email: 'shreyash@gmail.com',
    id: 'shreyash',
  },
  {
    name: 'Tarzan',
    email: 'tarzan@gmail.com',
    id: 'tarzan',
  },
  {
    name: 'Apponward',
    email: 'apponward@gmail.com',
    id: 'apponward',
  },
  {
    name: 'Amisha',
    email: 'amisha@gmail.com',
    id: 'vaibhav',
  },
  {
    name: 'Mayank',
    email: 'shreyash@gmail.com',
    id: 'shreyash',
  },
  {
    name: 'Tarzan',
    email: 'tarzan@gmail.com',
    id: 'tarzan',
  },
  {
    name: 'Apponward',
    email: 'apponward@gmail.com',
    id: 'apponward',
  },
];

const Notification = ({}) => {
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
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
          {list.map((item, index, item1) => {
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
