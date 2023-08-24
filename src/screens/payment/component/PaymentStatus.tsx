import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {fonts, appstyle} from '../../../theme';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

const PaymentStatus: FC = ({item}: any) => {
  const navigation = useNavigation();

  const renderStatus = (id: number) => {
    switch (id) {
      case 1:
        return;
      case 2:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'green'}}>
            Pending
          </Text>
        );
      case 3:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'red'}}>
            Received
          </Text>
        );
      default:
        return;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PaymentDetail', {id: item.jobId})}
      key={item.toString()}
      style={styles.container}>
      {/* <FastImage
        source={{uri: item.photos}}
        resizeMode="cover"
        style={styles.image}
      /> */}
      <View style={{width: '100%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
            {item.jobName}
          </Text>
          <Text style={styles.time}>View Job</Text>
        </View>
        <Text style={styles.title}>
          Payment yet to receive ${item.receivedAmount}
        </Text>
        <Text
          style={{
            textAlign: 'right',
            color: '#1E202B',
            fontSize: 8,
          }}>
          {moment(item.createdAt).format('lll')}
        </Text>
        {renderStatus(item.paymentStatus)}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ...appstyle.shadow,
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontFamily: fonts.regular,
    color: 'orange',
    fontSize: 12,
    marginTop: 5,
  },
  time: {
    fontFamily: fonts.regular,
    color: 'blue',
    textAlign: 'right',
  },
});

export default PaymentStatus;
