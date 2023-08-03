import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAppDispatch, useAppSelector} from '../hooks';
import {getFeedList} from '../redux/actions/userAction';
import {fonts} from '../theme';

const ImageSlider = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {feed, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getFeedList(''));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const {width} = Dimensions.get('window');

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % feed.length;
    setCurrentIndex(nextIndex);
  };

  return (
    <View style={{flex: 1}}>
      <Swiper
        style={{height: 210}}
        loop={false}
        index={currentIndex}
        showsPagination={false}
        onIndexChanged={index => setCurrentIndex(index)}>
        {feed?.slice(0, 5)?.map((item, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FeedDetails', {item})}
            key={index}
            style={{width}}>
            <ImageBackground
              source={{uri: item?.feedPhoto}}
              resizeMode="cover"
              style={{width: 'auto', height: 180, margin: 10}}
              imageStyle={{borderRadius: 10}}>
              <Text
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 5,
                  color: 'rgba(0, 0, 0, .5)',
                  fontSize: 20,
                  fontFamily: fonts.bold,
                }}>
                {item?.feedHeadline}
              </Text>

              <Text
                style={{
                  position: 'absolute',
                  bottom: 5,
                  left: 5,
                  color: 'rgba(0, 0, 0, .5)',
                  fontFamily: fonts.semibold,
                }}>
                {item?.feedDescription?.length > 150
                  ? item?.feedDescription?.substr(0, 150) + '...'
                  : item?.feedDescription}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </Swiper>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 5,
          top: 100,
          transform: [{translateY: -15}],
        }}
        onPress={handleNextImage}>
        <Icon name="right" size={20} color="rgba(0, 0, 0, .5)" />
      </TouchableOpacity>
    </View>
  );
};

export default ImageSlider;
