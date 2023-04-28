import React, {useState, createRef} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../Components/Metrics';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import COLORS from '../../conts/colors';
// import Button from '../src/views/components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import {user_login} from './Components/api/user_api';
import CheckBox from '@react-native-community/checkbox';

const ResetPassword = ({navigation}) => {
  const [inputs, setInputs] = useState({
    password: '',
    confirm_password: '',
  });

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.password) {
      handleError('Please enter password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (!inputs.confirm_password) {
      handleError('Please enter password', 'confirm_password');
      isValid = false;
    } else if (inputs.confirm_password.length < 5) {
      handleError('Min password length of 5', 'confirm_password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = async () => {
    const headers = {
      Accept: 'application/json',
    };

    const article = {
      mobileNo: inputs.mobileNo,
      password: inputs.password,
    };

    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        const res = axios.post(
          'https://admin.grofkit.com/v1/api/user/login',
          article,
          {headers},
        );
        console.log(res);
        navigation.replace('Successfull');

        // if (res.data.response.successCode == '102') {

        // } else {

        // }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <TouchableOpacity
        onPress={() => navigation.navigate('LostPassword')}
        style={{
          position: 'relative',
          left: 15,
          paddingVertical: 10,
          marginTop: moderateScale(40),
        }}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/images/backarrow.png')}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <View style={{flex: 0.8}}>
          <View
            style={{
              marginTop: verticalScale(50),
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '700',
                // fontFamily: 'Poppins-ExtraBold',
                fontSize: moderateScale(32),
                lineHeight: moderateScale(35),
                color: '#0E184D',
              }}>
              Reset Password
            </Text>

            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                width: 333,
                fontSize: moderateScale(14),
                lineHeight: moderateScale(17),
                alignItems: 'center',
                color: '#000F1A',
                top: 20,
              }}>
              It's important to choose a strong and unique password for your
              account to keep it secure
            </Text>
          </View>

          <View style={{marginVertical: 10, marginTop: 50}}>
            <Input
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              // iconName="lock-outline"
              label="Password"
              placeholder="********"
              error={errors.password}
              password
              keyboardType="password"
            />

            <Input
              keyboardType="password"
              onChangeText={text => handleOnchange(text, 'phone')}
              onFocus={() => handleError(null, 'phone')}
              // iconName="phone-outline"
              label="Confirm Password"
              placeholder="********"
              error={errors.phone}
              password
            />
          </View>

          <View style={{marginTop: moderateScale(10)}}>
            <View style={styles.section}>
              <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={styles.paragraph}>At least one upper case</Text>
            </View>

            <View style={styles.section}>
              <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={styles.paragraph}>At least one number</Text>
            </View>

            <View style={styles.section}>
              <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={styles.paragraph}>At least 8 character</Text>
            </View>

            <View style={styles.section}>
              <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={styles.paragraph}>
                At least one special character (E.g @%$
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Successfull')}
          // disabled={inputs.confirm_password && inputs.password ? false : true}
          style={{
            width: '85%',
            height: 50,
            marginTop: verticalScale(100),
            // marginTop: moderateScale(150),
            marginLeft: '7.5%',
            // backgroundColor: inputs.confirm_password && inputs.password ? '#0E184D' : '#E0E0E0',
            justifyContent: 'center',
            backgroundColor: '#0E184D',
            borderRadius: 8,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: moderateScale(16),
              lineHeight: 22,
            }}>
            Reset Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  inputText: {
    width: '92%',
    marginLeft: '4%',
    height: 50,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    marginTop: 10,
    borderRadius: 12,
  },

  input: {
    color: '#000000',
    fontSize: moderateScale(14),
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },

  tinyLogo: {
    width: 16,
    height: 14,
  },

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 20,
  },
});
