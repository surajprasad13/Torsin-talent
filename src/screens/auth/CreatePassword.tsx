/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

// icons
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

// components
import {colors, fonts, metrics} from '../../theme';
import {CustomButton, CustomInput} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  registerBusiness,
  registerIndivisual,
} from '../../redux/actions/authAction';
import {
  loginValue,
  resetEmailVerified,
  resetMobileVerified,
  resetSuccess,
  resetVerified,
} from '../../redux/reducers/authSlice';
import {password} from '../../utils/regex';

const {moderateScale} = metrics;

const passwordStrength = [
  'Atleast one upper character.',
  'Atleast one numeric digit.',
  'Atleast one speical character (E.g @%$)',
  'Atleast 8 character',
];

const CreatePassword = ({}) => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const {loading, error, userToken} = useAppSelector(state => state.auth);
  const navigation = useNavigation();
  const [errors, setErrors] = useState<any>({});

  const [isValid, setIsValid] = useState<Array<boolean>>([]);

  const [input, setInput] = useState({
    password: '',
    confirmPassword: '',
  });

  function handleValidation(value: string) {
    const pattern = [
      '(?=.*[A-Z])', // uppercase letter
      '(?=.*\\d)', // number required
      '[^a-zA-Z0-9]',
      '^.{8,}$', // min 8 chars
    ];
    if (!pattern) return true;

    // string pattern, one validation rule
    if (typeof pattern === 'string') {
      const condition = new RegExp(pattern, 'g');
      return condition.test(value);
    }

    // array patterns, multiple validation rules
    if (typeof pattern === 'object') {
      const conditions = pattern.map(rule => new RegExp(rule, 'g'));
      return conditions.map(condition => condition.test(value));
    }
  }

  const validate = () => {
    Keyboard.dismiss();

    let _isValid = true;

    const validPassword = password(input.password);
    const validConfirmPassword = password(input.confirmPassword);

    if (!validPassword) {
      handleError('Please enter valid password', 'password');
      _isValid = false;
    }
    if (!validConfirmPassword) {
      handleError('Please enter valid confirm password', 'confirmPassword');
      _isValid = false;
    }

    if (_isValid) {
      setErrors({});
      register();
    }
  };

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

  const handleError = (_error: any, _input: any) => {
    setErrors((prevState: any) => ({...prevState, [_input]: _error}));
  };

  useEffect(() => {
    if (userToken) {
      dispatch(resetEmailVerified());
      dispatch(resetMobileVerified());
      dispatch(resetSuccess());
      navigation.reset({
        index: 0,
        routes: [{name: 'DrawerNavigation'}],
      });
    }
  }, [userToken]);

  function checkStatus(index: number) {
    switch (index) {
      case 0:
        return isValid[index];
      case 1:
        return isValid[index];
      case 2:
        return isValid[index];
      case 3:
        return isValid[index];
      default:
        return false;
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{padding: 10, backgroundColor: 'white'}}>
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
        <Text
          style={{
            fontFamily: fonts.regular,
            color: colors.cyanBlue,
            marginTop: 10,
          }}>
          {
            ' Set up your account with us!\n Please fill the below details to create  account.'
          }
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            color: '#0E184D',
            marginTop: 15,
            fontSize: 18,
          }}>
          Create New Password
        </Text>
        <CustomInput
          label="Password"
          placeholder="********"
          password
          secureTextEntry
          containerStyle={{marginTop: 15}}
          value={input.password}
          onChangeText={text => {
            setIsValid(handleValidation(text));
            handleChange(text, 'password');
            handleError('', 'password');
            dispatch(loginValue());
          }}
          error={errors.password}
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
            handleError('', 'confirmPassword');
            dispatch(loginValue());
          }}
          error={errors.confirmPassword}
        />

        {!!error && (
          <Text
            style={{
              textAlign: 'left',
              left: 10,
              color: 'red',
              bottom: 20,
              top: 10,
              fontFamily: fonts.medium,
            }}>
            {error}
          </Text>
        )}

        <View style={{marginTop: 20}}>
          {passwordStrength.map((_item: string, index: number) => {
            const active = checkStatus(index);
            return (
              <View key={_item} style={styles.checkContainer}>
                <IonIcon
                  name={active ? 'checkbox' : 'square-outline'}
                  size={25}
                  color={active ? colors.primary : '#BDBDBD'}
                />
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    color: active ? colors.primary : '#BDBDBD',
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
          onPress={validate}
          disabled={
            input.password.length >= 8 &&
            input.confirmPassword.length >= 8 &&
            isValid.every(_item => _item == true)
          }
          style={{marginTop: 50}}
          loading={loading}
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

export default CreatePassword;
