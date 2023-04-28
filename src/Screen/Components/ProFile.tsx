import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Button,
  ToastAndroid,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProFile() {
  const [Pic, setPic] = React.useState('');

  const [error, setError] = React.useState(true);

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const uploadImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Cancel');
      } else if (response.errorCode == 'permission') {
        setToastMsg('Permission');
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 1097152) {
        Alert.alert('maximum size');
      } else {
        setPic(response.assets[0].base64);
      }
    });
  };

  const removeImage = () => {
    setPic('');
    setToastMsg('Image removed');
  };

  return (
    <View>
      <View style={styles.centerContent}>
        <TouchableHighlight
          onPress={() => uploadImage()}
          underlayColor="rgba(0,0,0,0)">
          <View>
            <Avatar.Image
              size={80}
              style={{
                backgroundColor: '#ffffff',
              }}
              onProgress={error => {
                setError(false);
              }}
              source={
                error
                  ? require('../../assets/images/profile.png')
                  : {uri: 'data:image/png;base64,' + Pic}
              }
            />
            <Image
              source={
                error
                  ? require('../../assets/images/camera.png')
                  : '../../assets/images/check.png'
              }
              style={{
                width: 34,
                height: 34,
                position: 'absolute',
                marginLeft: 50,
                marginTop: 45,
              }}
            />
          </View>
        </TouchableHighlight>
      </View>

      {/* <View style = {[styles.centerContent, {marginTop: 25, flexDirection: 'row'}]}>
      <Button 
      onPress={() => uploadImage()}
      title='Upload Image'
      />
       <Button 
      onPress={() => removeImage()}
      title='Remove Image'
      />
    </View> */}
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
