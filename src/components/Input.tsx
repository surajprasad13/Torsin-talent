import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native';

import {colors, fonts} from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InputValueProps {
  label: string;
  error: any;
  password: string;
  cpassword: string;
  onFocus: () => void;
}

const Input = ({
  label,
  error,
  password,
  cpassword,
  onFocus = () => {},
  ...props
}: InputValueProps) => {
  const [hidePassword, setHidePassword] = useState<boolean>(!!password);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View style={{marginBottom: 20}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? colors.red
              : isFocused
              ? colors.light
              : colors.light,
            alignItems: 'center',
          },
        ]}>
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={Keyboard.dismiss}
          keyboardType="default"
          secureTextEntry={!!hidePassword}
          style={{color: '#000000', flex: 1}}
          placeholderTextColor="#828282"
          {...props}
        />
        {password && (
          <Icon
            onBlur={() => setIsFocused(false)}
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            style={{color: colors.light, fontSize: 22}}
          />
        )}
        {cpassword && (
          <Icon
            onBlur={() => setIsFocused(false)}
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: colors.light, fontSize: 22}}
          />
        )}
      </View>
      {error && <Text style={{color: colors.red, fontSize: 12}}>{error}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    fontFamily: fonts.regular,
    color: '#4F4F4F',
    fontSize: 16,
    top: -8,
  },
  inputContainer: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 12,
  },
});

export default Input;
