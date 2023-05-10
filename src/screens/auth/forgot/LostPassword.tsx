import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {colors, fonts} from '../../../theme';
import {CustomButton, CustomInput} from '../../../components';

const LostPassword = ({}) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 10}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
          style={{}}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>

        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: 32,
              color: colors.primary,
            }}>
            Lost Password
          </Text>

          <Text
            style={{
              fontFamily: fonts.regular,
              color: '#000F1A',
            }}>
            Please enter your email address, we will send the OTP to reset your
            password
          </Text>

          <CustomInput
            label="Email"
            placeholder="eg.john@gmail.com"
            placeholderTextColor="#828282"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            containerStyle={{marginTop: 50}}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <CustomButton
          onPress={() => {
            navigation.navigate('VerifyOtp');
          }}
          disabled
          title="Send Otp"
          style={{marginBottom: 50}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LostPassword;
