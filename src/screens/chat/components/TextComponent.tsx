import React from 'react';
import {View, Text} from 'react-native';
import {colors, fonts} from '../../../theme';
import moment from 'moment';

enum TextPosition {
  left = 'left',
  right = 'right',
}

const TextComponent = ({
  item,
  position,
}: {
  item: any;
  position: TextPosition;
}) => {
  return (
    <View>
      <View
        style={{
          backgroundColor:
            position == TextPosition.right ? colors.primary : '#E8E9EB',
          padding: 15,
          borderRadius: 10,
          borderBottomRightRadius: TextPosition.left ? 0 : 15,
          borderBottomLeftRadius: TextPosition.left ? 0 : 15,
        }}>
        <Text
          style={{
            color: position == TextPosition.right ? 'white' : '#595F69',
            fontFamily: fonts.medium,
            fontSize: 12,
          }}>
          {item.text}
        </Text>
      </View>
      <Text
        style={{
          textAlign: position,
          fontFamily: fonts.medium,
          color: '#8A9099',
          fontSize: 10,
        }}>
        {moment(item.createdAt).fromNow()}
      </Text>
    </View>
  );
};

export default TextComponent;
