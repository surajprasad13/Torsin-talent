import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  SafeAreaView,
  Alert,
  Pressable,
  StatusBar,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from './Components/Metrics';
import Icon from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import {Dropdown} from 'react-native-element-dropdown';
import ProFile from './Components/ProFile';
import EmailModal from './Components/modal/EmailModal';
import PhoneModal from './Components/modal/PhoneModal';

import AsyncStorage from '@react-native-async-storage/async-storage';

const IndivisualRegister = ({navigation}) => {
  const data = [
    {label: 'India', value: '1'},
    {label: 'Nepal', value: '2'},
    {label: 'America', value: '3'},
  ];

  const [countryValue, setIsCountryValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [inputs, setInputs] = React.useState({
    fullname: '',
    email: '',
    phone: '',
    location: '',
    country: '',
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [checked, setChecked] = React.useState('first');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.fullname) {
      handleError('Please input Name', 'fullname');
      isValid = false;
    }

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input Phone', 'phone');
      isValid = false;
    }

    if (!inputs.location) {
      handleError('Please input Location', 'location');
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
        navigation.navigate('BusinessPassword');
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
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={true}
      />

      <Loader visible={loading} />
      {/* <StatusBar backgroundColor="blue" barStyle='light-content' /> */}

      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
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
            Set up your account with us! Please fill the below details to create
            account.
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
          Add Personal Information.
        </Text>

        <View
          style={{
            top: 80,
          }}>
          <ProFile />
        </View>

        <View style={{marginVertical: 47, marginTop: 84}}>
          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            // iconName="account-outline"
            label="Name"
            placeholder="John smith"
            error={errors.fullname}
          />

          <View>
            <Input
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              // iconName="email-outline"
              label="Email"
              placeholder="john@gmail.com"
              error={errors.email}
            />
            <Pressable
              style={{
                position: 'absolute',
                marginTop: 34,
                right: 10,
              }}>
              <EmailModal />
            </Pressable>
          </View>

          <View>
            <Input
              keyboardType="numeric"
              onChangeText={text => handleOnchange(text, 'phone')}
              onFocus={() => handleError(null, 'phone')}
              // iconName="phone-outline"
              label="Mobile Number"
              placeholder="eg. 895204300"
              error={errors.phone}
            />
            <Pressable
              style={{
                position: 'absolute',
                marginTop: 34,
                right: 10,
              }}>
              <PhoneModal />
            </Pressable>
          </View>

          {/* <View style={{ marginTop: verticalScale(10), }}>
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

                    </View> */}
          <View style={{marginTop: verticalScale(10)}}>
            <Text
              style={{
                color: '#4F4F4F',
                marginLeft: horizontalScale(15),
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                right: 10,
                bottom: 20,
                fontSize: moderateScale(16),
                lineHeight: 22,
              }}>
              Gender
            </Text>

            <View style={{flexDirection: 'row', bottom: 10, right: 5}}>
              <RadioButton
                value="first"
                color="#0E184D"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: 14,
                  lineHeight: 20,
                  display: 'flex',
                  marginTop: verticalScale(7),
                  alignItems: 'center',
                  color: '#4F4F4F',
                }}>
                Male
              </Text>
            </View>

            <View style={{flexDirection: 'row', bottom: 10, right: 5}}>
              <RadioButton
                value="second"
                color="#0E184D"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: 14,
                  lineHeight: 20,
                  display: 'flex',
                  marginTop: verticalScale(7),
                  alignItems: 'center',
                  color: '#4F4F4F',
                }}>
                Female
              </Text>
            </View>
          </View>

          <Input
            onChangeText={text => handleOnchange(text, 'location')}
            onFocus={() => handleError(null, 'location')}
            // iconName="lock-outline"
            label="Location"
            placeholder="Enter Location"
            error={errors.location}
            location
          />

          <Text
            style={{
              color: '#000000',
              fontSize: 14,
              fontWeight: '400',
              fontFamily: 'Inter',
              fontStyle: 'normal',
            }}>
            Country
          </Text>

          <View
            style={{
              width: '100%',
              // marginLeft: '4%',
              height: 50,
              borderWidth: 1,
              borderColor: '#BDBDBD',
              marginTop: 10,
              borderRadius: 12,
            }}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: '#454545'}]}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Select'}
              placeholderStyle={{
                marginLeft: 10,
                marginTop: 10,
              }}
              searchPlaceholder="Search..."
              value={countryValue}
              onFocus={() => setIsCountryValue(true)}
              onBlur={() => setIsCountryValue(false)}
              iconStyle={{
                top: 5,
                right: 5,
              }}
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: moderateScale(10)}}>
            <View style={{marginTop: moderateScale(-5)}}>
              <CheckBox
                style={styles.checkbox}
                disabled={false}
                onCheckColor="#14226D"
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: moderateScale(14),
                lineHeight: 22,
                color: '#000000',
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
                lineHeight: 22,
                left: 2,
              }}>
              Terms and Conditions.
            </Text>
          </View>

          <TouchableOpacity
            onPress={validate}
            disabled={
              inputs.fullname && inputs.email && inputs.phone && inputs.location
                ? false
                : true
            }
            style={{
              width: '85%',
              height: 50,
              marginTop: verticalScale(20),
              // marginTop: moderateScale(150),
              marginLeft: '7.5%',
              backgroundColor:
                inputs.fullname &&
                inputs.email &&
                inputs.phone &&
                inputs.location
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
              Next
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              marginTop: moderateScale(20),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: moderateScale(14),
                lineHeight: 22,
                color: '#000000',
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
                lineHeight: 22,
                left: 2,
              }}>
              Log In
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndivisualRegister;

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
});
