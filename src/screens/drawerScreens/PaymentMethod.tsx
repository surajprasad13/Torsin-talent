import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {Title} from '../../components';
import {appstyle, colors, fonts} from '../../theme';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const PaymentMethod = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Payment Method" />
      <View style={{padding: 10}}>
        <Text style={{fontFamily: fonts.regular, fontSize: 16}}>
          Payment Link
        </Text>
        <View
          style={{
            ...appstyle.shadow,
            padding: 10,
            borderRadius: 12,
            marginTop: 10,
          }}>
          <Text style={{color: '#6180F4', padding: 10, fontSize: 16}}>
            http://www.example.com/apparel.html?beginner=brotherwww.example.com/apparel.html
            beginner=brotherwww.example.com/apparel.html?beginner=brother
          </Text>
        </View>
        <View
          style={{
            ...appstyle.shadow,
            padding: 10,
            borderRadius: 12,
            marginTop: 30,
            borderWidth: 0.5,
            borderColor: colors.grey,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign
            name="exclamationcircleo"
            size={50}
            color="#6180F4"
            style={{padding: 10}}
          />

          <Text
            style={{
              color: '#000000',
              padding: 10,
              fontSize: 16,
              width: '85%',
              fontFamily: fonts.regular,
            }}>
            Click on the above link to proceed to Stripe payment source
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
});

export default PaymentMethod;
