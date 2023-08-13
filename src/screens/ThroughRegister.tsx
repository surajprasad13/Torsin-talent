import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {fonts} from '../theme';
import {useAppDispatch, useAppSelector} from '../hooks';
import {updateUserInfo} from '../redux/reducers/authSlice';

const ThroughRegister = ({}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state => state.auth);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(updateUserInfo({...userInfo, location: ''}));
    });
    return () => listener;
  }, []);
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
        onPress={() => navigation.navigate('BusinessRegister')}
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
