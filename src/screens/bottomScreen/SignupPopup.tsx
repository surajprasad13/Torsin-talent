import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {fonts, appstyle, colors} from '../../theme';

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
    <View style={{flex: 1}}>
      <ModalPoup visible={visible}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{alignItems: 'flex-end', right: 10}}>
          <Entypo name="cross" size={20} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            maxHeight: 300,
          }}>
          <Image
            source={require('../../assets/images/otp.png')}
            style={{
              width: 89,
              height: 80,
              alignSelf: 'center',
              bottom: 10,
              marginLeft: 5,
            }}
          />
          <View style={{width: '80%', margin: 5, marginLeft: 10}}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: 16,
                color: '#1E202B',
              }}>
              Sign up to explore more
            </Text>

            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 10,
                color: '#1E202B',
                marginTop: 5,
              }}>
              Continue to the sign up page to start exploring more content.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('OnboardingScreen')}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 12,
                  color: '#14226D',
                  marginTop: 5,
                }}>
                Go to login/SignUp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPoup>
      <TouchableOpacity
        onPress={setVisible}
        style={{
          padding: 10,
          backgroundColor: '#14226D',
          borderRadius: 4,
          bottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colors.white,
            fontFamily: fonts.semibold,
            fontSize: 14,
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
    ...appstyle.shadow,
    margin: 10,
    width: '95%',
    borderRadius: 15,
  },
});

export default SignupPopup;
