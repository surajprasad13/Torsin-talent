import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TextInputProps,
} from 'react-native';

import {colors, fonts} from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InputValueProps {
  label?: string;
  error?: any;
  password?: boolean;
  cpassword?: boolean;
}

const Input = (props: TextInputProps & InputValueProps) => {
  const [hidePassword, setHidePassword] = useState<boolean>(!!props.password);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View style={{marginBottom: 20}}>
      <Text style={style.label}>{props.label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: props.error
              ? colors.red
              : isFocused
              ? colors.darkBlue
              : '#BDBDBD',
            alignItems: 'center',
          },
        ]}>
        <TextInput
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={Keyboard.dismiss}
          secureTextEntry={!!hidePassword}
          style={{color: '#000000', flex: 1}}
          placeholderTextColor="#828282"
          {...props}
        />
        {props.password && (
          <Icon
            onBlur={() => setIsFocused(false)}
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            style={{color: colors.light, fontSize: 22}}
          />
        )}
        {props.cpassword && (
          <Icon
            onBlur={() => setIsFocused(false)}
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: colors.light, fontSize: 22}}
          />
        )}
      </View>
      {props.error && (
        <Text style={{color: colors.red, fontSize: 12}}>{props.error}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    fontFamily: fonts.regular,
    color: '#4F4F4F',
    fontSize: 16,
  },
  inputContainer: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 12,
    marginTop: 10,
  },
});

export default Input;
