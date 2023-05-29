import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {appstyle, colors, fonts} from '../../../theme';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-paper';
import {JobDetail} from '../../../types/user';

const ExpertiseCard = ({item}: {item: JobDetail}) => {
  return (
    <View style={[styles.cardContainer, {}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <FastImage
          source={{uri: item.photos[0]}}
          resizeMode="cover"
          style={{width: 50, height: 50, borderRadius: 25}}
        />
        <View style={{width: '80%'}}>
          <Text style={styles.headertext}>{item.jobName}</Text>

          <Text style={styles.text}>{item.jobDescription}</Text>
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
          }}>
          <Entypo name="location-pin" size={10} style={styles.icon} />
          <Text
            style={{fontFamily: fonts.regular, fontSize: 12}}
            numberOfLines={1}>
            {item.location}
          </Text>
        </View>

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

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="user" size={10} style={styles.icon} />
          <Text
            style={{fontFamily: fonts.regular, fontSize: 12}}
            numberOfLines={1}>
            {item.countryName}
          </Text>
        </View>
      </View>
    </View>
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
