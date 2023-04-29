import React from 'react';
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native';

import {colors} from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({
  label,
  iconName,
  error,
  password,
  cpassword,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  // const [hidePasswordC, setHidePasswordC] = React.useState(cpassword);
  const [isFocused, setIsFocused] = React.useState(false);
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
              ? colors.darkBlue
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
          secureTextEntry={hidePassword}
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
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'regular',
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
