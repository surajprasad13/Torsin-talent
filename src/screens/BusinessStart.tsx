import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {metrics} from '../theme';

const {moderateScale} = metrics;

const BusinessStart = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/business.png')}
        style={{
          flex: 0.8,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{}}>
          <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '800',
              fontSize: 32,
              textAlign: 'center',
              width: 259,
              textTransform: 'uppercase',
              color: '#14226D',
            }}>
            Let’s get started with Torsin
          </Text>
        </View>
      </ImageBackground>
      <View>
        <Text
          style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 16,
            textAlign: 'center',
            color: ' #000F1A',
          }}>
          Account Created Successful
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          //@ts-expect-error
          navigation.navigate('HomeScreen');
        }}
        style={{
          width: '85%',
          // flex: 0.075,
          height: 50,
          marginTop: moderateScale(50),
          marginLeft: '7.5%',
          backgroundColor: '#0E184D',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#FFFFFF',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: moderateScale(16),
            lineHeight: 22,
          }}>
          Let’s start
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BusinessStart;
