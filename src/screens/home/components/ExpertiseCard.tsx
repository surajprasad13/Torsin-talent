import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {appstyle, colors, fonts} from '../../../theme';
import FastImage from 'react-native-fast-image';

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-paper';

const ExpertiseCard = ({item}: any) => {
  return (
    <View
      style={[
        styles.cardContainer,
        {backgroundColor: item % 2 !== 0 ? '#F5F5F5' : colors.white},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <FastImage
          source={{uri: 'https://source.unsplash.com/400x400?nature'}}
          resizeMode="contain"
          style={{width: 50, height: 50, borderRadius: 25}}
        />
        <View style={{width: '80%'}}>
          <Text style={styles.headertext}>Music Composer</Text>

          <Text style={styles.text}>
            As a musician minim mollit non deseruntAmet minim mollit non
            deserunt
          </Text>
          <Text style={styles.text}>$500.00-$ 600.00</Text>
        </View>
      </View>

      <Divider style={{marginTop: 10}} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Entypo name="location-pin" size={12} />
          <Text style={{fontFamily: fonts.regular, paddingLeft: 5}}>
            South Dakota
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="clockcircleo" size={12} />
          <Text style={{fontFamily: fonts.regular, paddingLeft: 5}}>
            3d ago
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="user" size={12} />
          <Text style={{fontFamily: fonts.regular, paddingLeft: 5}}>
            James Cameroon
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
});

export default ExpertiseCard;
