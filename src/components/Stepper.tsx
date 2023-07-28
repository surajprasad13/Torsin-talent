import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {colors} from '../theme';

interface StepperProps {
  step: number;
}

const Stepper: FC<StepperProps> = ({step}) => {
  const progress = useDerivedValue(() => {
    return step == 0 ? withSpring('0%') : withSpring('100%');
  }, [step]);

  const progressColor = useDerivedValue(() => {
    return step == 0
      ? withTiming(0, {duration: 5000})
      : withSpring(1, {duration: 5000});
  }, [step]);

  const bStyle = useAnimatedStyle(() => {
    return {
      width: progress.value,
    };
  });

  const dStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progressColor.value,
      [0, 1],
      [colors.grey, colors.primary],
    );

    return {
      backgroundColor,
    };
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dot,
          {
            backgroundColor: '#14226D',
            right: -1,
          },
        ]}
      />
      <View style={styles.bar}>
        <Animated.View
          style={[
            styles.bar,
            bStyle,
            {
              backgroundColor: '#14226D',
              position: 'absolute',
              top: 0,
            },
          ]}
        />
      </View>
      <Animated.View
        style={[
          styles.dot,
          {
            left: -2,
          },
          dStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  bar: {
    width: 120,
    height: 10,
    top: 5,
    backgroundColor: colors.grey,
  },
});

export default Stepper;
