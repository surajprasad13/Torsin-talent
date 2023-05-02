import React from 'react';
import {
  useWindowDimensions,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {colors} from '../theme';

const Loader = ({}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={[style.container, {height, width}]}>
      <ActivityIndicator size="large" color={colors.blue} />
    </View>
  );
};

const style = StyleSheet.create({
  loader: {
    height: 70,
    backgroundColor: colors.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: 'center',
  },
});

export default Loader;
