import React, {useState} from 'react';
import {View, TouchableHighlight, StyleSheet, Alert} from 'react-native';
import {Avatar} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

function DrawerProfile() {
  const [image, setImage] = useState('');
  const [error, setError] = useState(true);

  const uploadImage = () => {
    let options: any = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.errorCode == 'permission') {
      } else if (response.errorCode == 'others') {
      } else if (response.assets[0].fileSize > 1097152) {
        Alert.alert('maximum size');
      } else {
        setImage(response.assets[0].base64);
      }
    });
  };

  return (
    <View>
      <View style={styles.centerContent}>
        <TouchableHighlight
          onPress={() => uploadImage()}
          underlayColor="rgba(0,0,0,0)">
          <View>
            <Avatar.Image
              size={59}
              style={{
                backgroundColor: '#ffffff',
                left: 20,
              }}
              onProgress={() => {
                setError(false);
              }}
              source={
                error
                  ? require('../../../Image/profile.png')
                  : {uri: 'data:image/png;base64,' + image}
              }
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default DrawerProfile;
