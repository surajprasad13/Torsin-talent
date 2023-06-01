import {View, Text, Image, SafeAreaView, StyleSheet, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {colors, fonts} from '../../theme';
import {useNavigation} from '@react-navigation/native';

const PurposalSent = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to the desired screen after a specified delay
      Alert.alert('Proposal sent successfully');
      navigation.navigate('DrawerNavigation');
    }, 1000); // Timeout duration in milliseconds

    // Clean up the timeout when the component unmounts or the effect re-runs
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/images/Frame.png')} />
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
