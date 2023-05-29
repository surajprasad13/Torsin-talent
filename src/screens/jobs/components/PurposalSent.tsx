import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../theme';

const PurposalSent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../../assets/images/Frame.png')} />
      <Text style={{fontSize: 24, fontFamily: fonts.bold, marginTop: 20}}>
        Proposal sent successfully
      </Text>
      <Text
        style={{
          fontFamily: fonts.regular,
          fontSize: 14,
          marginTop: 5,
          color: '#000F1A',
        }}>
        Your proposal has been sent successfully!{' '}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PurposalSent;
