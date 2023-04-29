import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Input from '../components/Input';
import ProFile from '../components/ProFile';
import Loader from '../components/Loader';

import {RadioButton} from 'react-native-paper';

import {metrics} from '../theme';
import {useNavigation} from '@react-navigation/native';
const {horizontalScale, moderateScale, verticalScale} = metrics;

const EditUserProfile = ({}) => {
  const navigation = useNavigation();

  const [inputs, setInputs] = React.useState({
    fullname: '',
    email: '',
    phone: '',
    location: '',
    country: '',
  });

  const [errors, setErrors] = React.useState({});
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

    // if (!inputs.country) {
    //     handleError('Please input Country', 'country');
    //     isValid = false;
    // }
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
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={true}
      />

      {loading && <Loader />}

      <View
        style={{
          backgroundColor: '#ffffff',
          height: 100,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={{
            position: 'absolute',
            top: 58,
            left: 24,
          }}>
          <Image
            source={require('../assets/images/backarrow.png')}
            style={{
              width: 16,
              height: 14,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            top: 50,
            alignItems: 'center',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 28,
            color: '#000C14',
          }}>
          John Smith’s Profile
        </Text>
      </View>

      <ScrollView contentContainerStyle={{paddingHorizontal: 20, bottom: 20}}>
        <View
          style={{
            top: 25,
          }}>
          <ProFile />
        </View>

        <View style={{marginTop: 47}}>
          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            // iconName="account-outline"
            label="Name"
            placeholder="John smith"
            error={errors.fullname}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            // iconName="email-outline"
            label="Email"
            placeholder="john@gmail.com"
            error={errors.email}
          />
        </View>

        <View
          style={{
            marginTop: 20,
          }}>
          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            // iconName="phone-outline"
            label="Mobile Number"
            placeholder="895204300"
            error={errors.phone}
          />
        </View>

        <View style={{marginTop: verticalScale(20)}}>
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
              lineHeight: 22,
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
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 20,
                display: 'flex',
                marginTop: verticalScale(7),
                alignItems: 'center',
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
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 20,
                display: 'flex',
                marginTop: verticalScale(7),
                alignItems: 'center',
                color: '#4F4F4F',
              }}>
              Female
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
          }}>
          <Input
            onChangeText={text => handleOnchange(text, 'location')}
            onFocus={() => handleError(null, 'location')}
            // iconName="lock-outline"
            label="Location"
            placeholder="Murshid Bazar, Deira, P.O Box 40512"
            error={errors.location}
            location
          />
        </View>

        <TouchableOpacity
          //   onPress={validate}
          //   disabled={
          //       inputs.fullname &&
          //           inputs.email &&
          //           inputs.phone &&
          //           inputs.location ? false : true}
          style={{
            width: '85%',
            height: 50,
            marginTop: verticalScale(20),
            // marginTop: moderateScale(150),
            marginLeft: '7.5%',
            backgroundColor: '#0E184D',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: moderateScale(16),
              lineHeight: 22,
            }}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditUserProfile;

const styles = StyleSheet.create({});
