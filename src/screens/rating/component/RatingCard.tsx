import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import {appstyle, fonts} from '../../../theme';
import {Rating} from '../../../types/user';

const RatingCard = ({item}: {item: Rating}) => {
  const navigation = useNavigation();

  const renderRatingStars = (number: number) => {
    return (
      <>
        {Array(number)
          .fill('')
          .map((_, index) => (
            <View key={index.toString()} style={{padding: 5}}>
              <AntDesign
                name={'star'}
                size={20}
                color={'#FFC005'} // Customize the star color as needed
              />
            </View>
          ))}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('RatingDetail', {item})}>
        <View style={styles.cardContainer}>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              source={{uri: item.profileImage}}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 0.5,
              }}
            />
            <View style={{padding: 5}}>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                  color: '#333333',
                }}>
                {item.fullname}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: '#333333',
                }}>
                {item.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {renderRatingStars(item.rating)}
            <Text
              style={{
                padding: 7,
                color: '#1E202B',
                fontFamily: fonts.semibold,
                fontSize: 14,
                flex: 0.9,
              }}>
              {item.rating}
            </Text>
            <Text
              style={{
                padding: 10,
                color: '#1E202B',
                fontFamily: fonts.regular,
                fontSize: 14,
              }}>
              {moment(item.ratingCreatedAt).format('lll')}
            </Text>
          </View>
          <Text style={{padding: 10, color: '#1E202B', fontSize: 12}}>
            {item.jobDescription}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  cardContainer: {
    ...appstyle.shadow,
    margin: 6,
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
  },
});

export default RatingCard;
