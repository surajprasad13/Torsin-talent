import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useNavigation} from '@react-navigation/native';

// helpers
import {metrics} from '../../../theme';

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
          //@ts-expect-error
          navigation.navigate('LostPassword');
        }}
        style={{
          position: 'relative',
          left: 15,
          marginTop: moderateScale(40),
        }}>
        <Image
          style={{
            width: 16,
            height: 16,
          }}
          source={require('../../../assets/images/backarrow.png')}
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
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: moderateScale(32),
              lineHeight: moderateScale(35),
              left: 10,
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
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
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
              lineHeight: 22,
              color: '#000000',
            }}>
            I didn't receive code?
          </Text>
          <Text
            onPress={() => {
              //@ts-expect-error
              navigation.navigate('RegisterScreen');
            }}
            style={{
              color: '#27AE60',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: moderateScale(14),
              lineHeight: 22,
              left: 2,
            }}>
            Resend Code
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          //@ts-expect-error
          navigation.navigate('ResetPassword');
        }}
        style={{
          width: '85%',
          height: 50,
          // marginTop: moderateScale(150),
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

export default VerifyOtp;
