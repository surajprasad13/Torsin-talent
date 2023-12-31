import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// helpers
import {appstyle, colors, fonts} from '../../../theme';
import {CustomButton, Title} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {createRating} from '../../../redux/actions/userAction';
import {updateSuccess} from '../../../redux/reducers/userSlice';

const RatingReview = ({route}: any) => {
  const {item} = route.params;

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {loading, error, message} = useAppSelector(state => state.user);

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const renderRatingStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            handleStarPress(i);
          }}
          activeOpacity={0.7}
          style={{padding: 5}}>
          <Ionicons
            name={rating >= i + 1 ? 'star' : 'star-outline'}
            size={30}
            color={rating >= i + 1 ? '#FFD700' : '#4F4F4F'} // Customize the star color as needed
          />
        </TouchableOpacity>,
      );
    }

    return stars;
  };

  const handleStarPress = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleonPress = () => {
    dispatch(
      createRating({
        rating,
        review,
        job_id: item.jobId,
        reciver_id: item.clientId,
      }),
    );
    Alert.alert(
      'Submited',
      'Your rating has been submitted',
      [
        {
          text: 'Ok',
          style: 'default',
          onPress: () => navigation.navigate('HomeScreen'),
        },
        {
          text: 'Cancel',
          style: 'destructive',
        },
      ],
      {userInterfaceStyle: 'dark'},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Rating & Review" />
      <ScrollView>
        <View
          style={{
            ...appstyle.shadow,
            padding: 10,
            margin: 15,
            borderRadius: 15,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: colors.black,
                fontSize: 20,
                lineHeight: 28,
              }}>
              Would you like to rate this Job & your Employer?
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: colors.black,
                opacity: 0.8,
                marginTop: 10,
                width: '92%',
                lineHeight: 22,
              }}>
              How would you rate the overall experience of your ride? Your
              Feedback matters!! Add to favourites.
            </Text>
            <FastImage
              source={require('../../../assets/images/Container.png')}
              resizeMode="cover"
              style={{width: 80, height: 80, borderRadius: 40, marginTop: 10}}
            />
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              {renderRatingStars()}
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.semibold,
                color: '#333333',
              }}>
              Add Review
            </Text>

            <View
              style={{
                width: '100%',
                height: 150,
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: colors.white,
                borderColor: '#BDBDBD',
                marginTop: 10,
              }}>
              <TextInput
                placeholder="Lorem ipsum dolor sit amet consectetur. Elementum vitae consequat erat tellus eleifend leo tempor lectus. Massa ac ullamcorper aliquet faucibus vestibulum. Aenean suspendisse semper."
                multiline={true}
                placeholderTextColor="#bdbdbd"
                maxLength={500}
                style={{padding: 15}}
                value={review}
                onChangeText={(text: string) => {
                  setReview(text);
                }}
              />
            </View>
          </View>
          <CustomButton
            style={{marginTop: 10}}
            title="Submit feedback"
            disabled
            loading={loading}
            onPress={handleonPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
});

export default RatingReview;
