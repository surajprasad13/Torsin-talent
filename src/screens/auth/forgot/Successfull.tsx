import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// helpers
import {fonts} from '../../../theme';
import {AuthScreenParamList} from '../../../routes/RouteType';

type NavigationProp = StackNavigationProp<AuthScreenParamList>;

const Successfull = ({}) => {
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.popToTop());
    }, 3000);
  }, []);

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Image
          source={require('../../../assets/images/succes.png')}
          style={{width: 280, height: 150}}
        />
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 24,
            color: '#000F1A',
            marginTop: 10,
          }}>
          Password reset successfully!
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}></View>
    </View>
  );
};

export default Successfull;
