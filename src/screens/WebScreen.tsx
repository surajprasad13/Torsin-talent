import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import WebView from 'react-native-webview';

const WebScreen = ({route}: any) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{uri: item}} style={{flex: 1}} />
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
