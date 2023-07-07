import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {} from 'react-native-paper';

// icons
import Feather from 'react-native-vector-icons/Feather';

//helpers
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {resetOtpSent} from '../../../redux/actions/authAction';
import {loginValue, resetSuccess} from '../../../redux/reducers/authSlice';

// components
import {metrics, colors, fonts} from '../../../theme';
import {CustomButton, CustomInput} from '../../../components';

import {email} from '../../../utils/regex';

const {moderateScale, verticalScale} = metrics;

const LoginScreen = ({}) => {
  const navigation = useNavigation();

  const {loading, error, userToken} = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<any>({});

  const [inputs, setInputs] = useState({
    email: '',
  });

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    const validEmail = email(inputs.email);

    if (!validEmail) {
      handleError('Please enter valid email Id', 'email');
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };

  const register = () => {
    dispatch(resetOtpSent(inputs));
    navigation.navigate('VerifyOtp');
  };

  const handleOnchange = (text: any, input: any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (_error: any, input: any) => {
    setErrors((prevState: any) => ({...prevState, [input]: _error}));
  };

  useEffect(() => {
    if (userToken) {
      dispatch(resetSuccess());
    }
  }, [userToken]);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={{padding: 10}}>
        <Feather name="arrow-left" size={20} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{padding: 10}}>
        <View style={{flex: 0.8}}>
          <View style={{}}>
            <Text style={styles.title}>Lost Password</Text>
          </View>

          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: moderateScale(14),
              color: '#000F1A',
              top: 18,
            }}>
            Please enter your email address, we will send the OTP to reset your
            password
          </Text>

          <View style={{marginVertical: 10, marginTop: 55}}>
            <CustomInput
              value={inputs.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              onChangeText={(text: string) => {
                handleOnchange(text, 'email');
                dispatch(loginValue());
              }}
              onFocus={() => handleError(null, 'email')}
              label="Email"
              placeholder="Email"
              error={errors.email}
            />
          </View>
        </View>

        <CustomButton
          title="Send Otp"
          disabled
          onPress={validate}
          style={{marginTop: verticalScale(200)}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.bold,
    fontSize: moderateScale(32),
    color: colors.blue,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: moderateScale(14),
    color: '#000F1A',
    top: 18,
  },
});

export default LoginScreen;
