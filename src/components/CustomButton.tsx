import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle} from 'react-native';

// components

import {colors, fonts, metrics} from '../theme';

type ButtonProp = {
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

const CustomButton = (props: ButtonProp) => {
  return (
    <TouchableOpacity
      disabled={!props.disabled}
      onPress={props.onPress}
      style={[
        styles.container,
        props.style,
        {backgroundColor: props.disabled ? colors.primary : '#E0E0E0'},
      ]}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: metrics.moderateScale(16),
  },
});

export default CustomButton;
