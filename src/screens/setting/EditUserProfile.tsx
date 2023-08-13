import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Dialog, Portal, RadioButton} from 'react-native-paper';
import CountryPicker from 'react-native-country-picker-modal';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// icons
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

// components
import ProFile from '../../components/Profile';

// helpers
import {colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {CustomButton, CustomInput, Title} from '../../components';
import {userUpdate} from '../../redux/actions/authAction';
import {
  loginValue,
  resetSuccess,
  updateUserInfo,
} from '../../redux/reducers/authSlice';
import {alphabets, email, number} from '../../utils/regex';
import {uploadFileToS3} from '../../services/s3';
import {decode} from 'base64-arraybuffer';
import ImageCropPicker from 'react-native-image-crop-picker';

const EditUserProfile = ({}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {userInfo, userToken, error, success, loading} = useAppSelector(
    state => state.auth,
  );

  const [inputs, setInputs] = useState({
    fullName: userInfo?.fullName ?? '',
    email: userInfo?.email ?? '',
    mobileNo: userInfo?.mobileNo ?? '',
    location: userInfo?.location,
    profileImage: userInfo?.profileImage,
    gender: userInfo?.gender ?? 1,
    countryName: userInfo?.countryName ?? '',
    bio: userInfo?.bio ?? '',
  });

  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [isCountryPickerOpen, setCountryPickerOpen] = useState(false);

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setCountryPickerOpen(false);
    setInputs(prevState => ({...prevState, countryName: country.name}));
  };

  const [errors, setErrors] = React.useState<any>({});
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

  const validate = () => {
    Keyboard.dismiss();

    let isValid = true;

    const validName = alphabets(inputs.fullName);
    const validEmail = email(inputs.email);
    const validNumber = number(inputs.mobileNo);

    if (!validName) {
      handleError('Please Enter Name', 'fullName');
      isValid = false;
    }
    if (!validEmail) {
      handleError('Please enter valid email', 'email');
      isValid = false;
    }
    if (!validNumber) {
      handleError('Please enter Phone', 'mobileNo');
      isValid = false;
    }
    if (!inputs.location) {
      handleError('Please enter location', 'location');
      isValid = false;
    }
    if (!inputs.countryName) {
      handleError('Please enter country', 'countryName');
      isValid = false;
    }

    if (inputs.bio.length > 0) {
      const wordCount = inputs.bio.length;
      if (wordCount < 30) {
        handleError('Bio must be at least 30 words', 'bio');
        isValid = false;
      }
    }

    if (isValid) {
      update();
    }
  };

  const update = () => {
    dispatch(userUpdate({...inputs, location: userInfo?.location}));
  };

  const handleOnchange = (text: string, input: any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (_error: any, input: any) => {
    setErrors((prevState: any) => ({...prevState, [input]: _error}));
  };

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(loginValue());
      dispatch(resetSuccess());
    });
    return () => listener;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Portal>
        <Dialog visible={!!success}>
          <Dialog.Title>Profile Updated</Dialog.Title>
          <Dialog.Actions>
            <Button
              onPress={() => {
                dispatch(resetSuccess());
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Title title={userInfo?.fullName ?? ''} />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{padding: 10, backgroundColor: '#F9FBFF'}}>
          <ProFile
            image={image.length > 0 ? image : inputs.profileImage}
            onPress={uploadImage}
            loading={imageLoading}
          />

          <CustomInput
            value={inputs.fullName}
            onChangeText={(text: string) => {
              const name = text.replace(/[^a-zA-Z ]/g, '');
              handleOnchange(name, 'fullName');
            }}
            onFocus={() => handleError(null, 'fullname')}
            label="Name"
            placeholder={inputs.fullName}
            placeholderTextColor="#333333"
            containerStyle={{marginTop: 40}}
            error={errors.fullName}
          />

          <CustomInput
            value={inputs.email}
            onChangeText={(text: string) => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            label="Email"
            placeholder={inputs.email}
            placeholderTextColor="#333333"
            containerStyle={{marginTop: 20}}
            error={errors.email}
          />

          <CustomInput
            keyboardType="phone-pad"
            value={inputs.mobileNo}
            onChangeText={(text: string) => handleOnchange(text, 'mobileNo')}
            onFocus={() => handleError(null, 'phone')}
            label="Mobile Number"
            placeholder="895204300"
            placeholderTextColor="#333333"
            containerStyle={{marginTop: 20}}
            error={errors.mobileNo}
          />

          {userInfo?.gender && (
            <View style={{marginTop: 20}}>
              <Text style={{color: '#4F4F4F', fontFamily: fonts.regular}}>
                Gender
              </Text>

              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}
                onPress={() => {
                  setInputs(previousState => ({
                    ...previousState,
                    gender: 1,
                  }));
                }}>
                <FontAwesome
                  name={inputs.gender === 1 ? 'dot-circle-o' : 'circle-o'}
                  color={inputs.gender === 1 ? colors.primary : '#E0E0E0'}
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
                  setInputs(previousState => ({
                    ...previousState,
                    gender: 2,
                  }));
                }}>
                <FontAwesome
                  name={inputs.gender === 2 ? 'dot-circle-o' : 'circle-o'}
                  color={inputs.gender === 2 ? colors.primary : '#E0E0E0'}
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
          )}

          <View style={{position: 'relative'}}>
            <CustomInput
              value={inputs.countryName}
              onChangeText={(text: string) => {
                const name = text.replace(/[^a-zA-Z ]/g, '');
                handleOnchange(name, 'countryName');
              }}
              onBlur={() => {
                setCountryPickerOpen(true);
              }}
              onFocus={() => {
                handleError(null, 'location');
                setCountryPickerOpen(true);
              }}
              label="Country"
              placeholder={inputs.countryName}
              containerStyle={{marginTop: 20}}
              error={errors.countryName}
            />
            <Pressable
              onPress={() => setCountryPickerOpen(true)}
              style={{
                alignItems: 'center',
                position: 'absolute',
                right: 10,
                justifyContent: 'center',
                marginTop: 65,
              }}>
              <AntDesign name="down" size={15} />
            </Pressable>
          </View>

          {isCountryPickerOpen && (
            <CountryPicker
              withFilter
              withFlag={false}
              onSelect={handleCountrySelect}
              countryCode={selectedCountry?.cca2}
              visible={isCountryPickerOpen}
              containerButtonStyle={{
                display: 'none',
              }}
            />
          )}

          <View style={{marginTop: 20}}>
            <CustomInput
              placeholder="Location"
              label="Location"
              value={userInfo?.location}
              onChangeText={(text: string) => {
                dispatch(updateUserInfo({...userInfo, location: text}));
                if (text.length >= 2) {
                  navigation.navigate('Location');
                }
              }}
              onFocus={() => {
                if (inputs.location) {
                  navigation.navigate('Location');
                }
              }}
            />
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#4F4F4F',
                fontSize: 16,
              }}>
              Bio
            </Text>

            <TextInput
              placeholder="Write here"
              multiline={true}
              placeholderTextColor="#4F4F4F"
              maxLength={500}
              value={inputs.bio}
              onChangeText={(text: string) => handleOnchange(text, 'bio')}
              onFocus={() => handleError(null, 'bio')}
              style={{
                marginTop: 10,
                padding: 15,
                height: 170,
                borderWidth: 0.5,
                borderRadius: 8,
                borderColor: colors.light,
                backgroundColor: colors.white,
              }}
            />
          </View>

          {errors && (
            <Text
              style={{
                marginTop: 5,
                color: 'red',
              }}>
              {errors.bio}
            </Text>
          )}

          {!!error && (
            <Text
              style={{
                margin: 10,
                fontFamily: fonts.medium,
                color: colors.red,
              }}>
              {error}
            </Text>
          )}

          <CustomButton
            title="Save Changes"
            style={{marginTop: 20}}
            disabled={true}
            onPress={validate}
            loading={loading}
          />
          <View style={{marginTop: 50}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
  },
  backContainer: {
    backgroundColor: '#ffffff',
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
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

export default EditUserProfile;
