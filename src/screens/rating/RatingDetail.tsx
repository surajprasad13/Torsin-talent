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

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import {appstyle, colors, fonts} from '../../theme';
import {Rating} from '../../types/user';

import moment from 'moment';
import {Divider} from 'react-native-paper';
import {Title} from '../../components';

const RatingDetail = ({route}: any) => {
  const {item}: {item: Rating} = route.params;

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
      <Title title="Rating Details" />
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
          <Text
            style={{
              padding: 10,
              color: '#1E202B',
              fontFamily: fonts.regular,
              fontSize: 14,
            }}>
            {moment(item.createdAt).format('lll')}
          </Text>
          <Text
            style={{
              padding: 10,
              color: '#1E202B',
              fontFamily: fonts.regular,
              fontSize: 14,
            }}>
            {item.location}, {item.countryName}
          </Text>
        </View>
        <Divider />
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: 16,
            color: '#333333',
            padding: 5,
            marginTop: 10,
          }}>
          Job Description
        </Text>
        <Text style={{padding: 10, color: '#1E202B', fontSize: 12}}>
          {item.jobDescription}
        </Text>
        <Divider />
        <View
          style={{
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
              fontSize: 16,
              padding: 5,
            }}>
            Photos
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            {item.image.map((_item, index) => {
              return (
                <FastImage
                  key={index.toString()}
                  source={{uri: _item}}
                  style={styles.innerImage}
                />
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <Text
          style={{
            fontFamily: fonts.semibold,
            color: colors.black,
            fontSize: 16,
            padding: 5,
          }}>
          Rating & Reviews
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
          {item.review}
        </Text>
      </View>
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
  innerImage: {
    width: 86,
    height: 86,
    borderRadius: 5,
    margin: 5,
  },
});

export default RatingDetail;
