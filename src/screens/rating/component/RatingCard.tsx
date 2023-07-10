import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Divider} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import {appstyle, fonts} from '../../../theme';

const RatingCard = () => {
  const [rating, setRating] = useState(0);

  const renderRatingStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <View key={i} style={{padding: 5}}>
          <AntDesign
            name={'star'}
            size={20}
            color={'#FFC005'} // Customize the star color as needed
          />
        </View>,
      );
    }

    return stars;
  };

  const handleStarPress = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.cardContainer}>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            source={{
              uri: 'https://source.unsplash.com/400x400?avengers',
            }}
            resizeMode="cover"
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
          />
          <View style={{padding: 5}}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: 16,
                color: '#333333',
              }}>
              Client Name
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#333333',
              }}>
              Java
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {renderRatingStars()}
          <Text
            style={{
              padding: 7,
              color: '#1E202B',
              fontFamily: fonts.semibold,
              fontSize: 14,
              flex: 0.9,
            }}>
            5.0
          </Text>
          <Text
            style={{
              padding: 10,
              color: '#1E202B',
              fontFamily: fonts.regular,
              fontSize: 14,
            }}>
            3 days ago
          </Text>
        </View>
        <Divider />
        <Text style={{padding: 10, color: '#1E202B', fontSize: 12}}>
          As a musician l loved the job, the place. Everything was so cool!
          Minim mollit non deseruntAmet minim mollit non deserunt .
        </Text>
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
