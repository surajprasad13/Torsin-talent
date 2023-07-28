import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {colors, fonts} from '../../../theme';
import {useAppDispatch, useAppSelector} from '../../../hooks';

// components
import {CustomButton, CustomInput, Title} from '../../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenParamList} from '../../../routes/RouteType';
import {resetPassword} from '../../../redux/actions/authAction';
import {resetSuccess} from '../../../redux/reducers/authSlice';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const ResetPassword = ({route}: any) => {
  const {email} = route.params;

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();

  const [input, setInput] = useState({
    password: '',
    confirmPassword: '',
  });
  const {loading, success} = useAppSelector(state => state.auth);

  const [isValid, setIsValid] = useState<Array<boolean>>([]);

  const passwordStrength = [
    'Atleast one upper character.',
    'Atleast one numeric digit.',
    'Atleast one speical character (E.g @%$)',
    'Atleast 8 character',
  ];

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

  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let _isValid = true;

    if (!input.password) {
      handleError('Please enter valid password', 'password');
      _isValid = false;
    }
    if (input.password.length < 8) {
      handleError('Min password length of 8', 'password');
      _isValid = false;
    }
    if (!input.confirmPassword) {
      handleError('Please enter Confirm password', 'confirmPassword');
      _isValid = false;
    } else if (input.confirmPassword.length < 8) {
      handleError('Min password length of 8', 'confirmPassword');
      _isValid = false;
    }
    if (_isValid) {
      resetPass();
    }
  };

  const resetPass = () => {
    dispatch(
      resetPassword({
        email,
        newPassword: input.password,
        confirmPassword: input.confirmPassword,
      }),
    );
  };

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess());
      navigation.navigate('Successfull');
    }
  }, [success]);

  const handleOnchange = (text, input) => {
    setInput(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={{}}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: fonts.medium,
            color: colors.almostBlack,
            textAlign: 'center',
            flex: 1,
          }}>
          Reset Password
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <View style={{flex: 0.8}}>
          <View>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: 22,
                color: '#0E184D',
              }}>
              Reset Password
            </Text>

            <Text
              style={{
                fontFamily: fonts.regular,
                alignItems: 'center',
                color: '#000F1A',
                top: 10,
              }}>
              It's important to choose a strong and unique password for your
              account to keep it secure
            </Text>
          </View>

          <View style={{top: 16}}>
            <CustomInput
              onChangeText={(text: string) => {
                setIsValid(handleValidation(text));
                handleError(null, 'password');
                handleOnchange(text, 'password');
              }}
              onFocus={() => handleError(null, 'password')}
              label="New password"
              maxLength={16}
              placeholder="Enter password"
              autoCapitalize="none"
              password
            />
          </View>

          <View style={{top: 32}}>
            <CustomInput
              onChangeText={(text: string) => {
                handleError(null, 'confirmPassword');
                handleOnchange(text, 'confirmPassword');
              }}
              onFocus={() => {
                handleError(null, 'confirmPassword');
              }}
              maxLength={16}
              label="Re-enter new password"
              placeholder="Re-enter password"
              autoCapitalize="none"
              password
            />
          </View>

          <View style={{marginTop: 50}}>
            {passwordStrength.map((_item: string, index: number) => {
              const _active = checkStatus(index);
              return (
                <View
                  key={_item}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    name={_active ? 'checkbox' : 'square-outline'}
                    size={25}
                    color={_active ? colors.primary : '#BDBDBD'}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      color: _active ? colors.primary : '#BDBDBD',
                      paddingLeft: 10,
                    }}>
                    {_item}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <CustomButton
          title="Submit"
          loading={loading}
          onPress={validate}
          disabled={
            input.password.length >= 8 &&
            input.confirmPassword.length >= 8 &&
            isValid.every(_item => _item == true)
          }
          style={{marginTop: 150, bottom: 20}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
