import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {ChatMessage} from '../../../types/ChatMessage';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {colors, fonts} from '../../../theme';

const {width} = Dimensions.get('window');

enum TextPosition {
  left = 'left',
  right = 'right',
}

const ImageComponent = ({
  item,
  position,
}: {
  item: ChatMessage;
  position: TextPosition;
}) => {
  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor:
            position == TextPosition.left ? '#E8E9EB' : colors.primary,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          height: 230,
          borderBottomLeftRadius: TextPosition.left ? 15 : 0,
          borderBottomRightRadius: TextPosition.left ? 0 : 15,
        }}>
        <FastImage
          source={{uri: item.image}}
          resizeMode="cover"
          style={{
            width: width * 0.5,
            height: 220,
            borderRadius: 10,
            borderBottomLeftRadius: TextPosition.left ? 15 : 0,
            borderBottomRightRadius: TextPosition.left ? 0 : 15,
          }}
        />
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

export default ImageComponent;
