import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {colors, fonts, appstyle} from '../../../theme';
import {Ticket} from '../../../types/user';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerScreenParamaList} from '../../../routes/RouteType';

const HelpCard = ({item}: {item: Ticket}) => {
  const navigation =
    useNavigation<DrawerNavigationProp<DrawerScreenParamaList>>();

  const renderStatus = (id: number) => {
    switch (id) {
      case 1:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'orange'}}>
            Pending
          </Text>
        );
      case 2:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'green'}}>
            Active
          </Text>
        );
      case 3:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'red'}}>
            Rejected
          </Text>
        );
      case 3:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'blue'}}>
            Completed
          </Text>
        );
      default:
        return;
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('HelpDetail', {item})}
        style={{
          ...styles.container,
        }}>
        <View style={{width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: '#1E202B',
                width: '80%',
              }}>
              {item.topicName.length > 30
                ? item.topicName.slice(0, 30) + '...'
                : item.topicName}
            </Text>

            <Text style={styles.time}>Just Now</Text>
          </View>
          <Text style={[styles.title, {width: '80%'}]}>
            {item.description.length > 50
              ? item.description.slice(0, 50) + '...'
              : item.description}
          </Text>
          <Text
            style={{
              ...styles.status,
              fontFamily: fonts.semibold,
              fontSize: 10,
            }}>
            {renderStatus(item.status)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
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
    color: '#1E202B',
    fontSize: 10,
    marginTop: 5,
  },
  time: {
    fontFamily: fonts.regular,
    color: colors.grey,
    textAlign: 'right',
    fontSize: 10,
  },
  status: {
    right: 5,
    position: 'absolute',
    bottom: -10,
    fontSize: 8,
  },
});

export default HelpCard;
