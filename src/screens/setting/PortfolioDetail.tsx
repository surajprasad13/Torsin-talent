import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {SettingScreenParamList} from '../../routes/RouteType';
import FastImage from 'react-native-fast-image';
import {Title} from '../../components';
import {fonts} from '../../theme';
import Video from 'react-native-video';

const PortfolioDetail = () => {
  const {params} =
    useRoute<RouteProp<SettingScreenParamList, 'PortfolioDetail'>>();

  return (
    <SafeAreaView style={{backgroundColor: '#f9fbff', flex: 1}}>
      <Title title="Portfolio Details" />
      {params?.type == 'image' && (
        <View style={{margin: 10}}>
          <FastImage
            source={{uri: params?.item.photos}}
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
              {params.item.tagUser.join(', ')}
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
              Description
            </Text>
            <Text style={{fontFamily: fonts.regular, margin: 5}}>
              {params.item.description}
            </Text>
          </View>
        </View>
      )}

      {params?.type == 'video' && (
        <View style={{margin: 10}}>
          <Video
            source={{uri: params?.item?.video}}
            style={{
              width: 'auto',
              height: 200,
              borderRadius: 10,
            }}
          />
          <View style={{marginTop: 10}}>
            <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
              Tag People
            </Text>
            <Text style={{fontFamily: fonts.regular, margin: 5}}>
              {params.item.tagUser.join(', ')}
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
              Description
            </Text>
            <Text style={{fontFamily: fonts.regular, margin: 5}}>
              {params.item.description}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PortfolioDetail;
