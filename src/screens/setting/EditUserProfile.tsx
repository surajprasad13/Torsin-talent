import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Dialog, Portal, RadioButton} from 'react-native-paper';

// icons
import Feather from 'react-native-vector-icons/Feather';

// components
import ProFile from '../../components/ProFile';

// helpers
import {colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {CustomButton, CustomInput} from '../../components';
import {userUpdate} from '../../redux/actions/authAction';
import {resetSuccess} from '../../redux/reducers/authSlice';

const EditUserProfile = ({}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {userInfo, userToken, error, success} = useAppSelector(
    state => state.auth,
  );

  const [inputs, setInputs] = useState({
    fullName: userInfo?.fullName,
    email: userInfo?.email,
    mobileNo: userInfo?.mobileNo,
    location: userInfo?.location,
    profileImage: userInfo?.profileImage,
    gender: userInfo?.gender ?? 1,
    countryName: userInfo?.countryName ?? '',
  });

  const [errors, setErrors] = React.useState<any>({});

  const update = () => {
    dispatch(userUpdate({inputs, userToken}));
  };

  const handleOnchange = (text: string, input: any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (_error: any, input: any) => {
    setErrors((prevState: any) => ({...prevState, [input]: _error}));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Portal>
        <Dialog visible={!!success}>
          <Dialog.Title>Profile Updated</Dialog.Title>
          <Dialog.Actions>
            <Button
              onPress={() => {
                dispatch(resetSuccess());
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.headerContainer}>
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
          {userInfo?.fullName}
        </Text>
        <View style={{}} />
      </View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{padding: 10, backgroundColor: '#F9FBFF'}}>
          <ProFile
            image={
              inputs.profileImage ?? 'https://source.unsplash.com/400x400?user'
            }
            onPress={() => {}}
          />

          {!!error && (
            <Text
              style={{
                marginTop: 40,
                textAlign: 'center',
                fontFamily: fonts.medium,
                color: colors.red,
              }}>
              {error}
            </Text>
          )}

          <CustomInput
            value={inputs.fullName}
            onChangeText={(text: string) => handleOnchange(text, 'fullName')}
            onFocus={() => handleError(null, 'fullname')}
            label="Name"
            placeholder={inputs.fullName}
            placeholderTextColor="#333333"
            containerStyle={{marginTop: 40}}
          />

          <CustomInput
            value={inputs.email}
            onChangeText={(text: string) => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            label="Email"
            placeholder={inputs.email}
            placeholderTextColor="#333333"
            containerStyle={{marginTop: 20}}
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
          />

          <View style={{marginTop: 20}}>
            <Text style={{color: '#4F4F4F', fontFamily: fonts.regular}}>
              Gender
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                color="#0E184D"
                status={inputs.gender === 1 ? 'checked' : 'unchecked'}
                onPress={() => {
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
                status={inputs.gender === 2 ? 'checked' : 'unchecked'}
                onPress={() => {
                  setInputs(prevState => ({...prevState, gender: 2}));
                }}
              />
              <Text style={{fontFamily: fonts.regular, color: '#4F4F4F'}}>
                Female
              </Text>
            </View>
          </View>

          <CustomInput
            value={inputs.location}
            onChangeText={(text: string) => handleOnchange(text, 'location')}
            onFocus={() => handleError(null, 'location')}
            label="Location"
            placeholder={inputs.location}
            containerStyle={{marginTop: 20}}
          />

          <CustomInput
            value={inputs.countryName}
            onChangeText={(text: string) => handleOnchange(text, 'countryName')}
            onFocus={() => handleError(null, 'location')}
            label="Country"
            placeholder={inputs.countryName}
            containerStyle={{marginTop: 20}}
          />

          <CustomButton
            title="Save Changes"
            style={{marginTop: 20}}
            disabled={true}
            onPress={update}
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
});

export default EditUserProfile;
