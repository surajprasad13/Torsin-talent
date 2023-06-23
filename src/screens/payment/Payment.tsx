import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

//helpers
import {Title} from '../../components';
import {appstyle, colors, fonts} from '../../theme';

const Payment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Payments" />
      <View style={{padding: 10}}>
        <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
          Pending/Ongoing
        </Text>
        <View style={styles.cardView}>
          <Text style={{textAlign: 'right', padding: 10, color: 'blue'}}>
            View Job
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  cardView: {
    ...appstyle.shadow,
    marginTop: 10,
    borderRadius: 12,
  },
});
