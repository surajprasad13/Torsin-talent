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
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';

import {metrics, colors, fonts} from '../../theme';

import Input from '../../components/Input';
import ProFile from '../../components/ProFile';

import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import {CustomButton} from '../../components';
import PhoneModal from '../../components/modal/PhoneModal';
import EmailModal from '../../components/modal/EmailModal';

const {moderateScale} = metrics;

const BusinessRegister = ({}) => {
  const navigation = useNavigation();

  const data = [
    {label: 'India', value: '1'},
    {label: 'Nepal', value: '2'},
    {label: 'America', value: '3'},
  ];

  const [inputs, setInputs] = React.useState({
    fullName: '',
    email: '',
    mobileNo: '',
    location: '',
    countryCodeId: '1',
  });
  const [image, setImage] = useState<string>('');
  const [errors, setErrors] = React.useState<any>({});

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.fullName) {
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

    if (!inputs.mobileNo) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.location) {
      handleError('Please input Location', 'location');
      isValid = false;
    }

    if (!inputs.countryCodeId) {
      handleError('Please input Country', 'country');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const uploadImage = () => {
    let options: any = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.errorCode == 'permission') {
        Alert.alert('Please allow permissions');
      } else if (response.errorCode == 'others') {
        Alert.alert(String(response.errorMessage));
        //@ts-expect-error
      } else if (response.assets[0].fileSize > 1097152) {
        Alert.alert('maximum size');
      } else {
        //@ts-expect-error
        setImage(response.assets[0].base64);
      }
    });
  };

  const register = () => {
    const field = {
      screen: 'business',
      data: {
        ...inputs,
        profileImage: image,
      },
    };
    navigation.navigate('CreatePassword', {
      item: JSON.stringify(field),
    });
  };

  const handleOnchange = (text: string, input: any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (_error: any, input: any) => {
    setErrors((prevState: any) => ({...prevState, [input]: _error}));
  };

  const active: boolean =
    inputs.fullName && inputs.email && inputs.mobileNo && inputs.location
      ? true
      : false;

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}>
            <Feather name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.blue,
              fontFamily: fonts.bold,
              fontSize: moderateScale(32),
            }}>
            Create Account
          </Text>
          <View />
        </View>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: moderateScale(14),
            lineHeight: moderateScale(17),
            alignItems: 'center',
            color: '#000F1A',
          }}>
          Set up your account with us! Please fill the below details to create
          account.
        </Text>

        <Text
          style={{
            fontFamily: fonts.medium,
            color: colors.primary,
            marginTop: 20,
            marginBottom: 20,
            fontSize: 16,
          }}>
          Add Business Information
        </Text>

        <ProFile image={image} onPress={uploadImage} />

        <View style={{marginVertical: 10}}>
          <Input
            onChangeText={text => handleOnchange(text, 'fullName')}
            onFocus={() => handleError(null, 'fullname')}
            label="Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />

          <View>
            <Input
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              label="Email"
              placeholder="Enter your email address"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Pressable
              style={{
                position: 'absolute',
                marginTop: 45,
                right: 10,
              }}>
              <EmailModal
                active={inputs.email.length > 0}
                email={inputs.email}
              />
            </Pressable>
          </View>

          <View>
            <Input
              label="Phone Number"
              placeholder="Enter your phone no"
              keyboardType="phone-pad"
              onChangeText={e => handleOnchange(e, 'mobileNo')}
              onFocus={() => handleError(null, 'phone')}
              error={errors.phone}
              maxLength={13}
            />
            <Pressable
              style={{
                position: 'absolute',
                marginTop: 45,
                right: 10,
              }}>
              <PhoneModal
                active={inputs.mobileNo.length >= 7}
                phone={inputs.mobileNo}
              />
            </Pressable>
          </View>

          <Input
            onChangeText={text => handleOnchange(text, 'location')}
            onFocus={() => handleError(null, 'location')}
            label="Location"
            placeholder="Enter your Location"
            error={errors.location}
          />

          <Text style={{color: '#4F4F4F', fontFamily: fonts.regular}}>
            Country
          </Text>

          <View
            style={{
              height: 50,
              borderWidth: 1,
              borderColor: '#BDBDBD',
              marginTop: 10,
              borderRadius: 12,
            }}>
            <Dropdown
              style={[styles.dropdown]}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Country'}
              placeholderStyle={{
                marginLeft: 10,
                marginTop: 10,
              }}
              searchPlaceholder="Search..."
              value={inputs.countryCodeId}
              iconStyle={{top: 5, right: 5}}
              onChange={item => {
                setInputs(prevState => ({
                  ...prevState,
                  countryCodeId: item.value,
                }));
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={{marginTop: moderateScale(-5)}}>
              <CheckBox
                boxType="square"
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
                color: colors.black,
                paddingLeft: 10,
              }}>
              I have accepted the{' '}
              <Text style={{fontFamily: fonts.medium, color: colors.primary}}>
                Terms and Conditions.
              </Text>
            </Text>
          </View>

          <CustomButton
            title="Next"
            disabled={active}
            onPress={validate}
            style={{marginTop: 20}}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: moderateScale(20),
              justifyContent: 'center',
            }}>
            <Text style={{fontFamily: fonts.regular, color: colors.black}}>
              Already have an account?{' '}
              <Text
                onPress={() => navigation.navigate('LoginScreen')}
                style={{color: colors.primary, fontFamily: fonts.bold}}>
                Log In
              </Text>
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
    color: '#000000',
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
  },

  tinyLogo: {
    width: 25,
    height: 25,
  },
  dropdown: {},
  checkbox: {},
});

export default BusinessRegister;
