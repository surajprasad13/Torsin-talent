import React from "react";

import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Keyboard, SafeAreaView, Alert,  } from 'react-native';
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { horizontalScale, moderateScale, verticalScale } from "./Components/Metrics";
import Icon from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../src/conts/colors';
import Button from '../src/views/components/Button';
import Input from '../src/views/components/Input';
import Loader from '../src/views/components/Loader';

import ProFile from "./Components/ProFile";

const RegisterScreen = ({ navigation }) => {

  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
    cpassword: '',
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [checked, setChecked] = React.useState('first');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (!inputs.cpassword) {
      handleError('Please input Confirm password', 'cpassword');
      isValid = false;
    } else if (inputs.cpassword.length < 5) {
      handleError('Min password length of 5', 'cpassword');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem('userData', JSON.stringify(inputs));
        navigation.navigate('VerifyOtpRegister');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <TouchableOpacity
        onPress={() => navigation.navigate('WalkthroughScreen')}
        style={{
          position: 'relative',
          left: 15,
          paddingVertical: 40
          // marginTop: moderateScale(10)
        }}>
        <Image
          style={styles.tinyLogo}
          source={require('../Image/backarrow.png')}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: moderateScale(32),
          lineHeight: moderateScale(35),
          color: '#0E184D'
        }}>
          Create Account
        </Text>
        <Text style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '400',
          width: 300,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(17),
          alignItems: 'center',
          color: '#000F1A'
        }}>
          Set up your account with us! Please fill the below details to create account.
        </Text>

        <View>
          <ProFile />
        </View>

        <View style={{ marginVertical: 10 }}>

          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            // iconName="account-outline"
            label="Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            // iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            // iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />

          <View style={{ marginTop: verticalScale(10), }}>
            <Text style={{
              color: '#4F4F4F',
              marginLeft: horizontalScale(15),
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: moderateScale(16),
              lineHeight: 22,
            }}>Gender</Text>

            <View style={{ flexDirection: 'row', marginLeft: horizontalScale(15), }}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 20,
                display: 'flex',
                marginTop: verticalScale(7),
                alignItems: 'center',
                color: '#4F4F4F',
              }}>Male</Text>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: horizontalScale(15), }}>
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
              <Text style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 20,
                display: 'flex',
                marginTop: verticalScale(7),
                alignItems: 'center',
                color: '#4F4F4F',
              }}>Female</Text>
            </View>

          </View>

          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            // iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <Input
            onChangeText={text => handleOnchange(text, 'cpassword')}
            onFocus={() => handleError(null, 'cpassword')}
            // iconName="lock-outline"
            label="password"
            placeholder="Enter Confirm password"
            error={errors.cpassword}
            cpassword
          />

          <View style={{ flexDirection: 'row', marginTop: moderateScale(10), marginLeft: horizontalScale(15), }}>
            <View style={{ marginTop: moderateScale(-5) }}>
              <CheckBox
                style={styles.checkbox}
                disabled={false}
                onCheckColor="#14226D"
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: moderateScale(14),
                lineHeight: 22,
                color: '#000000'
              }}>
              I have accepted the
            </Text>
            <Text
              onPress={() => navigation.navigate('RegisterScreen')}
              style={{
                color: '#0E184D',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: moderateScale(14),
                lineHeight: 22
              }}>
              Terms and Conditions.
            </Text>
          </View>

          <TouchableOpacity
            onPress={validate}
            style={{
              width: '85%',
              height: 50,
              marginTop: verticalScale(200),
              // marginTop: moderateScale(150),
              marginLeft: '7.5%',
              backgroundColor: '#0E184D',
              justifyContent: 'center',
              borderRadius: 8
            }}>
            <Text style={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: moderateScale(16),
              lineHeight: 22,
            }}>Next</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', marginTop: moderateScale(20), justifyContent: 'center', }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: moderateScale(14),
                lineHeight: 22,
                color: '#000000'
              }}>
              Already have an account?
            </Text>
            <Text
              onPress={() => navigation.navigate('LoginScreen')}
              style={{
                color: '#0E184D',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: moderateScale(14),
                lineHeight: 22
              }}>
              Log In
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default RegisterScreen;

const styles = StyleSheet.create({

  inputText: {
    width: '92%',
    marginLeft: '4%',
    height: 50,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    marginTop: 10,
    borderRadius: 12
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

})