/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {colors, fonts} from '../../theme';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {sendOtp, verifyOtp} from '../../redux/actions/authAction';

export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 4;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const CELL_COUNT = 6;

const ModalPoup = ({visible, children}: any) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const EmailModal = ({active, email}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {loading, error, success, userToken, message, emailVerified} =
    useAppSelector(state => state.auth);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [visible, setVisible] = React.useState(false);

  const onPressResend = () => {
    if (active && email) {
      let field = {
        inputs: {
          email,
        },
        userToken,
      };
      dispatch(sendOtp(field));
    }
  };

  useEffect(() => {
    if (visible) {
      onPressResend();
    }
  }, [visible, email]);

  useEffect(() => {
    if (value.length >= 6) {
      const field = {
        email,
        otp: Number(value),
      };
      dispatch(verifyOtp(field));
    }
  }, [value]);

  useEffect(() => {
    if (emailVerified) {
      setVisible(false);
    }
  }, [emailVerified]);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ModalPoup visible={visible}>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => setVisible(false)}>
          <Entypo name="cross" size={20} />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/Email.png')}
            style={{height: 50, width: 50}}
          />
        </View>

        {loading && <ActivityIndicator />}

        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: 18,
              lineHeight: 20,
              textAlign: 'center',
              color: colors.primary,
            }}>
            Email verification via OTP
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              textAlign: 'center',
              color: colors.black,
              marginTop: 5,
            }}>
            Please enter the verification code send to your Email.
          </Text>
        </View>

        {!!error && (
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.red,
              marginTop: 10,
              textAlign: 'center',
            }}>
            {error}
          </Text>
        )}

        {message && (
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: 'green',
              textAlign: 'center',
              marginTop: 10,
            }}>
            {message}
          </Text>
        )}

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
              style={[isFocused && styles.focusCell]}>
              <Text style={styles.cell}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        <Text
          style={{
            fontFamily: fonts.regular,
            color: colors.black,
            textAlign: 'center',
            marginTop: 15,
          }}>
          I didn't receive code?{' '}
          <Text
            onPress={() => {
              onPressResend();
            }}
            style={{
              color: '#27AE60',
              fontFamily: fonts.regular,
            }}>
            Resend Code
          </Text>
        </Text>
      </ModalPoup>

      <TouchableOpacity disabled={!active} onPress={() => setVisible(!visible)}>
        {emailVerified ? (
          <Text style={{fontFamily: fonts.medium, color: 'green'}}>
            Veririfed
          </Text>
        ) : (
          <Text
            style={{
              color: active ? colors.primary : 'gray',
              fontFamily: fonts.regular,
            }}>
            Verify
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  codeFiledRoot: {
    marginTop: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 5,
    height: CELL_SIZE,
    width: CELL_SIZE,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    textAlign: 'center',
    color: '#0C0900',
    backgroundColor: '#fff',
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
  focusCell: {},
});

export default EmailModal;
