import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';

// components

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {useAppSelector} from '../../hooks';

const Chat = ({}) => {
  const navigation = useNavigation();

  const {} = useAppSelector(state => state.auth);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.white,
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
          style={{padding: 10}}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: fonts.medium,
            color: '#000C14',
          }}>
          Skills & Services
        </Text>
        <View />
      </View>

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
            }}>
            Skills
          </Text>
          <TouchableOpacity>
            <Text style={{color: colors.primary}}>
              <Feather name="plus-circle" size={15} color={colors.primary} />{' '}
              Add new skills{' '}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            ...appstyle.shadow,
            borderRadius: 10,
            margin: 10,
            padding: 10,
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {/*  */}

          {[0, 1, 2, 3, 34, 45, 5, 5].map(() => {
            return (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#08161433',
                  margin: 5,
                  padding: 10,
                  borderRadius: 25,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    color: colors.black,
                    opacity: 0.4,
                  }}>
                  Singing
                </Text>
              </View>
            );
          })}

          {/*  */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
