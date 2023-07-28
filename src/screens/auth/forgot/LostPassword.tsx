/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
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
import * as yup from 'yup';

// icons
import Feather from 'react-native-vector-icons/Feather';

//helpers
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {resetOtpSent} from '../../../redux/actions/authAction';
import {resetSuccess} from '../../../redux/reducers/authSlice';

// components
import {metrics, colors, fonts} from '../../../theme';
import {CustomButton, CustomInput} from '../../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../../routes/RouteType';

const {moderateScale, verticalScale} = metrics;

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required *'),
});

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const LostPasswordScreen: FC = ({}) => {
  const [value, setValue] = useState('');

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const {loading, success, error} = useAppSelector(state => state.auth);

  const handleOnSubmit = (values: any) => {
    dispatch(resetOtpSent({email: values.email}));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigation.navigate('VerifyOtp', {email: value});
    }
  }, [success]);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={{padding: 10}}>
        <Feather name="arrow-left" size={20} />
      </TouchableOpacity>
      <Formik
        validateOnChange={false}
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}>
        {({handleSubmit, handleChange, values, errors, setErrors}) => (
          <ScrollView contentContainerStyle={{padding: 10}}>
            <View style={{flex: 0.8}}>
              <Text style={styles.title}>Lost Password</Text>

              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: moderateScale(14),
                  color: '#000F1A',
                  top: 18,
                }}>
                Please enter your email address, we will send the OTP to reset
                your password
              </Text>

              <View style={{marginVertical: 10, marginTop: 55}}>
                <CustomInput
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  onChangeText={(text: string) => {
                    setErrors({email: ''});
                    handleChange('email')(text);
                    setValue(text);
                  }}
                  onFocus={() => {}}
                  label="Email"
                  placeholder="Email"
                  error={errors.email || error}
                />
              </View>
            </View>

            <CustomButton
              title="Send Otp"
              disabled
              loading={loading}
              onPress={handleSubmit}
              style={{marginTop: verticalScale(200)}}
            />
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

export default LostPasswordScreen;
