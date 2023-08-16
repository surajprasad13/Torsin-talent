import React from 'react';
import {View, Image} from 'react-native';

const OpenCamera = ({route}) => {
  const {selectedImage} = route.params;

  return (
    <View>
      <Image
        source={{uri: selectedImage}}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
};

export default OpenCamera;
