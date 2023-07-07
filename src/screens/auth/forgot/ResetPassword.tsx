import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// helpers
import {colors, fonts, metrics} from '../../../theme';

// components
import Input from '../../../components/Input';
import Loader from '../../../components/Loader';
import {useNavigation} from '@react-navigation/native';
import {CustomButton, CustomInput, Title} from '../../../components';

const {moderateScale, verticalScale} = metrics;

const ResetPassword = ({}) => {
  const navigation = useNavigation();

  const [input, setInput] = useState({
    password: '',
    confirmPassword: '',
  });

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

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      register();
    }
  };

  const register = async () => {
    const headers = {
      Accept: 'application/json',
    };
  };

  const handleOnchange = (text, input) => {
    setInput(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <Title />
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
              label="Password"
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
              label="Re-enter password"
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
          onPress={validate}
          disabled={
            input.password.length >= 8 &&
            input.confirmPassword.length >= 8 &&
            isValid.every(_item => _item == true)
          }
          style={{marginTop: 200}}
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },

  tinyLogo: {
    width: 16,
    height: 14,
  },

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 20,
  },
});

export default ResetPassword;
