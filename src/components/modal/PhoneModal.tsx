import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {colors, fonts, metrics} from '../../theme';

const {moderateScale} = metrics;

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

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

const PhoneModal = () => {
  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [visible, setVisible] = useState<boolean>(false);

  const [value1, setValue1] = useState('');

  const onChangeEmail = text => {
    if (text.length == 0) {
      setValue1({value1: true});
    } else {
      setValue1({value1: false});
    }
    setValue1({value1: text});
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require('../../assets/images/Delete.png')}
                style={{height: 20, width: 20, top: -30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/mobile.png')}
            style={{height: 70, width: 70, top: -40, borderRadius: 20}}
          />
        </View>

        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 18,
            lineHeight: 20,
            top: -30,
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#0E184D',
          }}>
          Phone verification via OTP
        </Text>

        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: 14,
            lineHeight: 20,
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: colors.black,
            top: -20,
          }}>
          Please enter the verification code send to your Phone.
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
              style={[isFocused && styles.focusCell]}>
              <Text style={styles.cell}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(10),
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: moderateScale(14),
              color: colors.black,
            }}>
            I didn't receive code?{' '}
          </Text>
          <Text
            onPress={() => {
              //@ts-expect-error
              navigation.navigate('IndivisualRegister');
            }}
            style={{
              color: '#27AE60',
              fontFamily: fonts.regular,
              fontSize: moderateScale(14),
            }}>
            Resend Code
          </Text>
        </View>
      </ModalPoup>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Text
          style={{
            color: value1 ? '#6180F4' : 'gray',
            fontFamily: fonts.regular,
          }}>
          Verify
        </Text>
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
    height: CELL_SIZE,
    marginTop: 10,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 5,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#0C0900',
    backgroundColor: '#fff',
    top: -20,
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
