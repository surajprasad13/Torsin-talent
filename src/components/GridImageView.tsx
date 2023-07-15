import React, {useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../theme';
import FastImage from 'react-native-fast-image';

interface GridImageViewProp {
  data: string[];
  visible: boolean;
  onRequestClose: () => void;
}

const {width, height} = Dimensions.get('window');

const GridImageView = ({data, visible, onRequestClose}: GridImageViewProp) => {
  const ref = useRef(null);

  return (
    <View style={{flex: 1, height, width}}>
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={visible}
        onRequestClose={onRequestClose}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            flex: 1,
          }}>
          <SafeAreaView style={{flex: 1}}>
            <TouchableOpacity
              onPress={onRequestClose}
              style={{
                alignSelf: 'flex-end',
                margin: 5,
              }}>
              <Feather name="x" size={25} color={colors.white} />
            </TouchableOpacity>
            <View style={{height: height / 7}} />

            <FlatList
              showsHorizontalScrollIndicator={false}
              ref={ref}
              snapToInterval={width}
              decelerationRate="fast"
              pagingEnabled
              horizontal
              contentContainerStyle={{}}
              data={data}
              renderItem={({item}) => {
                return (
                  <View style={{width, height: height / 2}}>
                    <FastImage
                      source={{
                        uri: item,
                      }}
                      resizeMode="contain"
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </View>
                );
              }}
              keyExtractor={(_, index) => index.toString()}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

export default GridImageView;
