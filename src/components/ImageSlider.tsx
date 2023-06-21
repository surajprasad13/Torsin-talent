import React, {useState} from 'react';
import {View, Text, ImageBackground, ScrollView, Button} from 'react-native';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import {colors, fonts} from '../theme';

const images = [
  'https://source.unsplash.com/400x400?stone',
  'https://source.unsplash.com/400x400?water',
  'https://source.unsplash.com/400x400?mountain',
  'https://source.unsplash.com/400x400?tree',
  'https://source.unsplash.com/400x400?clouds',
  'https://source.unsplash.com/400x400?sky',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <ScrollView horizontal={true}>
      <ImageBackground
        key={currentIndex}
        source={{uri: images[currentIndex]}}
        resizeMode="cover"
        style={{width: 365, height: 200, margin: 5}}
        imageStyle={{borderRadius: 10}}>
        <Text
          style={{
            padding: 10,
            fontFamily: fonts.medium,
            color: colors.white,
          }}>
          Blog {currentIndex + 1}
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
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 15,
          position: 'absolute',
          right: 0,
          marginTop: 100,
        }}>
        <AntDesign name="right" size={20} onPress={handleNextImage} />
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 15,
          position: 'absolute',
          marginTop: 100,
        }}>
        <AntDesign name="left" size={20} onPress={handlePreviousImage} />
      </View>
    </ScrollView>
  );
};

export default ImageSlider;
