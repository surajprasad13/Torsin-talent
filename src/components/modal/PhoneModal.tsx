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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import auth from '@react-native-firebase/auth';

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import {colors, fonts, metrics} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {phoneVerified, resetSuccess} from '../../redux/reducers/authSlice';

const {moderateScale} = metrics;

export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 4;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const CELL_COUNT = 6;

const ModalPoup = ({visible, children}) => {
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

const PhoneModal = ({active, phone}) => {
  const dispatch = useAppDispatch();
  const {mobileVerified} = useAppSelector(state => state.auth);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState<any>(null);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [visible, setVisible] = useState<boolean>(false);

  const sendOtp = async () => {
    try {
      const newNumber = phone.replace(/^0+/, '');
      var mobilePhone = newNumber;
      if (newNumber.length === 9) {
        mobilePhone = '971' + phone;
      } else {
        mobilePhone = '91' + phone;
      }
      setLoading(true);
      const mobile = '+' + mobilePhone;
      const confirmation = await auth().signInWithPhoneNumber(mobile);
      setConfirm(confirmation);
      setMessage('Otp sent sucessfully');
      setLoading(false);
    } catch (err) {
      setError(String(error));
      setLoading(false);
    }
  };

  async function confirmCode() {
    try {
      setError('');
      setMessage('');
      setLoading(true);
      await confirm.confirm(value);
      setLoading(false);
      dispatch(phoneVerified());
      dispatch(resetSuccess());
      setVisible(false);
    } catch (_error: any) {
      console.log(_error);
      setLoading(false);
      setMessage('');
      setError('Invalid Code');
    }
  }

  useEffect(() => {
    if (value.length >= 6 && confirm) {
      confirmCode();
    }
  }, [value, confirm]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ModalPoup visible={visible}>
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => {
            setVisible(false);
            setValue('');
          }}>
          <Entypo name="cross" size={20} />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/mobile.png')}
            style={{height: 50, width: 50}}
          />
        </View>

        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: 18,
              textAlign: 'center',
              color: colors.primary,
            }}>
            Phone verification via OTP
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              textAlign: 'center',
              color: colors.black,
              marginTop: 5,
            }}>
            Please enter the verification code send to your Phone.
          </Text>
        </View>

        {!!error && (
          <Text
            style={{
              marginTop: 10,
              fontFamily: fonts.medium,
              color: colors.red,
              textAlign: 'center',
            }}>
            {error}
          </Text>
        )}
        {!!message && (
          <Text
            style={{
              marginTop: 10,
              fontFamily: fonts.medium,
              color: 'green',
              textAlign: 'center',
            }}>
            {message}
          </Text>
        )}

        {loading && <ActivityIndicator style={{marginTop: 10}} />}

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

        <View style={{marginTop: moderateScale(10)}}>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: colors.black,
              textAlign: 'center',
            }}>
            I didn't receive code?{' '}
            <Text
              onPress={() => {
                setConfirm(null);
                setError('');
                setValue('');
                sendOtp();
              }}
              style={{
                color: '#27AE60',
                fontFamily: fonts.regular,
              }}>
              Resend Code
            </Text>
          </Text>
        </View>
      </ModalPoup>

      {mobileVerified ? (
        <AntDesign name="checkcircleo" size={20} color="green" />
      ) : (
        <TouchableOpacity
          disabled={!active}
          onPress={() => {
            setVisible(!visible);
            sendOtp();
          }}>
          <Text
            style={{
              color: active ? colors.primary : 'gray',
              fontFamily: fonts.regular,
            }}>
            Verify
          </Text>
        </TouchableOpacity>
      )}
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
    height: CELL_SIZE,
    marginTop: 10,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 5,
    width: 40,
    height: 40,
    lineHeight: 35,
    fontSize: 20,
    borderWidth: 0.5,
    borderRadius: 4,
    color: '#0C0900',
    backgroundColor: colors.white,
    textAlign: 'center',
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

export default PhoneModal;
