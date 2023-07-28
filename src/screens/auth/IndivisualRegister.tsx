/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import {CountryCode} from 'react-native-country-picker-modal';
import ImageCropPicker from 'react-native-image-crop-picker';
import {getLocales} from 'react-native-localize';
import {decode} from 'base64-arraybuffer';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal';

// icons
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import {metrics, colors, fonts, appstyle} from '../../theme';

// components
import Input from '../../components/Input';
import EmailModal from '../../components/modal/EmailModal';
import PhoneModal from '../../components/modal/PhoneModal';
import ProFile from '../../components/Profile';

// redux
import {RootState} from '../../redux';
import {CustomButton, CustomInput, Stepper} from '../../components';

import {uploadFileToS3} from '../../services/s3';
import {useAppDispatch} from '../../hooks';
import {
  resetEmailVerified,
  resetMobileVerified,
} from '../../redux/reducers/authSlice';

const {moderateScale} = metrics;

const IndivisualRegister = ({}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {loading} = useSelector((state: RootState) => state.auth);

  const [checked, setChecked] = useState('first');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [isCountryPickerOpen, setCountryPickerOpen] = useState(false);

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setCountryPickerOpen(false); // Close the country dropdown after selection
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Please enter name'),
    email: Yup.string().email('').required('Please enter email'),
    mobileNo: Yup.string(),
    location: Yup.string().required('Please enter location'),
  });

  const [profileImage, setProfileImage] = useState('');
  const phoneInput = useRef<any | null>(null);

  const locales = getLocales();

  const onSubmit = (event: any) => {
    const field = {
      screen: 'indivisual',
      data: {
        ...event,
        profileImage,
        countryId: phoneInput?.current?.getCallingCode(),
      },
    };

    navigation.navigate('CreatePassword', {
      item: JSON.stringify(field),
    });
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
      setProfileImage(url.Location);
      setImageLoading(false);
    } else {
      setImageLoading(false);
    }
  };

  //@ts-ignore
  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(resetEmailVerified());
      dispatch(resetMobileVerified());
    });
    return () => listener;
  }, []);

  //@ts-ignore
  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(resetEmailVerified());
      dispatch(resetMobileVerified());
    });
    return () => listener;
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          mobileNo: '',
          location: '',
          confirmPassword: '',
          gender: 1,
          countryName: '',
        }}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({values, errors, handleChange, handleSubmit, setErrors}) => (
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={{padding: 10}}>
              <Stepper step={0} />

              <View style={[appstyle.rowBetween, {top: 36}]}>
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
                <CustomInput
                  value={values.fullName}
                  onChangeText={(text: string) => {
                    const name = text.replace(/[^a-zA-Z ]/g, '');
                    handleChange('fullName')(name);
                  }}
                  maxLength={30}
                  onFocus={() => setErrors({fullName: ''})}
                  label="Name"
                  placeholder="eg. John smith"
                  error={errors.fullName}
                />

                <View style={{marginTop: 20}}>
                  <CustomInput
                    onChangeText={(text: string) => {
                      handleChange('email')(text);
                    }}
                    onFocus={() => setErrors({email: ''})}
                    label="Email"
                    keyboardType="email-address"
                    placeholder="john@gmail.com"
                    error={errors.email}
                    autoComplete="email"
                    autoCapitalize="none"
                    containerStyle={{}}
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

                <View style={{margin: 2, marginTop: 20}}>
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
                    onChangeFormattedText={() => {}}
                    textInputProps={{
                      maxLength: 15,
                      onFocus: () => setErrors({mobileNo: ''}),
                    }}
                    withDarkTheme
                    withShadow
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
                      handleChange('gender')('1');
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
                      handleChange('gender')('2');
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
                    onChangeText={(text: any) => handleChange('location')(text)}
                    onFocus={() => setErrors({location: ''})}
                    label="Location"
                    placeholder="Enter Location"
                    error={errors.location}
                  />
                </View>

                <View style={{position: 'relative'}}>
                  <Input
                    label="Country"
                    placeholder="eg. India"
                    value={selectedCountry?.name || values.countryName}
                    onChangeText={text => {
                      setCountryPickerOpen(true);
                      handleChange('countryName')(text);
                    }}
                    onFocus={() => {
                      setErrors({countryName: ''});
                      setCountryPickerOpen(true);
                    }}
                    error={errors.countryName}
                    maxLength={50}
                  />

                  <Pressable
                    onPress={() => setCountryPickerOpen(true)}
                    style={{
                      alignItems: 'center',
                      position: 'absolute',
                      right: 10,
                      justifyContent: 'center',
                      marginTop: 50,
                    }}>
                    <AntDesign name="down" size={15} />
                  </Pressable>
                </View>

                {isCountryPickerOpen && (
                  <CountryPicker
                    withFilter
                    withFlag={false}
                    onSelect={country => {
                      handleCountrySelect(country);
                      handleChange('countryName')(country.name as string);
                    }}
                    countryCode={selectedCountry?.cca2}
                    visible
                    containerButtonStyle={{
                      display: 'none',
                    }}
                  />
                )}

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
                    values.location &&
                    values.countryName
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

const styles = StyleSheet.create({});

export default IndivisualRegister;
