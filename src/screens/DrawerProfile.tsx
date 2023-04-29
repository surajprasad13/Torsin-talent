import React from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

export default function DrawerProfile() {
  const [Pic, setPic] = React.useState('');

  const [error, setError] = React.useState(true);

  const setToastMsg = (msg: any) => {
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
                  : {uri: 'data:image/png;base64,' + Pic}
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
