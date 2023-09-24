import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import moment from 'moment';

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import {colors, fonts, appstyle} from '../../../theme';

const HomeCard = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <View
        style={{
          marginTop: 10,
          borderRadius: 16,
          padding: 10,
          margin: 10,
          ...appstyle.shadow,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            source={require('../../../assets/images/Profilepicture.png')}
            style={{
              width: 44.55,
              height: 44.55,
            }}
          />
          <View style={{margin: 8, width: '80%'}}>
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 14,
                color: '#1E202B',
              }}>
              Music
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 12,
                color: '#1E202B',
                marginTop: 5,
              }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
              omnis ea exercitationem saepe veritatis officiis consequuntur
              voluptates eum culpa iusto?
            </Text>
            <Text
              style={{
                fontFamily: fonts.medium,
                color: '#1E202B',
                marginTop: 10,
              }}>
              5000
            </Text>
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
              {moment().format('lll')}
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
              Gorakhpur
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    right: 2,
  },
});

export default HomeCard;
