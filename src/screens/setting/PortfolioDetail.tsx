import React, {FC, useRef} from 'react';
import {View, Text, SafeAreaView, Dimensions, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

// helpers
import {Title} from '../../components';
import {fonts} from '../../theme';
import {SettingScreenParamList} from '../../routes/RouteType';

const {width} = Dimensions.get('window');

const PortfolioDetail: FC = ({}) => {
  const ref = useRef<FlatList>(null);

  const {params} =
    useRoute<RouteProp<SettingScreenParamList, 'PortfolioDetail'>>();

  return (
    <SafeAreaView style={{backgroundColor: '#f9fbff', flex: 1}}>
      <Title title="Portfolio Details" />
      <FlatList
        ref={ref}
        data={
          params.type == 'image' ? params.item?.photos : params.item?.videos
        }
        horizontal
        pagingEnabled
        initialScrollIndex={params.activeIndex}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          if (params.type == 'image') {
            return (
              <View style={{width}} key={index}>
                <View style={{margin: 10}}>
                  <FastImage
                    source={{uri: item.photos}}
                    resizeMode="cover"
                    style={{
                      width: 'auto',
                      height: 300,
                      borderRadius: 10,
                    }}
                  />
                  <View style={{marginTop: 10}}>
                    <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                      Tag People
                    </Text>
                    <Text style={{fontFamily: fonts.regular, margin: 5}}>
                      {item.tagUser.join(', ')}
                    </Text>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                      Description
                    </Text>
                    <Text style={{fontFamily: fonts.regular, margin: 5}}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            );
          } else {
            return (
              <View style={{width}}>
                <View style={{margin: 10}}>
                  <Video
                    source={{uri: item?.video}}
                    controls
                    paused
                    style={{
                      width: 'auto',
                      height: 200,
                      borderRadius: 20,
                    }}
                  />
                  <View style={{marginTop: 10}}>
                    <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                      Tag People
                    </Text>
                    <Text style={{fontFamily: fonts.regular, margin: 5}}>
                      {item.tagUser.join(', ')}
                    </Text>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                      Description
                    </Text>

                    <Text style={{fontFamily: fonts.regular, margin: 5}}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default PortfolioDetail;
