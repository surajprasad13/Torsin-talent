import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

import {Title} from '../../components';

const WebScreen = ({route}: any) => {
  const navigation = useNavigation();

  const {item} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Stripe" />
      <WebView
        source={{uri: item}}
        style={{flex: 1}}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator />}
        onNavigationStateChange={(navState: any) => {
          if (
            navState.url ==
              'https://talent-torsin.apponward.com/payment/success?link=talent://payment/success' ||
            'https://talent-torsin.apponward.com/payment'
          ) {
            navigation.goBack();
          }
        }}
      />
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
