import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  SafeAreaView,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import IonIcon from 'react-native-vector-icons/Ionicons';

import {metrics, colors, fonts} from '../../theme';

import Input from '../../components/Input';
import ProFile from '../../components/Profile';

import Feather from 'react-native-vector-icons/Feather';
import {CustomButton} from '../../components';
import PhoneModal from '../../components/modal/PhoneModal';
import EmailModal from '../../components/modal/EmailModal';
import {email} from '../../utils/regex';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {launchImageLibrary} from 'react-native-image-picker';
import {decode} from 'base64-arraybuffer';
import {uploadFileToS3} from '../../services/s3';
import {
  resetEmailVerified,
  resetMobileVerified,
} from '../../redux/reducers/authSlice';

const {moderateScale} = metrics;

const BusinessRegister = ({}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {emailVerified, mobileVerified} = useAppSelector(state => state.auth);

  const [inputs, setInputs] = React.useState({
    fullName: '',
    email: '',
    mobileNo: '',
    location: '',
    countryName: '',
    profileImage: '',
  });

  const [image, setImage] = useState('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);

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

    if (isValid) {
      register();
    }
  };

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(resetEmailVerified());
      dispatch(resetMobileVerified());
    });
    return () => listener;
  }, []);

  const uploadImage = () => {
    let options: any = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, async response => {
      try {
        setImageLoading(true);
        var base64data = decode(response.assets[0].base64);
        const url = await uploadFileToS3(
          base64data,
          `${response.assets[0].fileName}`,
          'image/jpeg',
        );
        setImage(response.assets[0].base64);
        setInputs(prevState => ({...prevState, profileImage: url.Location}));
        setImageLoading(false);
      } catch (error: any) {
        setImageLoading(false);
        console.log('Error uploading file:', error);
      }
    });
  };

  const register = () => {
    const field = {
      screen: 'business',
      data: {
        ...inputs,
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
    inputs.fullName &&
    inputs.email &&
    inputs.mobileNo &&
    emailVerified &&
    mobileVerified &&
    inputs.location &&
    inputs.countryName
      ? true
      : false;

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
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

          <ProFile onPress={uploadImage} image={image} loading={imageLoading} />

          <View style={{marginVertical: 10}}>
            <Input
              value={inputs.fullName}
              onChangeText={text => {
                const name = text.replace(/[^a-zA-Z ]/g, '');
                handleOnchange(name, 'fullName');
              }}
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
                <EmailModal active={email(inputs.email)} email={inputs.email} />
              </Pressable>
            </View>

            <View>
              <Input
                label="Phone Number"
                placeholder="Enter your phone no"
                keyboardType="phone-pad"
                value={inputs.mobileNo}
                onChangeText={text => {
                  const pattern = /^[0-9]*$/;
                  const pass = pattern.test(text);
                  if (pass) {
                    handleOnchange(text, 'mobileNo');
                  }
                }}
                onFocus={() => handleError(null, 'phone')}
                error={errors.phone}
                maxLength={13}
                style={{paddingLeft: 10}}
              />
              <View style={{position: 'absolute', marginTop: 45, left: 10}}>
                <Text>+</Text>
              </View>
              <Pressable
                style={{
                  position: 'absolute',
                  marginTop: 45,
                  right: 10,
                }}>
                <PhoneModal
                  active={inputs.mobileNo.length >= 9}
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

            <Input
              value={inputs.countryName}
              onChangeText={text => {
                const name = text.replace(/[^a-zA-Z ]/g, '');
                handleOnchange(name, 'countryName');
              }}
              onFocus={() => handleError(null, 'country')}
              label="Country"
              placeholder="Enter your country"
              error={errors.country}
            />

            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox(!toggleCheckBox);
                }}>
                <IonIcon
                  name={toggleCheckBox ? 'checkbox' : 'square-outline'}
                  size={25}
                  color={toggleCheckBox ? colors.primary : '#BDBDBD'}
                />
              </TouchableOpacity>

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BusinessRegister;
