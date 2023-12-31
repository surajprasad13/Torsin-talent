/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, Image, SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// helpers
import {colors, fonts} from '../../theme';
import {useAppDispatch} from '../../hooks';
import {resetSuccess} from '../../redux/reducers/authSlice';

const ProposalSentSuccess = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetSuccess());
    const timeout = setTimeout(() => {
      //@ts-ignore
      navigation.replace('DrawerNavigation', {
        screen: 'ProposalNavigator',
      });
    }, 1000);
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
          marginTop: 5,
          color: '#000F1A',
        }}>
        Your proposal has been sent successfully!
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

export default ProposalSentSuccess;
