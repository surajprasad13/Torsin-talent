import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {SettingScreenParamList} from '../../routes/RouteType';

const PortfolioDetail = () => {
  const {params} =
    useRoute<RouteProp<SettingScreenParamList, 'PortfolioDetail'>>();

  console.log(params?.item, params?.type);

  return (
    <View>
      <Text>PortfolioDetail</Text>
    </View>
  );
};

export default PortfolioDetail;
