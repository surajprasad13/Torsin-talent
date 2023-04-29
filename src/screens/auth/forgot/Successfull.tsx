import React from 'react';

import {View, Text, Image} from 'react-native';

const Successfull = () => {
  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <View style={{marginTop: 150, alignItems: 'center'}}>
        <Image
          source={require('../../../assets/images/succes.png')}
          style={{width: 280, height: 150}}
        />
      </View>

      <View
        style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 24,
            lineHeight: 26,
            // width: 175,
            display: 'flex',
            color: '#000F1A',
          }}>
          Password reset successfully!
        </Text>
      </View>

      <View
        style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 14,
            lineHeight: 20,
            // width: 175,
            display: 'flex',
            color: '#000F1A',
          }}>
          Password reset successfully!
        </Text>
      </View>
    </View>
  );
};

export default Successfull;
