import React from 'react';
import {} from 'react-native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {ContractsScreenParamList} from './RouteType';

// screens
import Contracts from '../screens/contracts/Contracts';
import ArchiveContract from '../screens/contracts/ArchiveContract';
import ViewContract from '../screens/contracts/ViewContract';

const Stack = createStackNavigator<ContractsScreenParamList>();

const ContractNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Contract"
        component={Contracts}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="ArchiveContract"
        component={ArchiveContract}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="ViewContract"
        component={ViewContract}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialParams={{
          id: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default ContractNavigator;
