import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {appstyle, colors, fonts} from '../../../theme';
import FastImage from 'react-native-fast-image';

const ServiceCard = () => {
  return (
    <View style={styles.cardContainer}>
      <FastImage
        source={{uri: 'https://source.unsplash.com/400x400?nature'}}
        resizeMode="contain"
        style={{width: 50, height: 50, borderRadius: 25}}
      />
      <View style={{width: '80%'}}>
        <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
          Song production
        </Text>
        <Text style={{fontFamily: fonts.regular, color: '#1E202B'}}>
          Job Description Complete your profile. Set your profile completely so
          that recruiter will find your profile easily.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={styles.text}>$500</Text>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: fonts.medium,
                color: colors.primary,
                fontSize: 12,
              }}>
              View more
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...appstyle.shadow,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStartColor: 'white',
    marginBottom: 10,
  },
  text: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 12,
  },
});

export default ServiceCard;
