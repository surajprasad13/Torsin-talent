import {
  StyleSheet,
  Image,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';

type ProfilePorp = {
  image?: string;
  onPress: () => void;
  loading?: boolean;
};

function Profile({onPress, image, loading}: ProfilePorp) {
  const pattern = /https/;
  const url = pattern.test(image ?? '');

  return (
    <View style={styles.centerContent}>
      <Pressable onPress={onPress}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <View>
            <Avatar.Image
              size={80}
              style={{backgroundColor: 'white'}}
              source={
                image
                  ? url
                    ? {uri: image}
                    : {uri: 'data:image/png;base64,' + image}
                  : require('../assets/images/profile.png')
              }
            />
            <Image
              source={
                image
                  ? require('../assets/images/check.png')
                  : require('../assets/images/camera.png')
              }
              style={styles.icon}
            />
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'gray',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    marginLeft: 60,
    marginTop: 55,
  },
});

export default Profile;
// profile
