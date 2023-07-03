import React from 'react';
import {SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//components
import {Title} from '../../components';
import MyTabBar from '../../components/MyTabBar';

// helpers
import {PaymentScreenParamList} from '../../routes/RouteType';
import Pending from './Pending';
import Received from './Received';

const Tab = createMaterialTopTabNavigator<PaymentScreenParamList>();

const Payment = ({}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Payment" />
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Pending" component={Pending} />
        <Tab.Screen name="Received" component={Received} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Payment;
