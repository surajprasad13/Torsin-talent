import React from 'react';

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from './Components/Metrics';

const WalkthroughScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/bgImage.png')}
        resizeMode="cover"
        style={styles.image}></ImageBackground>

      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={{
          flex: 0.075,
          alignItems: 'center',
          width: '90%',
          height: 50,
          marginLeft: '5%',
          backgroundColor: '#DFE6FD',
          justifyContent: 'center',
          borderRadius: 8,
          marginTop: verticalScale(50),
        }}>
        <View>
          <Text
            style={{
              fontSize: moderateScale(16),
              textAlign: 'center',
              color: '#6180F4',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '700',
            }}>
            Login
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ThroughRegister')}
        style={{
          flex: 0.075,
          alignItems: 'center',
          width: '90%',
          height: 50,
          marginLeft: '5%',
          backgroundColor: '#14226D',
          justifyContent: 'center',
          borderRadius: 8,
          marginTop: verticalScale(20),
        }}>
        <View>
          <Text
            style={{
              fontSize: moderateScale(16),
              textAlign: 'center',
              color: '#ffffff',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '700',
            }}>
            Create an Account
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WalkthroughScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
    justifyContent: 'center',
  },

  loginBtn: {
    width: '90%',
    backgroundColor: '#fc6127',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: '5%',
    borderRadius: 10,
  },
  regBtn: {
    width: '90%',
    backgroundColor: 'white',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: '5%',
    borderRadius: 10,
  },
  image: {
    flex: 0.8,
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  regText: {
    color: '#87c6bd',
    fontSize: 20,
    fontWeight: '600',
  },
  head: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'serif',
    fontStyle: 'italic',
  },
});
