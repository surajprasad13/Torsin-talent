import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

const WebScreen = ({route}) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={styles.container}>
        
      <View>
        <Text>WebScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default WebScreen;
