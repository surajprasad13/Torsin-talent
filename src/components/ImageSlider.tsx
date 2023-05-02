import React, {useCallback, memo, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const slideList = Array.from({length: 30}).map((_, i) => {
  return {
    id: i,
    image: `https://picsum.photos/1440/2842?random=${i}`,
    title: `Blog  ${i + 1}`,
    subtitle: `Lorem ipsum dolor sit amet consectetur. Purus amet cras posuere integer diam arcu justo laoreet purus. Pellentesque turpis hendrerit dis sit. Sodales congue in ${
      i + 1
    }!`,
  };
});

const Slide = memo(function Slide({data}: any) {
  return (
    <View style={styles.slide}>
      <Image source={{uri: data.image}} style={styles.slideImage}></Image>
      <Text style={styles.slideTitle}>{data.title}</Text>
      <Text style={styles.slideSubtitle}>{data.subtitle}</Text>
    </View>
  );
});

function Pagination({index}: any) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {slideList.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

const ImageSlider = () => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  const onScroll = useCallback((event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index1 = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index1);

    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((s: any) => String(s.id), []),
    getItemLayout: useCallback(
      (_: any) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      [],
    ),
  };

  const renderItem = useCallback(function renderItem({item}: any) {
    return <Slide data={item} />;
  }, []);

  return (
    <>
      {/* <FlatList
        data={slideList}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={index}></Pagination> */}
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    height: windowHeight / 3.9,
    width: windowWidth,
    borderRadius: 20,
    top: 9,
    alignItems: 'center',
  },
  slideImage: {
    width: windowWidth * 0.9,
    height: windowHeight / 3.9,
    borderRadius: 18,
  },
  slideTitle: {
    position: 'absolute',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
    left: 35,
    top: 10,
  },
  slideSubtitle: {
    position: 'absolute',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
    bottom: 22,
    width: 303,
  },

  pagination: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  carousel: {flex: 1},
});

export default ImageSlider;
