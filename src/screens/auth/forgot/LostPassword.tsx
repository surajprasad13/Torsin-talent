import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {colors, fonts, metrics} from '../../../theme';
import {useNavigation} from '@react-navigation/native';

const {horizontalScale, moderateScale, verticalScale} = metrics;

const LostPassword = ({}) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}
        style={{
          left: 15,
          marginTop: moderateScale(50),
        }}>
        <Image
          style={styles.tinyLogo}
          source={require('../../../assets/images/backarrow.png')}
        />
      </TouchableOpacity>

      <View>
        <View
          style={{
            marginTop: verticalScale(44.44),
            marginLeft: horizontalScale(20),
          }}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: moderateScale(32),
              color: colors.primary,
            }}>
            Lost Password
          </Text>

          <Text
            style={{
              fontFamily: fonts.regular,
              width: horizontalScale(300),
              fontSize: moderateScale(14),
              color: '#000F1A',
              top: 20,
            }}>
            Please enter your email address, we will send the OTP to reset your
            password
          </Text>
        </View>

        <View style={{marginTop: verticalScale(51)}}>
          <Text
            style={{
              color: '#4F4F4F',
              marginLeft: horizontalScale(15),
              fontFamily: fonts.regular,
              fontSize: moderateScale(16),
            }}>
            Email
          </Text>

          <View style={styles.inputText}>
            <TextInput
              style={styles.input}
              placeholder="eg.john@gmail.com"
              placeholderTextColor="#828282"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('VerifyOtp');
        }}
        style={{
          width: '85%',
          height: 50,

          marginLeft: '7.5%',
          backgroundColor: '#14226D',
          justifyContent: 'center',
          borderRadius: 8,
          marginTop: 395,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#FFFFFF',
            fontFamily: 'Inter',
            fontSize: moderateScale(16),
            lineHeight: 22,
          }}>
          Send OTP
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputText: {
    width: '92%',
    marginLeft: '4%',
    height: 50,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    marginTop: 10,
    borderRadius: 12,
  },
  input: {
    color: '#000000',
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
  },
  tinyLogo: {
    width: 16,
    height: 16,
    tintColor: '#000000',
  },
});

export default LostPassword;
