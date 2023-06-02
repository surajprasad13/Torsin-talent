import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import FastImage from 'react-native-fast-image';

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

const Chat = ({}) => {
  const navigation = useNavigation();
  const [isTextInputVisible, setTextInputVisible] = useState(false);

  const handleSearchIconPress = () => {
    setTextInputVisible(true);
  };
  const cancelSearchIconPress = () => {
    setTextInputVisible(false);
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
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  //@ts-expect-error
                  navigation.navigate('ChatUser', {chatRoomId: item.id});
                }}
                style={styles.container}>
                <FastImage
                  source={{uri: 'https://source.unsplash.com/400x400?user'}}
                  resizeMode="contain"
                  style={{width: 50, height: 50, borderRadius: 25}}
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
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: '#1E202B',
                        top: 10,
                        opacity: 0.6,
                      }}>
                      Artist
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: '#BDBDBD',
                        textAlign: 'right',
                      }}>
                      4 hours ago
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
