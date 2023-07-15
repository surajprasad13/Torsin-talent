import moment from 'moment';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Divider} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../../../theme';

const NotificationCard = ({item}: any) => {
  return (
    <View style={{}}>
      <TouchableOpacity style={styles.container}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            backgroundColor: '#d4d9f7',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons
            name="notifications-circle"
            size={30}
            color={colors.primary}
          />
        </View>
        <View style={{width: '80%'}}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: '#333333',
              fontSize: 14,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: '#4F4F4F',
            }}>
            {item.desc}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: fonts.regular, color: '#4F4F4F'}}>
              {item.sender_name}
            </Text>
            <Text style={{fontFamily: fonts.regular, color: '#BDBDBD'}}>
              {moment(item.createdAt).format('lll')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default NotificationCard;
