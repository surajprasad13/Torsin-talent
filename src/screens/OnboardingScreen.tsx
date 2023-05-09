import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {fonts} from '../theme';

const OnboardingScreen = ({}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
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
          imageContainerStyles={{
            width: 276,
            height: 276,
            marginTop: -200,
          }}
          titleStyles={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 24,
            lineHeight: 26,
            textAlign: 'center',
            color: '#0E184D',
            top: 10,
          }}
          subTitleStyles={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 12,
            width: 300,
            lineHeight: 20,
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
            marginBottom: 20,
            backgroundColor: '#0E184D',
          }}></View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
          style={{
            marginTop: 10,
            alignItems: 'center',
            width: '90%',
            height: 50,
            marginLeft: '5%',
            backgroundColor: '#DFE6FD',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: '#6180F4',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '700',
            }}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ThroughRegister');
          }}
          style={{
            marginTop: 20,

            alignItems: 'center',
            width: '90%',
            height: 50,
            marginLeft: '5%',
            backgroundColor: '#14226D',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: '#ffffff',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '700',
            }}>
            Create an Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6180F4',
    fontFamily: fonts.bold,
    marginBottom: 20,
  },
});

export default OnboardingScreen;
