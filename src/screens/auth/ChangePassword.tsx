/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Dialog, Portal} from 'react-native-paper';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// helpers
import {colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';

// components
import {CustomButton, CustomInput, Title} from '../../components';

import {changePassword} from '../../redux/actions/authAction';
import {loginValue, resetSuccess} from '../../redux/reducers/authSlice';
import {logout} from '../../redux/reducers/authSlice';

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [input, setInput] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const {loading, success, error} = useAppSelector(state => state.auth);

  const [isValid, setIsValid] = useState<Array<boolean>>([]);

  const passwordStrength = [
    'Atleast one upper case.',
    'Atleast one numeric digit.',
    'Atleast one special character (E.g @%$)',
    'Atleast 8 characters',
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

    if (!input.oldPassword) {
      handleError('Please enter valid password', 'password');
      _isValid = false;
    }

    if (input.newPassword.length < 8) {
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
      changePassword({
        oldPassword: input.oldPassword,
        newPassword: input.newPassword,
        confirmPassword: input.confirmPassword,
      }),
    );
  };

  const handleSuccessDialogClose = () => {
    setInput({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsValid([]);
    dispatch(resetSuccess());
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  //@ts-ignore
  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(resetSuccess());
    });
    return () => listener;
  }, []);

  const handleOnchange = (text: string, _input: string) => {
    setInput(prevState => ({...prevState, [_input]: text}));
  };
  const handleError = (_error: any, _input: string) => {
    setErrors(prevState => ({...prevState, [_input]: _error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <Title title="Change Password" />
      <Portal>
        <Dialog visible={!!success}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
            }}>
            <Text
              style={{
                padding: 10,
                fontSize: 16,
                fontFamily: fonts.medium,
                color: colors.grey,
              }}>
              Your Password has been changed successfully.
            </Text>
          </View>
          <Dialog.Actions>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={{
                  width: '40%',
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: 'center',
                }}
                onPress={handleSuccessDialogClose}>
                <Text style={{fontFamily: fonts.semibold, color: colors.white}}>
                  Stay Login
                </Text>
              </Pressable>
              <TouchableOpacity
                style={{
                  width: '40%',
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  padding: 10,
                  alignItems: 'center',
                }}
                onPress={() => {
                  dispatch(logout());
                }}>
                <Text style={{fontFamily: fonts.semibold, color: colors.white}}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <ScrollView>
        <View style={{margin: 10}}>
          <CustomInput
            value={input.oldPassword}
            onChangeText={(text: string) => {
              handleError('', 'oldPassword');
              dispatch(loginValue());
              handleOnchange(text, 'oldPassword');
            }}
            onFocus={() => handleError(null, 'oldPassword')}
            label="Current Password"
            maxLength={30}
            placeholder="Enter current password"
            autoCapitalize="none"
            password
            containerStyle={{marginTop: 10}}
          />

          <CustomInput
            value={input.newPassword}
            onChangeText={(text: string) => {
              //@ts-ignore
              setIsValid(handleValidation(text));
              handleError('', 'newPassword');
              dispatch(loginValue());
              handleOnchange(text, 'newPassword');
            }}
            onFocus={() => handleError('', 'newPassword')}
            label="New Password"
            maxLength={30}
            placeholder="Enter new password"
            autoCapitalize="none"
            password
            containerStyle={{marginTop: 20}}
          />

          <CustomInput
            value={input.confirmPassword}
            onChangeText={(text: string) => {
              handleError('', 'confirmPassword');
              dispatch(loginValue());
              handleOnchange(text, 'confirmPassword');
            }}
            onFocus={() => {
              handleError('', 'confirmPassword');
            }}
            maxLength={30}
            label="Confirm New password"
            placeholder="Enter confirm password"
            autoCapitalize="none"
            password
            containerStyle={{marginTop: 20}}
          />

          {!!error && (
            <Text
              style={{
                color: 'red',
                fontFamily: fonts.medium,
                marginTop: 5,
              }}>
              {error}
            </Text>
          )}

          <View style={{marginTop: 20}}>
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
            input.oldPassword.length >= 8 &&
            input.newPassword.length >= 8 &&
            input.confirmPassword.length >= 8 &&
            isValid.every(_item => _item == true)
          }
          style={{bottom: 20, marginTop: 120}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
