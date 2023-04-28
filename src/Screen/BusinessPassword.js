import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from './Components/Metrics';

import AsyncStorage from '@react-native-async-storage/async-storage';

import CheckBox from '@react-native-community/checkbox';

import Input from '../components/Input';
import Loader from '../components/Loader';

const BusinessPassword = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [checked, setChecked] = React.useState('first');

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.password) {
      handleError('Please input new Password', 'password');
      isValid = false;
    }

    if (!inputs.confirm_password) {
      handleError('Please input Confirm Password', 'confirm_password');
      isValid = false;
    }

    // if (!inputs.country) {
    //     handleError('Please input Country', 'country');
    //     isValid = false;
    // }
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
        navigation.navigate('BusinessStart');
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

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Loader visible={loading} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {/* <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 36
      }}>

        <View style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: '#14226D',
          right: -1
        }}></View>

        <View style={{
          width: 120,
          height: 10,
          backgroundColor: '#14226D',
          top: 5
        }}></View>

        <View style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: '#14226D',
          left: -2
        }}></View>

      </View> */}

        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          {/* <View style={{
          flexDirection: 'row'
        }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('ThroughRegister')}
            style={{
              position: 'absolute',
              top: 8

              // marginTop: moderateScale(10)
            }}>
            <Image
              style={styles.tinyLogo}
              source={require('../Image/backarrow.png')}
            />
          </TouchableOpacity>
          <Text style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            marginLeft: 50,
            fontSize: moderateScale(32),
            lineHeight: moderateScale(35),
            color: '#0E184D'
          }}>
            Create Account
          </Text>


        </View>


        <Text style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '400',
          width: 300,
          top: 20,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(17),
          alignItems: 'center',
          color: '#000F1A'
        }}>
          Set up your account with us!
        </Text>

        <Text style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '400',
          width: 300,
          top: 20,
          fontSize: moderateScale(14),
          lineHeight: moderateScale(17),
          alignItems: 'center',
          color: '#000F1A'
        }}>
          Please fill the below details to create account.
        </Text>

        <Text style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '400',
          width: 300,
          top: 40,
          fontSize: moderateScale(18),
          lineHeight: moderateScale(17),
          alignItems: 'center',
          color: '#0E184D'
        }}>
          Create New Password
        </Text> */}

          <View
            style={{
              marginTop: 36,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#14226D',
                  right: -1,
                }}></View>

              <View
                style={{
                  width: 120,
                  height: 10,
                  backgroundColor: '#E0E0E0',
                  top: 5,
                }}></View>

              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#E0E0E0',
                  left: -2,
                }}></View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                top: 36,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ThroughRegister')}
                style={{
                  position: 'absolute',
                  top: 8,

                  // marginTop: moderateScale(10)
                }}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/images/backarrow.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  marginLeft: 30,
                  fontSize: moderateScale(32),
                  lineHeight: moderateScale(35),
                  color: '#0E184D',
                }}>
                Create Account
              </Text>
            </View>

            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                width: 300,
                top: 50,
                fontSize: moderateScale(14),
                lineHeight: moderateScale(17),
                alignItems: 'center',
                color: '#000F1A',
              }}>
              Set up your account with us! Please fill the below details to
              create account.
            </Text>
          </View>

          <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              width: 300,
              top: 70,
              fontSize: moderateScale(18),
              lineHeight: moderateScale(17),
              alignItems: 'center',
              color: '#0E184D',
            }}>
            Create New Password.
          </Text>

          <View style={{ marginTop: verticalScale(120) }}>
            <Input
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              // iconName="lock-outline"
              label="Create Password"
              placeholder="********"
              error={errors.password}
              password
              keyboardType="password"
            />

            <Input
              keyboardType="password"
              onChangeText={text => handleOnchange(text, 'confirm_password')}
              onFocus={() => handleError(null, 'confirm_password')}
              // iconName="phone-outline"
              label="Re-enter Password"
              placeholder="********"
              error={errors.confirm_password}
              password
            />

            <View style={{ marginTop: moderateScale(10), right: 18 }}>
              <View style={styles.section}>
                <CheckBox
                  style={styles.checkbox}
                  disabled={false}
                  tintColors={{ true: '#14226D', false: '#E0E0E0' }}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <Text style={styles.paragraph}>At least one upper case</Text>
              </View>

              <View style={styles.section}>
                <CheckBox
                  style={styles.checkbox}
                  tintColors={{ true: '#14226D', false: '#E0E0E0' }}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <Text style={styles.paragraph}>At least one number</Text>
              </View>

              <View style={styles.section}>
                <CheckBox
                  style={styles.checkbox}
                  tintColors={{ true: '#14226D', false: '#E0E0E0' }}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <Text style={styles.paragraph}>At least 8 character</Text>
              </View>

              <View style={styles.section}>
                <CheckBox
                  style={styles.checkbox}
                  tintColors={{ true: '#14226D', false: '#E0E0E0' }}
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <Text style={styles.paragraph}>
                  At least one special character (E.g @%$)
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={validate}
          disabled={inputs.password && inputs.confirm_password ? false : true}
          style={{
            width: '85%',
            height: 50,
            marginTop: moderateScale(100),
            marginLeft: '7.5%',
            backgroundColor:
              inputs.password && inputs.confirm_password
                ? '#0E184D'
                : '#E0E0E0',
            justifyContent: 'center',
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
            Create Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessPassword;

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
    fontSize: moderateScale(20),
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    marginLeft: 10,
  },

  tinyLogo: {
    width: 16,
    height: 14,
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    bottom: 10,
  },

  paragraph: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    display: 'flex',
    alignItems: 'center',
    color: '#4F4F4F',
  },
});
