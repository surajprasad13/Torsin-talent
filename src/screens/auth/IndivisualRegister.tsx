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
import {Dialog, Portal, RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';

// icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {metrics, colors, fonts} from '../../theme';

// components
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import EmailModal from '../../components/modal/EmailModal';
import PhoneModal from '../../components/modal/PhoneModal';
import ProFile from '../../components/ProFile';

// redux
import {RootState} from '../../redux';
import {} from '../../redux/actions/authAction';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {CustomButton} from '../../components';

const {horizontalScale, moderateScale, verticalScale} = metrics;

type InputProp = {
  fullName: string;
  email: string;
  mobileNo: string;
  location: string;
  countryCodeId: number;
  gender: number;
  password: string;
  confirmPassword: string;
};

const IndivisualRegister = ({}) => {
  const navigation = useNavigation();

  const {loading} = useSelector((state: RootState) => state.auth);

  const data = [
    {label: 'India', value: '1'},
    {label: 'Nepal', value: '2'},
    {label: 'America', value: '3'},
  ];

  const [countryValue, setIsCountryValue] = useState<string | null>(null);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [inputs, setInputs] = useState<InputProp>({
    fullName: '',
    email: '',
    mobileNo: '',
    location: '',
    countryCodeId: 1,
    gender: 1,
    password: '',
    confirmPassword: '',
  });

  const [image, setImage] = useState<string>('');

  const [errors, setErrors] = useState<any>({});

  const [checked, setChecked] = useState('first');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.fullName) {
      handleError('Please input Name', 'fullname');
      isValid = false;
    }
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    }
    if (!inputs.mobileNo) {
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

  const register = () => {
    const field = {
      screen: 'indivisual',
      data: {
        ...inputs,
        profileImage: image,
      },
    };

    navigation.navigate('CreatePassword', {
      item: JSON.stringify(field),
    });
  };

  const handleOnchange = (text: any, input: any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error: any, input: any) => {
    setErrors((prevState: any) => ({...prevState, [input]: error}));
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
      } else if (response.assets[0].fileSize > 1024) {
        Alert.alert('maximum size');
      } else {
        setImage(response.assets[0].base64);
      }
    });
  };

  const active: boolean =
    inputs.fullName && inputs.email && inputs.mobileNo && inputs.location
      ? true
      : false;

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <Portal>
        <Dialog visible={loading}>
          <Dialog.Content
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Loader />
          </Dialog.Content>
        </Dialog>
      </Portal>

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

        <View style={{flexDirection: 'row', top: 36}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ThroughRegister')}
            style={{top: 8}}>
            <Feather name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: fonts.bold,
              marginLeft: 30,
              fontSize: moderateScale(32),
              color: '#0E184D',
              textAlign: 'center',
              flex: 1,
            }}>
            Create Account
          </Text>
        </View>

        <Text
          style={{
            fontFamily: fonts.regular,
            width: 300,
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
          <ProFile onPress={uploadImage} image={image} />
        </View>

        <View style={{marginVertical: 47, marginTop: 84}}>
          <Input
            label="Name"
            onFocus={() => handleError(null, 'fullname')}
            placeholder="John smith"
            error={errors.fullname}
            onChangeText={(text: any) => handleOnchange(text, 'fullName')}
          />

          <View>
            <Input
              onChangeText={(text: string) => handleOnchange(text, 'email')}
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
                marginTop: 34,
                right: 10,
              }}>
              <EmailModal />
            </Pressable>
          </View>

          <View>
            <Input
              onFocus={() => handleError(null, 'phone')}
              label="Mobile Number"
              placeholder="eg. 895204300"
              error={errors.phone}
              onChangeText={(text: any) => handleOnchange(text, 'mobileNo')}
              keyboardType="phone-pad"
              maxLength={13}
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
              style={[styles.dropdown, {borderColor: '#454545'}]}
              data={data}
              search
              labelField="label"
              valueField="value"
              placeholder={'Select'}
              placeholderStyle={{}}
              searchPlaceholder="Search..."
              value={countryValue}
              onChange={item => {
                setIsCountryValue(item.value);
                setInputs(prevState => ({
                  ...prevState,
                  countryCodeId: Number(item.value),
                }));
              }}
              onChangeText={() => {
                //console.log(text);
              }}
            />
          </View>

          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <CheckBox
              boxType="square"
              style={styles.checkbox}
              disabled={false}
              onCheckColor="#14226D"
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <View style={{marginLeft: 10}}>
              <Text style={{fontFamily: fonts.regular}}>
                I have accepted the{' '}
                <Text
                  onPress={() => {
                    navigation.navigate('RegisterScreen');
                  }}
                  style={{
                    color: colors.blue,
                    fontFamily: fonts.bold,
                    left: 2,
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
          />

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
              }}>
              Already have an account?
            </Text>
            <Text
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}
              style={{
                color: '#0E184D',
                fontFamily: fonts.bold,
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
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
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
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
  },

  tinyLogo: {
    width: 16,
    height: 14,
  },
  title: {},
  label: {
    color: '#4F4F4F',
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  dropdown: {},
  checkbox: {},
});

export default IndivisualRegister;
