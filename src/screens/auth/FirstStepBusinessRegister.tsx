import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {colors, fonts, metrics} from '../../theme';
import {useAppSelector} from '../../hooks';

// components
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import {Dropdown} from 'react-native-element-dropdown';
import ProFile from '../../components/ProFile';
import EmailModal from '../../components/modal/EmailModal';
import PhoneModal from '../../components/modal/PhoneModal';

const {horizontalScale, moderateScale, verticalScale} = metrics;

const FirstStepBusinessRegister = ({}) => {
  const navigation = useNavigation();
  const {loading, error, success} = useAppSelector(state => state.auth);

  const data = [
    {label: 'India', value: '1'},
    {label: 'Nepal', value: '2'},
    {label: 'America', value: '3'},
  ];

  const [countryValue, setIsCountryValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [checked, setChecked] = useState('first');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    phone: '',
    location: '',
    country: '',
  });

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
    if (isValid) {
      register();
    }
  };

  const register = () => {};

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      {loading && <Loader />}

      <ScrollView contentContainerStyle={{padding: 10}}>
        <View>
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

          <View style={{flexDirection: 'row', top: 36}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ThroughRegister')}
              style={{
                position: 'absolute',
                top: 8,
              }}>
              <Feather name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: fonts.bold,
                marginLeft: 30,
                fontSize: moderateScale(32),
                color: '#0E184D',
              }}>
              Create Account
            </Text>
          </View>

          <Text
            style={{
              fontFamily: fonts.regular,
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
            fontFamily: fonts.regular,
            width: 300,
            top: 70,
            fontSize: moderateScale(18),
            lineHeight: moderateScale(17),
            alignItems: 'center',
            color: '#0E184D',
          }}>
          Add Business Information.
        </Text>

        <View style={{top: 80}}>
          <ProFile image="" onPress={() => {}} />
        </View>

        <View style={{marginVertical: 47, marginTop: 84}}>
          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            label="Name"
            placeholder="John smith"
            error={errors.fullname}
          />

          <View>
            <Input
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
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
              onChangeText={(text: string) => handleOnchange(text, 'phone')}
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
                  fontFamily: fonts.regular,
                  marginTop: verticalScale(7),
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
                  fontFamily: fonts.regular,
                  marginTop: verticalScale(7),
                  color: '#4F4F4F',
                }}>
                Female
              </Text>
            </View>
          </View>

          <Input
            onChangeText={(text: string) => handleOnchange(text, 'location')}
            onFocus={() => handleError(null, 'location')}
            // iconName="lock-outline"
            label="Location"
            placeholder="Enter Location"
            error={errors.location}
            location
          />

          <Text style={{fontFamily: fonts.regular}}>Country</Text>

          <View
            style={{
              width: '100%',
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
                fontFamily: fonts.regular,
                fontSize: moderateScale(14),

                color: '#000000',
              }}>
              I have accepted the
            </Text>
            <Text
              onPress={() => navigation.navigate('RegisterScreen')}
              style={{
                color: '#0E184D',
                fontFamily: fonts.regular,
                fontSize: moderateScale(14),
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
                fontFamily: fonts.bold,
                fontSize: moderateScale(16),
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
                fontFamily: fonts.regular,
                fontSize: moderateScale(14),
                color: '#000000',
              }}>
              Already have an account?
            </Text>
            <Text
              onPress={() => navigation.navigate('LoginScreen')}
              style={{
                color: '#0E184D',
                fontFamily: fonts.regular,
                fontSize: moderateScale(14),
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
    color: colors.black,
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
  },
  tinyLogo: {
    width: 16,
    height: 14,
  },
});

export default FirstStepBusinessRegister;
