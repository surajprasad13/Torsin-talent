import React, {useEffect, useState, useRef} from 'react';
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
import PhoneInput from 'react-native-phone-number-input';
import {CountryCode} from 'react-native-country-picker-modal';
import ImageCropPicker from 'react-native-image-crop-picker';
import {getLocales} from 'react-native-localize';
import {decode} from 'base64-arraybuffer';
import {Formik} from 'formik';
import * as Yup from 'yup';

// icons
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// helpers
import {metrics, colors, fonts} from '../../theme';

// components
import Input from '../../components/Input';
import EmailModal from '../../components/modal/EmailModal';
import PhoneModal from '../../components/modal/PhoneModal';
import ProFile from '../../components/Profile';

// redux
import {RootState} from '../../redux';
import {registerIndivisual} from '../../redux/actions/authAction';
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

  const [errors, setErrors] = useState<any>({});

  const [checked, setChecked] = useState('first');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Please enter name'),
    email: Yup.string().email('').required('Please enter email'),
    mobileNo: Yup.string(),
    location: Yup.string().required('Please enter location'),
  });

  const [profileImage, setProfileImage] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef(null);

  const locales = getLocales();

  const onSubmit = (event: any) => {
    const data = {
      ...event,
      profileImage,
      countryId: phoneInput?.current?.getCallingCode(),
    };

    dispatch(registerIndivisual(data));
  };

  const [image, setImage] = useState('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const uploadImage = async () => {
    setImageLoading(true);

    const response = await ImageCropPicker.openPicker({
      width: 400,
      height: 300,
      includeBase64: true,
      mediaType: 'photo',
      cropping: true,
    });

    if (response) {
      setImage(response.data as any);
      var base64data = decode(response.data as any);
      const url = await uploadFileToS3(
        base64data,
        `${response.filename}`,
        'image/jpeg',
      );
      setInputs(prevState => ({...prevState, profileImage: url.Location}));
      setImageLoading(false);
    } else {
      setImageLoading(false);
    }
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
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          mobileNo: '',
          password: '',
          confirmPassword: '',
          gender: 1,
        }}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({values, errors, handleChange, handleSubmit, setErrors}) => (
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
                Set up your account with us! Please fill the below details to
                create account.
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
                    <EmailModal active={values.email} email={values.email} />
                  </Pressable>
                </View>

                <View style={{margin: 2}}>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      color: '#4F4F4F',
                      fontSize: 16,
                    }}>
                    Mobile Number
                  </Text>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={''}
                    defaultCode={locales[0].countryCode as CountryCode}
                    layout="first"
                    placeholder="eg. 7895325085"
                    containerStyle={{
                      borderWidth: 1,
                      marginTop: 10,
                      borderRadius: 10,
                      width: '100%',
                      backgroundColor: 'white',
                      borderColor: '#BDBDBD',
                    }}
                    textContainerStyle={{
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      borderColor: '#BDBDBD',
                      backgroundColor: 'transparent',
                    }}
                    textInputStyle={{
                      color: '#333333',
                      fontSize: 14,
                      fontFamily: fonts.regular,
                    }}
                    codeTextStyle={{color: '#333333'}}
                    onChangeText={(text: string) => {
                      const pattern = /^[0-9]*$/;
                      const pass = pattern.test(text);
                      if (pass) {
                        handleChange('mobileNo')(text);
                      }
                    }}
                    onChangeFormattedText={text => {
                      setFormattedValue(text);
                    }}
                    textInputProps={{
                      maxLength: 15,
                      onFocus: () => setErrors({mobileNo: ''}),
                    }}
                    withDarkTheme
                    withShadow
                    error={errors.mobileNo}
                  />
                  <Pressable
                    style={{
                      position: 'absolute',
                      marginTop: 46,
                      right: 10,
                    }}>
                    <PhoneModal
                      active={values.mobileNo.length >= 9}
                      phone={
                        phoneInput?.current?.getCallingCode() + values.mobileNo
                      }
                    />
                  </Pressable>
                </View>

                <View>
                  <Text
                    style={{
                      color: '#4F4F4F',
                      fontFamily: fonts.regular,
                      fontSize: moderateScale(16),
                      bottom: 10,
                      marginTop: 30,
                    }}>
                    Gender
                  </Text>

                  <Pressable
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      setChecked('first');
                      setInputs(prevState => ({...prevState, gender: 1}));
                    }}>
                    <FontAwesome
                      name={checked === 'first' ? 'dot-circle-o' : 'circle-o'}
                      color={checked === 'first' ? colors.primary : '#E0E0E0'}
                      size={24}
                    />

                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: '#4F4F4F',
                        marginLeft: 10,
                      }}>
                      Male
                    </Text>
                  </Pressable>

                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                    onPress={() => {
                      setChecked('second');
                      setInputs(prevState => ({...prevState, gender: 2}));
                    }}>
                    <FontAwesome
                      name={checked === 'second' ? 'dot-circle-o' : 'circle-o'}
                      color={checked === 'second' ? colors.primary : '#E0E0E0'}
                      size={24}
                    />

                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: '#4F4F4F',
                        marginLeft: 10,
                      }}>
                      Female
                    </Text>
                  </Pressable>
                </View>

                <View style={{marginTop: 10}}>
                  <Input
                    onChangeText={(text: any) =>
                      handleOnchange(text, 'location')
                    }
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
                  disabled={
                    values.fullName &&
                    values.email &&
                    values.mobileNo &&
                    values.password &&
                    isValid.every(item => item == true) &&
                    values.confirmPassword
                      ? true
                      : false
                  }
                  onPress={handleSubmit}
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
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default IndivisualRegister;
