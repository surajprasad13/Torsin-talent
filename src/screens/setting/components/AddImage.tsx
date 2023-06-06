import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const AddImage = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibrary({
      mediaTypes: ImagePicker.launchImageLibrary,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={pickImage}>
        <Text>here</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{uri: image}} style={{width: 200, height: 200}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddImage;
