import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {fonts, metrics} from '../../../theme';

const {horizontalScale, moderateScale, verticalScale} = metrics;
const CELL_COUNT = 6;

const VerifyOtp = ({}) => {
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
          navigation.navigate('LostPassword');
        }}
        style={{
          position: 'relative',
          left: 15,
          marginTop: moderateScale(40),
        }}>
        <Feather name="arrow-left" size={20} />
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
              left: 10,
              color: '#0E184D',
            }}>
            Verify OTP
          </Text>

          <Text
            style={{
              fontFamily: fonts.regular,
              marginTop: 10,
              width: horizontalScale(300),
              fontSize: moderateScale(14),
              lineHeight: moderateScale(17),
              alignItems: 'center',
              left: 10,
              color: '#000F1A',
            }}>
            Please wait till we verify your Email jo**@*****.com
          </Text>
        </View>

        <View style={{marginTop: verticalScale(20)}}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[]}>
                <Text>{symbol || (isFocused ? <Cursor /> : null)}</Text>
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
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: moderateScale(14),

              left: 2,
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
          height: 50,
          marginLeft: '7.5%',
          backgroundColor: '#14226D',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#FFFFFF',
            fontFamily: fonts.regular,
            fontSize: moderateScale(16),
          }}>
          Submit & Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyOtp;
