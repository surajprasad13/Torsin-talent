import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import {PaymentScreenParamList} from './RouteType';
import Payment from '../screens/payment/Payment';
import PaymentDetail from '../screens/payment/PaymentDetail';

const Stack = createStackNavigator<PaymentScreenParamList>();

const PaymentNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Payment" component={Payment} options={{}} />
    </Stack.Navigator>
  );
};

export default PaymentNavigator;
