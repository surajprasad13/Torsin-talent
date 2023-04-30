import {StyleSheet, Image, Pressable, View} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';

type ProfilePorp = {
  image: string;
  onPress: () => void;
};

function ProFile({onPress, image}: ProfilePorp) {
  return (
    <View style={styles.centerContent}>
      <Pressable onPress={onPress}>
        <Avatar.Image
          size={80}
          style={{}}
          source={
            image
              ? {uri: 'data:image/png;base64,' + image}
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
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    width: 34,
    height: 34,
    position: 'absolute',
    marginLeft: 50,
    marginTop: 45,
  },
});

export default ProFile;
