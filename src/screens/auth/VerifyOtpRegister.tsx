import React, {useState} from 'react';

import {View, Text, Image, TouchableOpacity} from 'react-native';
import {fonts, metrics} from '../../theme';

const {horizontalScale, moderateScale, verticalScale} = metrics;

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles from './forgot/styles';
import {useNavigation} from '@react-navigation/native';

const CELL_COUNT = 6;

const VerifyOtpRegister = ({}) => {
  const navigation = useNavigation();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RegisterScreen');
        }}
        style={{
          position: 'relative',
          left: 15,
          marginTop: moderateScale(20),
        }}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/images/backarrow.png')}
        />
      </TouchableOpacity>

      <View style={{flex: 0.8}}>
        <View
          style={{
            marginTop: verticalScale(100),
            marginLeft: horizontalScale(15),
          }}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: moderateScale(32),
              lineHeight: moderateScale(35),
              color: '#0E184D',
            }}>
            Verify OTP
          </Text>

          <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              marginTop: 10,
              width: horizontalScale(300),
              fontSize: moderateScale(14),
              lineHeight: moderateScale(17),
              alignItems: 'center',
              color: '#000F1A',
            }}>
            Please wait till we verify your Mobile number 7894561230
          </Text>
        </View>

        <View style={{marginTop: verticalScale(20)}}>
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
              <View onLayout={getCellOnLayoutHandler(index)} key={index}>
                <Text style={styles.cell}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(10),
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
            I didn't receive code?
          </Text>
          <Text
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}
            style={{
              color: '#27AE60',
              fontFamily: fonts.regular,
              fontSize: moderateScale(14),
              lineHeight: 22,
            }}>
            Resend Code
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ResetPassword');
        }}
        style={{
          width: '85%',
          flex: 0.075,
          marginLeft: '7.5%',
          backgroundColor: '#14226D',
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
          Submit & Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyOtpRegister;
