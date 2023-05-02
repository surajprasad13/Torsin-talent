import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {RadioButton} from 'react-native-paper';

// icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

// components
import Input from '../../components/Input';
import ProFile from '../../components/ProFile';
import Loader from '../../components/Loader';

// helpers
import {appstyle, colors, fonts, metrics} from '../../theme';
import {useAppSelector} from '../../hooks';
import {CustomButton, CustomInput} from '../../components';

const {horizontalScale, moderateScale, verticalScale} = metrics;

const Chat = ({}) => {
  const navigation = useNavigation();

  const {} = useAppSelector(state => state.auth);

  const [inputs, setInputs] = useState({
    service: '',
    projectType: '',
    serviceCharge: '',
    country: '',
  });

  const data = [
    {label: 'India', value: '1'},
    {label: 'Nepal', value: '2'},
    {label: 'America', value: '3'},
  ];

  const [countryValue, setIsCountryValue] = useState<string | null>(null);

  const [errors, setErrors] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);

  const [checked, setChecked] = React.useState('first');

  const validate = () => {
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

  const handleOnchange = (text: string, input: any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (_error: any, input: any) => {
    setErrors((prevState: any) => ({...prevState, [input]: _error}));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.white,
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
          style={{padding: 10}}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: fonts.medium,
            color: '#000C14',
          }}>
          Skills & Services
        </Text>
        <View />
      </View>
      <ScrollView>
      <View style = {{flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
            }}>
            Skills
          </Text>
          <TouchableOpacity>
            <Text style = {{color: colors.primary,}}>Add new skills </Text>
          </TouchableOpacity>
          </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: '#1E202B',
              marginTop: 12,
            }}>
            Job Description Complete your profile. Set your profile completely .
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            label="Service Name"
            placeholder="eg. Song Production"
            containerStyle={{}}
          />
          <View
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#4F4F4F',
                fontSize: 16,
              }}>
              Project Type
            </Text>
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
          </View>
          <CustomInput
            label="Service Charge"
            placeholder="eg. $500"
            containerStyle={{marginTop: 10}}
          />

          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#4F4F4F',
                fontSize: 16,
              }}>
              Service Description
            </Text>
            <View
              style={{
                width: '100%',
                height: 170,
                borderWidth: 0.5,
                borderRadius: 8,
                borderColor: colors.light,
                marginTop: 10,
              }}>
              <TextInput placeholder="type here..." multiline={true} />
            </View>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
              fontSize: 16,
            }}>
            Add Portfolio of your service
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: '#1E202B',
              marginTop: 12,
            }}>
            Job Description Complete your profile. Set your profile completely .
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
              fontSize: 16,
            }}>
            Add Video
          </Text>
        </View>
        <View style={styles.videoInput}>
          <View
            style={{
              width: '90%',
              marginLeft: '5%',
              backgroundColor: '#EBEFFF',
              height: 150,
              borderRadius: 10,
              borderColor: colors.primary,
              borderWidth: 1,
              borderStyle: 'dashed',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="cloudupload" size={40} color="#14226D" />
            <Text style={{fontFamily: fonts.regular, color: colors.black}}>
              Click{' '}
              <Text
                onPress={() => navigation.navigate()}
                style={{color: colors.primary, fontFamily: fonts.bold}}>
                here{' '}
              </Text>
              <Text>upload</Text>
            </Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
              fontSize: 16,
            }}>
            Add Photos
          </Text>
        </View>
        <View style={{...appstyle.shadow, width: '90%', left: '5%', borderRadius: 10}}>
          <View style={styles.photoInput}>
            <View style={styles.innerPhotos}>
              <Feather name="image" size={30} color="#14226D" />
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                Click{' '}
                <Text
                  onPress={() => navigation.navigate()}
                  style={{color: colors.primary, fontFamily: fonts.bold}}>
                  here{' '}
                </Text>
              </Text>
            </View>
            <View style={styles.innerPhotos}>
              <Feather name="image" size={30} color="#14226D" />
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                Click{' '}
                <Text
                  onPress={() => navigation.navigate()}
                  style={{color: colors.primary, fontFamily: fonts.bold}}>
                  here{' '}
                </Text>
              </Text>
            </View>
            <View style={styles.innerPhotos}>
              <Feather name="image" size={30} color="#14226D" />
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                Click{' '}
                <Text
                  onPress={() => navigation.navigate()}
                  style={{color: colors.primary, fontFamily: fonts.bold}}>
                  here{' '}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              justifyContent: 'space-between',
              borderRadius: 10,
              padding: 10,
              marginLeft: '5%',
              flexDirection: 'row',
            }}>
            <View style={styles.innerPhotos}>
              <Feather name="image" size={30} color="#14226D" />
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                Click{' '}
                <Text
                  onPress={() => navigation.navigate()}
                  style={{color: colors.primary, fontFamily: fonts.bold}}>
                  here{' '}
                </Text>
              </Text>
            </View>
            <View style={styles.innerPhotos}>
              <Feather name="image" size={30} color="#14226D" />
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                Click{' '}
                <Text
                  onPress={() => navigation.navigate()}
                  style={{color: colors.primary, fontFamily: fonts.bold}}>
                  here{' '}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <CustomButton
          title="Add Service"
          onPress={validate}
          style={{marginTop: verticalScale(100)}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    backgroundColor: '#ffffff',
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    width: '80%',
    marginLeft: 10,
    padding: 10,
  },
  inputContainer: {
    width: '95%',
    marginLeft: 10,
    padding: 10,
  },
  videoInput: {
    ...appstyle.shadow,
    width: '90%',
    height: 200,
    justifyContent: 'center',
    borderRadius: 10,
    left: '5%',
  },
  photoInput: {
    width: '90%',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    marginLeft: '5%',
    flexDirection: 'row',
  },
  innerPhotos: {
    backgroundColor: '#EBEFFF',
    height: 100,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
