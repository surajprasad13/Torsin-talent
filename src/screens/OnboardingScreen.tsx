import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {colors, fonts} from '../theme';
import {useAppDispatch, useAppSelector} from '../hooks';
import {resetFirst} from '../redux/reducers/authSlice';

const OnboardingScreen = ({}) => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.auth);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(resetFirst());
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <Onboarding
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image source={require('../assets/images/onboarding.png')} />
            ),
            title: 'Talents and Entertainment',
            subtitle:
              'Find the best talents in Media and Entertainment services',
          },

          {
            backgroundColor: '#fff',
            image: (
              <Image source={require('../assets/images/onboarding.png')} />
            ),
            title: 'Talents and Entertainment',
            subtitle:
              'Find the best talents in Media and Entertainment services',
          },

          {
            backgroundColor: '#fff',
            image: (
              <Image source={require('../assets/images/onboarding.png')} />
            ),
            title: 'Talents and Entertainment',
            subtitle:
              'Find the best talents in Media and Entertainment services',
          },
        ]}
        titleStyles={{
          fontFamily: fonts.bold,
          fontSize: 24,
          textAlign: 'center',
          color: '#0E184D',
        }}
        subTitleStyles={{
          fontFamily: fonts.regular,
          textAlign: 'center',
          color: '#595959',
        }}
        onSkip={() => {
          //@ts-expect-error
          navigation.replace('WalkthroughScreen');
        }}
        onDone={() => {
          //@ts-expect-error
          navigation.replace('WalkthroughScreen');
        }}
        showSkip={false}
        showNext={false}
        showDone={false}
        bottomBarColor="#ffffff"
      />

      <View
        style={{
          borderBottomWidth: 0.5,
          backgroundColor: '#0E184D',
        }}></View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}
        style={{
          padding: 15,
          margin: 10,
          backgroundColor: '#DFE6FD',
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#6180F4',
            fontFamily: fonts.bold,
          }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ThroughRegister');
        }}
        style={{
          padding: 15,
          margin: 10,
          backgroundColor: colors.primary,
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#ffffff',
            fontFamily: fonts.bold,
          }}>
          Create an Account
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6180F4',
    fontFamily: fonts.bold,
  },
});

export default OnboardingScreen;
