import React from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../theme';

function MyTabBar({state, descriptors, navigation, position}: any) {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_: any, i: number) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: any) => (i === index ? 1 : 0.8)),
        });

        return (
          <TouchableOpacity
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.textContainer,
              {backgroundColor: isFocused ? colors.white : 'transparent'},
            ]}>
            <Animated.Text
              style={{
                opacity,
                color: isFocused ? colors.primary : 'white',
                textAlign: 'center',
                fontFamily: isFocused ? fonts.bold : fonts.regular,
              }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: 10,
  },
  textContainer: {
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
});

export default MyTabBar;
