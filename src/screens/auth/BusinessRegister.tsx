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
import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal';

// icons
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import {metrics, colors, fonts} from '../../theme';

// components
import Input from '../../components/Input';
import EmailModal from '../../components/modal/EmailModal';
import PhoneModal from '../../components/modal/PhoneModal';
import ProFile from '../../components/Profile';

// redux
import {RootState} from '../../redux';
import {CustomButton, CustomInput} from '../../components';

import {uploadFileToS3} from '../../services/s3';
import {useAppDispatch} from '../../hooks';
import {
  resetEmailVerified,
  updateUserInfo,
  resetMobileVerified,
} from '../../redux/reducers/authSlice';

const {moderateScale} = metrics;

const BusinessRegister = ({}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {loading, userInfo} = useSelector((state: RootState) => state.auth);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Please enter name'),
    email: Yup.string().email('').required('Please enter email'),
    mobileNo: Yup.string(),
    location: Yup.string().required('Please enter location'),
  });

  const [profileImage, setProfileImage] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef<any | null>(null);

  const locales = getLocales();

  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [isCountryPickerOpen, setCountryPickerOpen] = useState(false);

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setCountryPickerOpen(false); // Close the country dropdown after selection
  };

  const onSubmit = (event: any) => {
    const field = {
      screen: 'business',
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

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      mobileNo: '',
      location: '',
      confirmPassword: '',
      gender: 1,
      countryName: '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit,
  });

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
      if (userInfo?.location) {
        formik.handleChange('location')(userInfo.location);
      }
    });
    return () => listener;
  }, []);

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
            Add Business Information.
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
              value={formik.values.fullName}
              onFocus={() => formik.setErrors({fullName: ''})}
              placeholder="John smith"
              onChangeText={(text: any) => {
                const name = text.replace(/[^a-zA-Z ]/g, '');
                formik.handleChange('fullName')(name);
              }}
              error={formik.errors.fullName}
            />

            <View>
              <Input
                onChangeText={(text: string) => {
                  formik.handleChange('email')(text);
                }}
                onFocus={() => formik.setErrors({email: ''})}
                label="Email"
                keyboardType="email-address"
                placeholder="john@gmail.com"
                error={formik.errors.email}
                autoComplete="email"
                autoCapitalize="none"
              />
              <Pressable
                style={{
                  position: 'absolute',
                  marginTop: 45,
                  right: 10,
                }}>
                <EmailModal
                  active={formik.values.email}
                  email={formik.values.email}
                />
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
                    formik.handleChange('mobileNo')(text);
                  }
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                textInputProps={{
                  maxLength: 15,
                  onFocus: () => formik.setErrors({mobileNo: ''}),
                }}
                withDarkTheme
                withShadow
                error={formik.errors.mobileNo}
              />
              <Pressable
                style={{
                  position: 'absolute',
                  marginTop: 46,
                  right: 10,
                }}>
                <PhoneModal
                  active={formik.values.mobileNo.length >= 9}
                  phone={
                    phoneInput?.current?.getCallingCode() +
                    formik.values.mobileNo
                  }
                />
              </Pressable>
            </View>

            <View style={{marginTop: 10}}>
              <CustomInput
                placeholder="Location"
                label="Location"
                value={userInfo?.location}
                onChangeText={(text: string) => {
                  dispatch(updateUserInfo({...userInfo, location: text}));
                  formik.handleChange('location')(text);
                  if (text.length >= 2) {
                    navigation.navigate('Location');
                  }
                }}
                onFocus={() => {
                  if (!formik.values.location) {
                    navigation.navigate('Location');
                  }
                }}
              />
            </View>

            <View style={{position: 'relative', marginTop: 10}}>
              <Input
                label="Country"
                placeholder="eg. India"
                value={selectedCountry?.name || formik.values.countryName}
                onChangeText={text => {
                  setCountryPickerOpen(true);
                  formik.handleChange('countryName')(text);
                }}
                onFocus={() => {
                  formik.setErrors({countryName: ''});
                  setCountryPickerOpen(true);
                }}
                error={formik.errors.countryName}
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
                  formik.handleChange('countryName')(country.name as string);
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
                formik.values.fullName &&
                formik.values.email &&
                formik.values.mobileNo &&
                formik.values.location &&
                formik.values.countryName
                  ? true
                  : false
              }
              onPress={formik.handleSubmit}
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

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,

    top: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
  },
  listView: {
    padding: 5,
  },
  powered: {},
});

export default BusinessRegister;
