import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';

// icons
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

// components
import {colors, fonts, metrics} from '../../theme';
import {CustomButton, CustomInput, Loader} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  registerBusiness,
  registerIndivisual,
} from '../../redux/actions/authAction';
import {loginValue} from '../../redux/reducers/authSlice';

const {moderateScale} = metrics;

const passwordStrength = [
  'At least one upper case',
  'At least one number',
  'At least 8 character',
  'At least one special character (E.g @%$)',
];

const IndivisualCreatePassword = ({}) => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const {loading, error, userToken} = useAppSelector(state => state.auth);
  const navigation = useNavigation();

  const [input, setInput] = useState({
    password: '',
    confirmPassword: '',
  });

  const {item}: any = route.params;

  const data = JSON.parse(item);

  const register = () => {
    let finalResult = {
      ...data.data,
      ...input,
    };
    if (data.screen == 'indivisual') {
      dispatch(registerIndivisual(finalResult));
    } else {
      dispatch(registerBusiness(finalResult));
    }
  };

  const handleChange = (text: string, key: any) => {
    setInput(previousState => ({...previousState, [key]: text}));
  };

  useEffect(() => {
    if (userToken) {
      navigation.navigate('DrawerNavigation');
    }
  }, [userToken]);

  return (
    <SafeAreaView style={{flex: 1}}>
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

      <ScrollView style={{padding: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.primary,
              right: -1,
            }}></View>

          <View
            style={{
              width: 120,
              height: 10,
              backgroundColor: colors.primary,
              top: 5,
            }}></View>

          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.primary,
              left: -2,
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
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
              color: colors.blue,
              fontFamily: fonts.bold,
              fontSize: moderateScale(32),
            }}>
            Create Account
          </Text>
          <View />
        </View>
        <Text style={{fontFamily: fonts.regular, color: colors.cyanBlue}}>
          Set up your account with us! Please fill the below details to create
          account.
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            color: colors.primary,
            marginTop: 10,
            fontSize: 16,
          }}>
          Create New Password
        </Text>
        {!!error && (
          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontFamily: fonts.medium,
              color: colors.red,
            }}>
            {error}
          </Text>
        )}
        <CustomInput
          label="Password"
          placeholder="********"
          password
          secureTextEntry
          containerStyle={{marginTop: 10}}
          value={input.password}
          onChangeText={text => {
            handleChange(text, 'password');
            dispatch(loginValue());
          }}
        />
        <CustomInput
          label="Confirm Password"
          placeholder="********"
          password
          autoCapitalize="none"
          containerStyle={{marginTop: 10}}
          value={input.confirmPassword}
          onChangeText={text => {
            handleChange(text, 'confirmPassword');
            dispatch(loginValue());
          }}
        />

        <View style={{marginTop: 20}}>
          {passwordStrength.map((_item: string) => {
            return (
              <View key={_item} style={styles.checkContainer}>
                <IonIcon name="checkbox" size={25} color={colors.primary} />
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    color: colors.grey2,
                    paddingLeft: 10,
                  }}>
                  {_item}
                </Text>
              </View>
            );
          })}
        </View>

        <CustomButton
          title="Create Account"
          onPress={register}
          disabled={
            input.password.length >= 8 && input.confirmPassword.length >= 8
          }
          style={{marginTop: 50}}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fonts.regular,
            marginTop: 10,
          }}>
          Already have an account?{' '}
          <Text style={{fontFamily: fonts.bold}}>Log In</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default IndivisualCreatePassword;
