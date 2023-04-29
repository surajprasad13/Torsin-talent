import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  ScrollView,
  SafeAreaView,
  TextInputProps,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {metrics, colors} from '../../theme';

import Input from '../../components/Input';
import Loader from '../../components/Loader';

import {RootState} from '../../redux';

const {moderateScale, verticalScale} = metrics;

const LoginScreen = ({}) => {
  const navigation = useNavigation();

  const {error, success} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    gmail: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.gmail) {
      handleError('Please enter email Id', 'gmail');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please enter password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = async () => {
    const article = {
      mobileNo: inputs.gmail,
      password: inputs.password,
    };
  };

  const handleOnchange = (text: any, input: any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error: any, input: any) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={true}
      />
      {loading && <Loader />}
      <TouchableOpacity
        onPress={() => {
          //@ts-expect-error
          navigation.navigate('OnboardingScreen');
        }}
        style={{
          position: 'relative',
          left: 24,
          paddingVertical: 32,
        }}>
        <Image
          style={styles.tinyLogo}
          source={require('../../../src/assets/images/backarrow.png')}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={{flex: 0.8}}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '700',
                // fontFamily: 'Poppins-ExtraBold',
                fontSize: moderateScale(32),
                lineHeight: moderateScale(35),
                color: '#0E184D',
                marginTop: 50,
              }}>
              Login
            </Text>

            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                width: 300,
                fontSize: moderateScale(14),
                lineHeight: moderateScale(17),
                alignItems: 'center',
                color: '#000F1A',
                top: 18,
              }}>
              Welcome back!{' '}
            </Text>
          </View>

          <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              width: 300,
              fontSize: moderateScale(14),
              lineHeight: moderateScale(17),
              alignItems: 'center',
              color: '#000F1A',
              top: 18,
            }}>
            Please fill the below details to Login the app.
          </Text>

          <View style={{marginVertical: 10, marginTop: 55}}>
            <Input
              keyboardType="default"
              onChangeText={(text: TextInputProps) =>
                handleOnchange(text, 'gmail')
              }
              onFocus={() => handleError(null, 'gmail')}
              // iconName="phone-outline"
              label="Email"
              placeholder="torsin@gmail.com"
              error={errors.gmail}
            />

            <Input
              onChangeText={(text: TextInputProps) =>
                handleOnchange(text, 'password')
              }
              onFocus={() => handleError(null, 'password')}
              // iconName="lock-outline"
              label="Password"
              placeholder="********"
              error={errors.password}
              password
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            //@ts-expect-error
            navigation.navigate('LostPassword');
          }}>
          <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 12,
              lineHeight: 18,
              bottom: 15,
              color: '#27AE60',
              textAlign: 'center',
            }}>
            Lost password ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={validate}
          disabled={inputs.gmail && inputs.password ? false : true}
          style={{
            width: '85%',
            height: 50,
            marginTop: verticalScale(249),
            // marginTop: moderateScale(150),
            marginLeft: '7.5%',
            backgroundColor:
              inputs.gmail && inputs.password ? '#0E184D' : '#E0E0E0',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontSize: moderateScale(16),
              lineHeight: 22,
            }}>
            Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(16),
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: moderateScale(14),
              lineHeight: 22,
              color: '#000000',
            }}>
            Don’t have an account?
          </Text>
          <Text
            onPress={() => {
              //@ts-expect-error
              navigation.navigate('ThroughRegister');
            }}
            style={{
              color: '#0E184D',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: moderateScale(14),
              lineHeight: 22,
              left: 2,
            }}>
            Create account
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },

  tinyLogo: {
    width: 16,
    height: 14,
  },

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;
