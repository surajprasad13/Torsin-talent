import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {decode} from 'base64-arraybuffer';

// icons
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

// helpers
import {metrics, colors, fonts} from '../../theme';

// components
import Input from '../../components/Input';
import EmailModal from '../../components/modal/EmailModal';
import PhoneModal from '../../components/modal/PhoneModal';
import ProFile from '../../components/Profile';

// redux
import {RootState} from '../../redux';
import {} from '../../redux/actions/authAction';
import {CustomButton} from '../../components';

import {email, alphabets, number} from '../../utils/regex';
import {uploadFileToS3} from '../../services/s3';
import {useAppDispatch} from '../../hooks';
import {
  resetEmailVerified,
  resetMobileVerified,
} from '../../redux/reducers/authSlice';

const {horizontalScale, moderateScale, verticalScale} = metrics;

type InputProp = {
  fullName: string;
  email: string;
  mobileNo: string;
  location: string;
  countryName: string;
  gender: number;
  password: string;
  confirmPassword: string;
  profileImage: string;
};

const IndivisualRegister = ({}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {loading, emailVerified, mobileVerified} = useSelector(
    (state: RootState) => state.auth,
  );

  const [inputs, setInputs] = useState<InputProp>({
    fullName: '',
    email: '',
    mobileNo: '',
    location: '',
    countryName: '',
    gender: 1,
    password: '',
    confirmPassword: '',
    profileImage: '',
  });
  const [image, setImage] = useState('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<any>({});

  const [checked, setChecked] = useState('first');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const validate = () => {
    Keyboard.dismiss();

    let isValid = true;

    const validName = alphabets(inputs.fullName);
    const validEmail = email(inputs.email);
    const validNumber = number(inputs.mobileNo);

    if (!validName) {
      handleError('Please input Name', 'fullName');
      isValid = false;
    }
    if (!validEmail) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!validNumber) {
      handleError('Please input Phone', 'mobileNo');
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

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(resetEmailVerified());
      dispatch(resetMobileVerified());
    });
    return () => listener;
  }, []);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(resetEmailVerified());
      dispatch(resetMobileVerified());
    });
    return () => listener;
  }, []);

  const register = () => {
    const field = {
      screen: 'indivisual',
      data: {
        ...inputs,
      },
    };

    navigation.navigate('CreatePassword', {
      item: JSON.stringify(field),
    });
  };

  const handleOnchange = (text: any, input: any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (_error: any, input: any) => {
    setErrors((prevState: any) => ({...prevState, [input]: _error}));
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {},
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {},
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
        <ScrollView contentContainerStyle={{padding: 10}}>
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
              top: 36,
              justifyContent: 'space-between',
              alignItems: 'center',
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
                fontFamily: fonts.bold,
                fontSize: moderateScale(32),
                color: colors.primary,
                textAlign: 'center',
              }}>
              Create Account
            </Text>
            <View style={{flex: 0.2}} />
          </View>

          <Text
            style={{
              fontFamily: fonts.regular,
              top: 50,
              alignItems: 'center',
              color: '#000F1A',
            }}>
            Set up your account with us! Please fill the below details to create
            account.
          </Text>

          <Text
            style={{
              fontFamily: fonts.regular,
              top: 70,
              color: '#0E184D',
            }}>
            Add Personal Information.
          </Text>

          <View style={{top: 80}}>
            <ProFile
              onPress={uploadImage}
              image={image}
              loading={imageLoading}
            />
          </View>

          <View style={{marginVertical: 47, marginTop: 84}}>
            <Input
              label="Name"
              value={inputs.fullName}
              onFocus={() => handleError(null, 'fullName')}
              placeholder="John smith"
              onChangeText={(text: any) => {
                const name = text.replace(/[^a-zA-Z ]/g, '');
                handleOnchange(name, 'fullName');
              }}
              error={errors.fullName}
            />

            <View>
              <Input
                onChangeText={(text: string) => {
                  handleOnchange(text, 'email');
                }}
                onFocus={() => handleError(null, 'email')}
                label="Email"
                keyboardType="email-address"
                placeholder="john@gmail.com"
                error={errors.email}
                autoComplete="email"
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
                onFocus={() => handleError(null, 'mobileNo')}
                label="Mobile Number"
                placeholder="eg. 895204300"
                error={errors.phone}
                value={inputs.mobileNo}
                defaultValue="+"
                onChangeText={(text: any) => {
                  const pattern = /^[0-9]*$/;
                  const pass = pattern.test(text);
                  if (pass) {
                    handleOnchange(text, 'mobileNo');
                  }
                }}
                keyboardType="phone-pad"
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
                  active={inputs.mobileNo.length >= 10}
                  phone={inputs.mobileNo}
                />
              </Pressable>
            </View>

            <View style={{marginTop: verticalScale(10)}}>
              <Text
                style={{
                  color: '#4F4F4F',
                  marginLeft: horizontalScale(15),
                  fontFamily: fonts.regular,
                  right: 10,
                  bottom: 20,
                  fontSize: moderateScale(16),
                }}>
                Gender
              </Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="first"
                  color="#0E184D"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked('first');
                    setInputs(prevState => ({...prevState, gender: 1}));
                  }}
                />
                <Text style={{fontFamily: fonts.regular, color: '#4F4F4F'}}>
                  Male
                </Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="second"
                  color="#0E184D"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked('second');
                    setInputs(prevState => ({...prevState, gender: 2}));
                  }}
                />
                <Text style={{fontFamily: fonts.regular}}>Female</Text>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              <Input
                onChangeText={(text: any) => handleOnchange(text, 'location')}
                onFocus={() => handleError(null, 'location')}
                label="Location"
                placeholder="Enter Location"
                error={errors.location}
              />
            </View>

            <View style={{marginTop: 10}}>
              <Input
                value={inputs.countryName}
                onChangeText={(text: any) => {
                  const name = text.replace(/[^a-zA-Z ]/g, '');
                  handleOnchange(name, 'countryName');
                }}
                onFocus={() => handleError(null, 'countryName')}
                label="Country"
                placeholder="Enter your country"
                error={errors.countryName}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
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

              <View style={{paddingLeft: 5}}>
                <Text style={{fontFamily: fonts.regular, fontSize: 13}}>
                  I have accepted the{' '}
                  <Text
                    onPress={() => {
                      navigation.navigate('RegisterScreen');
                    }}
                    style={{
                      color: colors.blue,
                      fontFamily: fonts.bold,
                    }}>
                    Terms and Conditions.
                  </Text>
                </Text>
              </View>
            </View>

            <CustomButton
              title="Next"
              disabled={active}
              onPress={validate}
              style={{marginTop: 20}}
              loading={loading}
            />

            <Text
              style={{
                fontFamily: fonts.regular,
                textAlign: 'center',
                marginTop: 10,
              }}>
              Already have an account?{' '}
              <Text
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}
                style={{
                  color: '#0E184D',
                  fontFamily: fonts.bold,
                }}>
                Log In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default IndivisualRegister;
