/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Formik} from 'formik';
import * as Yup from 'yup';

// Helpers
import {fonts, appstyle, colors} from '../../../theme';

import {CustomButton, Title} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {otpverify, resetOtpSent} from '../../../redux/actions/authAction';
import {
  resetOtpVerified,
  resetSuccess,
} from '../../../redux/reducers/authSlice';
import {AuthScreenParamList} from '../../../routes/RouteType';

const {width} = Dimensions.get('window');
const CELL_COUNT = 6;

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const VerifyOtp = ({route}: any) => {
  const {email} = route.params;
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const {loading, success, error, otpVerified, message} = useAppSelector(
    state => state.auth,
  );

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .length(CELL_COUNT, 'OTP must be exactly 6 characters')
      .matches(/^\d+$/, 'OTP must only contain numbers')
      .required('OTP is required'),
  });

  useEffect(() => {
    if (success && otpVerified) {
      dispatch(resetSuccess());
      navigation.navigate('ResetPassword', {email});
      dispatch(resetOtpVerified());
    }
  }, [success, otpVerified]);

  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Title title="" />
      <View style={{flex: 0.8, padding: 10, marginTop: 20}}>
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: 22,
            color: '#0E184D',
          }}>
          Verify Otp
        </Text>

        <Text
          style={{
            fontFamily: fonts.regular,
            alignItems: 'center',
            color: '#000F1A',
            marginTop: 10,
          }}>
          Please wait till we verify your Email address
        </Text>

        <Formik
          initialValues={{otp: ''}}
          validationSchema={validationSchema}
          onSubmit={values => {
            const field = {
              email,
              otp: Number(values.otp),
            };
            dispatch(otpverify(field));
          }}>
          {({values, handleChange, handleSubmit, errors, touched}) => (
            <>
              <CodeField
                ref={ref}
                {...props}
                value={values.otp}
                onChangeText={handleChange('otp')}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                onFocus={() => {
                  dispatch(resetSuccess());
                }}
                renderCell={({index, symbol, isFocused}) => (
                  <View
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[]}>
                    <Text style={styles.cell}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
              {!!error && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    fontFamily: fonts.medium,
                    padding: 10,
                  }}>
                  {error}
                </Text>
              )}

              {!!message && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'green',
                    fontFamily: fonts.medium,
                    padding: 10,
                  }}>
                  {message}
                </Text>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    color: '#000000',
                  }}>
                  I didn't receive code?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(resetOtpSent({email}));
                  }}>
                  <Text
                    style={{
                      color: '#27AE60',
                      fontFamily: fonts.regular,
                    }}>
                    {' '}
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>
              <CustomButton
                onPress={handleSubmit}
                title="Submit & Verify"
                disabled={values.otp.length > 5}
                loading={loading}
                style={{marginTop: 300}}
              />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  codeFiledRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cell: {
    marginHorizontal: 9,
    width: width * 0.2,
    height: width * 0.2,
    maxWidth: 40,
    maxHeight: 45,
    fontSize: 20,
    borderWidth: 0.3,
    borderRadius: 4,
    color: '#0C0900',
    textAlign: 'center',
    padding: 10,
    backgroundColor: colors.white,
  },
});

export default VerifyOtp;
