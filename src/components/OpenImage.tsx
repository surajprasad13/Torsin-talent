import React from 'react';
import {View, Image} from 'react-native';

const OpenImage = ({route}) => {
  const {selectedImage} = route.params;

  return (
    <View style={{margin: 10}}>
      <Image
        source={{uri: selectedImage}}
        style={{width: 'auto', height: 200}}
      />
    </View>
  );
};

export default OpenImage;
