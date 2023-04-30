import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {fonts} from '../theme';

const ThroughRegister = ({}) => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/images/back.png')}
      style={{flex: 1, justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('IndivisualRegister')}
        style={styles.buttonContainer}>
        <Text style={styles.text}>Individual</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('FirstStepBusinessRegister')}
        style={styles.buttonContainer}>
        <Text style={styles.text}>Business</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '90%',
    height: 50,
    marginLeft: '5%',
    backgroundColor: '#DFE6FD',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6180F4',
    fontFamily: fonts.bold,
  },
});

export default ThroughRegister;
