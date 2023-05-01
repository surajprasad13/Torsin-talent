import React from 'react';
import {View, Image, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const CircleProgress = () => {
  return (
    <View>
      <AnimatedCircularProgress
        size={90}
        width={4}
        fill={80}
        tintColor="#14226D"
        rotation={180}
        onAnimationComplete={() => {}}
        backgroundColor="#ffffff"
      />
      <Image
        source={require('../assets/images/profile.png')}
        style={{
          width: 70,
          height: 70,
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
          left: 40,
          bottom: -8,
          position: 'absolute',
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
