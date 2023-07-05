import React from 'react';
import {View, Image, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const CircleProgress = ({image, progress}) => {
  return (
    <View style={{top: 10}}>
      <AnimatedCircularProgress
        size={60}
        width={4}
        fill={progress}
        tintColor="#14226D"
        rotation={180}
        onAnimationComplete={() => {}}
        backgroundColor="#ffffff"
      />
      <Image
        source={image ? {uri: image} : require('../assets/images/profile.png')}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          left: 10,
          top: 10,
          position: 'absolute',
        }}
      />

      <View
        style={{
          width: 38,
          height: 18,
          backgroundColor: '#14226D',
          borderRadius: 20,
          left: 35,
          bottom: 15,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 10,
            color: '#ffffff',
          }}>
          {progress}%
        </Text>
      </View>
    </View>
  );
};

export default CircleProgress;
