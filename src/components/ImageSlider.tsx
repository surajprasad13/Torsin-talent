import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';

// helpers
import {colors, fonts} from '../theme';

const images = [
  'https://source.unsplash.com/400x400?stone',
  'https://source.unsplash.com/400x400?water',
  'https://source.unsplash.com/400x400?mountain',
  'https://source.unsplash.com/400x400?tree',
  'https://source.unsplash.com/400x400?clouds',
  'https://source.unsplash.com/400x400?sky',
];

const {width} = Dimensions.get('window');

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<any | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(newIndex);
      scrollRef.current?.scrollTo({x: width - newIndex, animated: true});
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: false,
      })}
      scrollEventThrottle={16}>
      {images.map((image, index) => (
        <View key={index.toString()} style={{width}}>
          <ImageBackground
            key={index}
            source={{uri: image}}
            resizeMode="cover"
            style={{width: 'auto', height: 200, margin: 5}}
            imageStyle={{borderRadius: 10}}>
            <Text
              style={{
                padding: 10,
                fontFamily: fonts.medium,
                color: colors.white,
              }}>
              Blog {index + 1}
            </Text>
            <Text
              style={{
                padding: 10,
                fontFamily: fonts.medium,
                color: colors.white,
                position: 'absolute',
                bottom: 10,
              }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum,
              explicabo? Fuga, reiciendis.
            </Text>
          </ImageBackground>
        </View>
      ))}
    </ScrollView>
  );
};

export default ImageSlider;
