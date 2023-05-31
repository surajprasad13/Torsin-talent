import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

const MyRating = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyRating;
