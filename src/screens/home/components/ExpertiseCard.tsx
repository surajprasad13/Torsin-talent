import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {appstyle, colors, fonts} from '../../../theme';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-paper';
import {JobDetail} from '../../../types/user';
import {useNavigation} from '@react-navigation/native';

const ExpertiseCard = ({item}: {item: JobDetail}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.cardContainer, {}]}
      onPress={() => navigation.navigate('JobDetail', {item})}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: '80%'}}>
          <Text style={[styles.headertext, {}]}>{item.jobName}</Text>
          <Text style={styles.text}>
            {item.jobDescription.length > 100
              ? item.jobDescription.substring(0, 50).concat('...')
              : item.jobDescription}
          </Text>
          <Text style={styles.text}>${item.priceRate}</Text>
        </View>
      </View>

      <Divider style={{marginTop: 10}} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
          margin: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign name="clockcircleo" size={10} style={styles.icon} />
          <Text style={{fontFamily: fonts.regular, fontSize: 12}}>
            {moment(item.createdAt).format('lll')}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Entypo name="location-pin" size={10} style={styles.icon} />
          <Text
            style={{fontFamily: fonts.regular, fontSize: 12}}
            numberOfLines={1}>
            {item.location.length > 10
              ? item.location.substring(0, 10) + '...'
              : item.location}
            ,
            {item.countryName.length > 10
              ? item.countryName.substring(0, 10) + '...'
              : item.countryName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...appstyle.shadow,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  text: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 12,
    marginTop: 5,
    justifyContent: 'center',
  },
  headertext: {
    fontFamily: fonts.regular,
    color: colors.primary,
    fontSize: 16,
    justifyContent: 'center',
  },
  icon: {
    right: 2,
  },
});

export default ExpertiseCard;
