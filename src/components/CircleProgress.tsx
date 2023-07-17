import React, {FC} from 'react';
import {View, Image, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {colors, fonts} from '../theme';

interface CircleProgressProp {
  image: string;
  progress: number;
}

const CircleProgress: FC<CircleProgressProp> = ({image, progress}) => {
  return (
    <View style={{top: 10}}>
      <AnimatedCircularProgress
        size={60}
        width={4}
        fill={progress ?? 0}
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
            fontFamily: fonts.regular,
            fontSize: 10,
            color: colors.white,
          }}>
          {progress}%
        </Text>
      </View>
    </View>
  );
};

export default CircleProgress;
