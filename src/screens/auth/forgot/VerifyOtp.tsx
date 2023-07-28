import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';

// Helpers
import {CustomButton, Title} from '../../../components';
import {colors, fonts} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {otpverify, resetOtpSent} from '../../../redux/actions/authAction';
import {resetSuccess} from '../../../redux/reducers/authSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../../routes/RouteType';

const {width} = Dimensions.get('window');
const CELL_COUNT = 6;

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const VerifyOtp = ({route}: any) => {
  const {email} = route.params;
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const {loading, success, error} = useAppSelector(state => state.auth);

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .length(CELL_COUNT, 'OTP must be exactly 6 characters')
      .matches(/^\d+$/, 'OTP must only contain numbers')
      .required('OTP is required'),
  });

  const onPressResend = () => {
    if (email) {
      let field = {
        inputs: {
          email,
        },
      };
      dispatch(otpverify(field));
      navigation.navigate('ResetPassword', {email});
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigation.navigate('ResetPassword', {email});
    }
  }, [success]);

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
            top: 10,
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
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
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
                    textAlign: 'left',
                    left: 10,
                    color: 'red',
                    fontFamily: fonts.medium,
                  }}>
                  {error}
                </Text>
              )}
              {touched.otp && errors.otp && (
                <Text style={{color: 'red', marginTop: 10}}>{errors.otp}</Text>
              )}
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
                disabled={!loading && values.otp.length > 5}
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
    maxWidth: 45,
    maxHeight: 45,
    fontSize: 20,
    borderWidth: 0.3,
    borderRadius: 2,
    color: '#0C0900',
    backgroundColor: colors.white,
    textAlign: 'center',
    padding: 10,

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // Android
    elevation: 1,
  },
});

export default VerifyOtp;
