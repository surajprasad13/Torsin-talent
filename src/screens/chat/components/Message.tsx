import React from 'react';
import {View} from 'react-native';

// components
import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';
import VideoComponent from './VideoComponent';

// helpers
import {ChatMessage} from '../../../types/ChatMessage';
import {LoginResponseData} from '../../../types/auth';
import DocumentComponent from './DocumentComponent';

enum TextPosition {
  left = 'left',
  right = 'right',
}

const Message = ({
  item,
  userInfo,
}: {
  item: ChatMessage;
  userInfo: LoginResponseData;
}) => {
  return (
    <View style={{padding: 10}}>
      {item.user._id === userInfo.id ? (
        <View style={{maxWidth: '70%', alignSelf: 'flex-end', flex: 1}}>
          {item.text && (
            <TextComponent item={item} position={TextPosition.left} />
          )}
          {item.image && (
            <ImageComponent item={item} position={TextPosition.left} />
          )}
          {item.video && (
            <VideoComponent item={item} position={TextPosition.left} />
          )}
          {item.document && (
            <DocumentComponent item={item} position={TextPosition.left} />
          )}
        </View>
      ) : (
        <View style={{maxWidth: '70%', flex: 1, alignSelf: 'flex-start'}}>
          {item.text && (
            <TextComponent item={item} position={TextPosition.right} />
          )}
          {item.image && (
            <ImageComponent item={item} position={TextPosition.right} />
          )}
          {item.video && (
            <VideoComponent item={item} position={TextPosition.right} />
          )}
          {item.document && (
            <DocumentComponent item={item} position={TextPosition.right} />
          )}
        </View>
      )}
    </View>
  );
};

export default Message;
