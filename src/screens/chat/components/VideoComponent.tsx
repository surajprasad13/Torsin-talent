import React from 'react';
import {View, Text} from 'react-native';
import Video from 'react-native-video';

// helpers
import {ChatMessage} from '../../../types/ChatMessage';
import moment from 'moment';
import {fonts} from '../../../theme';

enum TextPosition {
  left = 'left',
  right = 'right',
}

const VideoComponent = ({
  item,
  position,
}: {
  item: ChatMessage;
  position: TextPosition;
}) => {
  return (
    <View>
      <View
        style={{
          height: 250,
          backgroundColor: '#F9FbFF',
          borderRadius: 15,
          borderBottomLeftRadius: TextPosition.left ? 15 : 0,
          borderBottomRightRadius: TextPosition.left ? 0 : 15,
        }}>
        <Video
          controls
          paused
          source={{uri: item.video}}
          style={{
            width: '100%',
            height: 250,
            borderRadius: 10,
          }}
          posterResizeMode="cover"
          resizeMode="contain"
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

export default VideoComponent;
