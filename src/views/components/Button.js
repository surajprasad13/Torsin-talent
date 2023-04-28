import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import COLORS from '../../conts/colors';
import { moderateScale } from '../../../Screen/Components/Metrics';
const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: '85%',
        height: 50,
        // marginTop: moderateScale(150),
        marginLeft: '7.5%',
        backgroundColor: '#0E184D',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: moderateScale(20)
      }}>
      <Text style={{
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: moderateScale(16),
        lineHeight: 22,
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
