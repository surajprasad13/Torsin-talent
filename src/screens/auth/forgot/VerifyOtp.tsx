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

//helpers
import {CustomButton, Title} from '../../../components';
import {colors, fonts} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {otpverify, resetOtpSent} from '../../../redux/actions/authAction';
import {resetSuccess} from '../../../redux/reducers/authSlice';

const {width} = Dimensions.get('window');

const CELL_COUNT = 6;

const VerifyOtp = ({route}: any) => {
  const {email} = route.params;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {loading, success, emailVerified} = useAppSelector(state => state.auth);

  const onPressResend = () => {
    if (email) {
      let field = {
        inputs: {
          email,
        },
      };
      dispatch(otpverify(field));
      navigation.navigate('ResetPassword');
    }
  };

  useEffect(() => {
    if (value.length >= 6) {
      const field = {
        email,
        otp: Number(value),
      };
      dispatch(otpverify(field));
    }
  }, [value]);

  useEffect(() => {
    if (emailVerified) {
    }
  }, [emailVerified]);

  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigation.navigate('ResetPassword');
    }
  }, [success]);

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
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
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
              {''} Resend Code
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          onPress={onPressResend}
          title="Submit & Verify"
          disabled
          loading={loading}
          style={{marginTop: 300}}
        />
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
