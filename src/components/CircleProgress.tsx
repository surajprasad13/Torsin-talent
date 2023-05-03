import React from 'react';
import {View, Image, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const CircleProgress = ({image}: any) => {
  return (
    <View style={{top: 10}}>
      <AnimatedCircularProgress
        size={60}
        width={4}
        fill={80}
        tintColor="#14226D"
        rotation={180}
        onAnimationComplete={() => {}}
        backgroundColor="#ffffff"
      />
      <Image
        source={
          image
            ? {uri: 'data:image/png;base64,' + image}
            : require('../assets/images/profile.png')
        }
        style={{
          width: 40,
          height: 40,
          borderRadius: 35,
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
          left: 30,
          bottom: 10,
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
          80%
        </Text>
      </View>
    </View>
  );
};

export default CircleProgress;
