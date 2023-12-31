import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import React, {FC, useState} from 'react';
import {colors, fonts} from '../theme';

import Feather from 'react-native-vector-icons/Feather';

type CustomInputProp = {
  label?: string;
  password?: boolean;
  style?: any;
  containerStyle?: ViewStyle;
  error?: string;
  onFocus?: () => void;
};

const CustomInput: FC<TextInputProps & CustomInputProp> = props => {
  const [active, setActive] = useState<boolean>(false);

  const [visible, setVisible] = useState<boolean>(props.password ?? false);

  return (
    <View style={[props.containerStyle]}>
      <Text style={styles.label}>{props.label}</Text>
      <View
        style={[
          styles.inputContainer,
          {borderWidth: 1, borderColor: active ? colors.primary : '#BDBDBD'},
        ]}>
        <TextInput
          {...props}
          onFocus={() => {
            props.onFocus?.();
            setActive(true);
          }}
          onBlur={() => setActive(true)}
          style={[styles.input]}
          secureTextEntry={visible}
        />
        {props.password && (
          <Feather
            name={visible ? 'eye' : 'eye-off'}
            size={20}
            color="#4F4F4F"
            onPress={() => setVisible(!visible)}
            style={{right: 10}}
          />
        )}
      </View>
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.regular,
    color: '#4F4F4F',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  input: {
    padding: 15,
    flex: 1,
    color: '#333333',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  errorText: {
    marginTop: 5,
    color: colors.red,
    fontFamily: fonts.regular,
  },
});

export default CustomInput;
