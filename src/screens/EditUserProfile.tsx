import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';

// icons
import Feather from 'react-native-vector-icons/Feather';

// components
import Input from '../components/Input';
import ProFile from '../components/ProFile';
import Loader from '../components/Loader';

// helpers
import {fonts, metrics} from '../theme';
import {useAppSelector} from '../hooks';

const {horizontalScale, moderateScale, verticalScale} = metrics;

const EditUserProfile = ({}) => {
  const navigation = useNavigation();

  const {} = useAppSelector(state => state.auth);

  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    phone: '',
    location: '',
    country: '',
  });

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
    <SafeAreaView style={{flex: 1}}>
      {loading && <Loader />}

      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={{padding: 10}}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            top: 50,
            fontFamily: fonts.medium,
            color: '#000C14',
          }}>
          John Smith’s Profile
        </Text>
      </View>

      <ScrollView contentContainerStyle={{paddingHorizontal: 20, bottom: 20}}>
        <View style={{top: 25}}>
          <ProFile image="" onPress={() => {}} />
        </View>

        <View style={{marginTop: 47}}>
          <Input
            onChangeText={(text: string) => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            label="Name"
            placeholder="John smith"
            error={errors.fullname}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Input
            onChangeText={(text: string) => handleOnchange(text, 'email')}
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
            keyboardType="phone-pad"
            onChangeText={(text: string) => handleOnchange(text, 'phone')}
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
              fontFamily: fonts.regular,
              right: 10,
              bottom: 20,
              fontSize: moderateScale(16),
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
                fontFamily: fonts.regular,
                fontSize: 14,
                marginTop: verticalScale(7),
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
                fontFamily: fonts.regular,
                fontSize: 14,
                display: 'flex',
                marginTop: verticalScale(7),
                alignItems: 'center',
                color: '#4F4F4F',
              }}>
              Female
            </Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Input
            onChangeText={(text: string) => handleOnchange(text, 'location')}
            onFocus={() => handleError(null, 'location')}
            label="Location"
            placeholder="Murshid Bazar, Deira, P.O Box 40512"
            error={errors.location}
            location
          />
        </View>

        <TouchableOpacity
          style={{
            width: '85%',
            height: 50,
            marginTop: verticalScale(20),
            marginLeft: '7.5%',
            backgroundColor: '#0E184D',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontFamily: fonts.bold,
              fontSize: moderateScale(16),
            }}>
            Save Changes
          </Text>
        </TouchableOpacity>
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
});

export default EditUserProfile;
