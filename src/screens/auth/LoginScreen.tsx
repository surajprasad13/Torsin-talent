import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  SafeAreaView,
  TextInputProps,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';

import {metrics, colors, fonts} from '../../theme';

// components
import Input from '../../components/Input';
import Loader from '../../components/Loader';

import {useAppDispatch, useAppSelector} from '../../hooks';

const {moderateScale, verticalScale} = metrics;

const LoginScreen = ({}) => {
  const navigation = useNavigation();

  const {loading, error, success} = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState({
    gmail: '',
    password: '',
  });

  const [errors, setErrors] = useState<any>({});

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
    setErrors((prevState: any) => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      {loading && <Loader />}
      <TouchableOpacity
        onPress={() => navigation.navigate('OnboardingScreen')}
        style={{padding: 10}}>
        <Feather name="arrow-left" size={20} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{padding: 10}}>
        <View style={{flex: 0.8}}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: moderateScale(32),
                color: '#0E184D',
              }}>
              Login
            </Text>

            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: moderateScale(14),
                color: '#000F1A',
                top: 18,
              }}>
              Welcome back!
            </Text>
          </View>

          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: moderateScale(14),
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
              label="Email"
              placeholder="torsin@gmail.com"
              error={errors.gmail}
            />

            <Input
              onChangeText={(text: TextInputProps) =>
                handleOnchange(text, 'password')
              }
              onFocus={() => handleError(null, 'password')}
              label="Password"
              placeholder="********"
              error={errors.password}
              password
            />
          </View>
        </View>

        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => {
            //@ts-expect-error
            navigation.navigate('LostPassword');
          }}>
          <Text
            style={{
              fontFamily: fonts.medium,
              color: '#27AE60',
            }}>
            Lost password ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={validate}
          disabled={inputs.gmail && inputs.password ? false : true}
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                inputs.gmail && inputs.password ? '#0E184D' : '#E0E0E0',
            },
          ]}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontFamily: fonts.regular,
              fontSize: moderateScale(16),
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
              fontFamily: fonts.regular,
              fontSize: moderateScale(14),
              color: '#000000',
            }}>
            Don’t have an account?
          </Text>
          <Text
            onPress={() => navigation.navigate('ThroughRegister')}
            style={{
              color: '#0E184D',
              fontFamily: fonts.bold,
              fontSize: moderateScale(14),
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
    fontFamily: fonts.regular,
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
  buttonContainer: {
    width: '85%',
    height: 50,
    marginTop: verticalScale(249),
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
  },
});

export default LoginScreen;
