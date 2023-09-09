import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';

// icons
import Feather from 'react-native-vector-icons/Feather';

import {metrics, colors, fonts} from '../../theme';

// components
import Input from '../../components/Input';
import {CustomButton, CustomInput} from '../../components';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {userLogin} from '../../redux/actions/authAction';
import {
  loginValue,
  resetSuccess,
  updateWithoutRegister,
} from '../../redux/reducers/authSlice';

interface Values {
  email?: string;
  mobileNo?: string;
  password: string;
}

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .test('email', 'Invalid email or phone number', (value: any) => {
      // Regular expression for email validation
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // Regular expression for phone number validation
      const phoneRegex = /^\d{10}$/;
      // Check if the value matches either email or phone number pattern
      return emailRegex.test(value) || phoneRegex.test(value);
    })
    .required('Email/Phone is required'),
  password: Yup.string()
    .required('Please enter password')
    .min(8)
    .required('Min 8 characters are required'),
});

const {moderateScale} = metrics;

const LoginScreen = ({}) => {
  const navigation = useNavigation();

  const {loading, error, userToken} = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const onSubmit = (values: any) => {
    const isNumber = /^\d+$/.test(values.email);
    if (isNumber) {
      dispatch(userLogin({mobileNo: values.email, password: values.password}));
    } else {
      dispatch(userLogin(values));
    }
  };

  useEffect(() => {
    if (userToken) {
      dispatch(resetSuccess());
      dispatch(updateWithoutRegister());
    }
  }, [userToken]);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('OnboardingScreen')}
        style={{padding: 10}}>
        <Feather name="arrow-left" size={20} />
      </TouchableOpacity>
      <Formik
        onSubmit={onSubmit}
        validateOnChange={false}
        validationSchema={LoginValidationSchema}
        initialValues={{
          email: '',
          password: '',
        }}>
        {({values, errors, handleSubmit, handleChange, setErrors}) => (
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
                <CustomInput
                  autoCapitalize="none"
                  returnKeyType="done"
                  onChangeText={(text: string) => {
                    setErrors({email: ''});
                    handleChange('email')(text);
                    dispatch(loginValue());
                  }}
                  onFocus={() => {
                    setErrors({email: ''});
                    dispatch(loginValue());
                  }}
                  label="Mobile / Email"
                  placeholder="Mobile no / Email"
                  error={errors.email}
                  maxLength={/^\d+$/.test(values.email) ? 15 : 50}
                  containerStyle={{
                    marginTop: 30,
                  }}
                />

                <CustomInput
                  value={values.password}
                  onChangeText={(text: string) => {
                    handleChange('password')(text);
                    dispatch(loginValue());
                  }}
                  onFocus={() => setErrors({password: ''})}
                  label="Password"
                  placeholder="********"
                  error={errors.password}
                  password
                  containerStyle={{
                    marginTop: 20,
                  }}
                />
              </View>
            </View>
            {!!error && (
              <Text
                style={{
                  textAlign: 'left',
                  left: 10,
                  color: 'red',
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
              onPress={handleSubmit}
              disabled={!!values.email && !!values.password}
              loading={loading}
              style={{marginTop: 150, bottom: 20}}
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
        )}
      </Formik>
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
