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
import {StackActions, useNavigation} from '@react-navigation/native';
import {Dialog, Portal} from 'react-native-paper';

// icons
import Feather from 'react-native-vector-icons/Feather';

import {metrics, colors, fonts} from '../../theme';

// components
import Input from '../../components/Input';
import Loader from '../../components/Loader';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {userLogin} from '../../redux/actions/authAction';
import {loginValue, resetSuccess} from '../../redux/reducers/authSlice';
import {CustomButton} from '../../components';
import {email, password} from '../../utils/regex';

const {moderateScale, verticalScale} = metrics;

const LoginScreen = ({}) => {
  const navigation = useNavigation();

  const {loading, error, userToken} = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    const validEmail = email(inputs.email);
    const validPassword = password(inputs.password);

    if (!validEmail) {
      handleError('Please enter valid email Id', 'email');
      isValid = false;
    }
    if (inputs.password.length < 8) {
      handleError('Min password length of 8', 'password');
      isValid = false;
    }
    if (!validPassword && inputs.password.length >= 8) {
      handleError('Please enter valid password', 'password');
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };

  const register = () => {
    dispatch(userLogin(inputs));
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
      navigation.reset({
        index: 0,
        routes: [{name: 'DrawerNavigation'}],
      });
    }
  }, [userToken, navigation]);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('OnboardingScreen')}
        style={{padding: 10}}>
        <Feather name="arrow-left" size={20} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{padding: 10}}>
        <View style={{flex: 0.8}}>
          <View style={{}}>
            <Text style={styles.title}>Login</Text>

            <Text style={styles.subtitle}>Welcome back!</Text>
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

            <Input
              value={inputs.password}
              onChangeText={(text: string) => {
                handleOnchange(text, 'password');
                dispatch(loginValue());
              }}
              onFocus={() => handleError(null, 'password')}
              label="Password"
              placeholder="********"
              error={errors.password}
              password
            />
          </View>
        </View>
        {!!error && (
          <Text
            style={{
              textAlign: 'left',
              left: 10,
              color: 'red',
              bottom: 20,
              fontFamily: fonts.medium,
            }}>
            {error}
          </Text>
        )}

        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => {
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

        <CustomButton
          title="Login"
          onPress={validate}
          disabled={inputs.email && inputs.password ? true : false}
          style={{marginTop: verticalScale(200)}}
          loading={loading}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: colors.black,
            }}>
            Don’t have an account?
          </Text>
          <Text
            onPress={() => navigation.navigate('ThroughRegister')}
            style={{
              color: '#0E184D',
              fontFamily: fonts.bold,
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
