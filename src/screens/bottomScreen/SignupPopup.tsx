import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../Components/Metrics';
import { useNavigation } from '@react-navigation/native';

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
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

const SignupPopup = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require('../../assets/images/Delete.png')}
                style={{height: 20, width: 20, bottom: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              bottom: 30,
            }}>
            <Image
              source={require('../../assets/images/otp.png')}
              style={{
                width: 89,
                height: 80,
                left: 5,
                top: 5,
              }}
            />
            <Text
              style={{
                width: 183,
                height: 20,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: 16,
                top: 10,
                left: 15,
                lineHeight: 20,
                display: 'flex',
                alignItems: 'center',
                color: '#1E202B',
              }}>
              Sign up to explore more
            </Text>
          </View>

          <Text
            style={{
              width: 175,
              height: 26,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: 10,
              top: 10,
              left: 100,
              opacity: 0.8,
              position: 'absolute',
              lineHeight: 12,
              textAlign: 'center',
              color: '#1E202B',
            }}>
            Continue to the sign up page to start exploring more content.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('OnboardingScreen')}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 12,
              bottom: 20,
              color: '#14226D',
            }}>
            Go to login/SignUp
          </Text>
        </TouchableOpacity>
      </ModalPoup>
      <TouchableOpacity
        onPress={setVisible}
        style={{
          width: 82,
          height: 27,
          backgroundColor: '#14226D',
          borderRadius: 4,
          bottom: 10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 15,
            color: '#FFFFFF',
          }}>
          Sign up
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
});

export default SignupPopup;
