import React from 'react';
import {} from 'react-native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

// screens
import Proposals from '../screens/proposals/Proposals';
import ProposalDetail from '../screens/proposals/ProposalDetail';

const Stack = createStackNavigator();

const ProposalNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Proposals"
        component={Proposals}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="ProposalDetail"
        component={ProposalDetail}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialParams={{
          item: undefined,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProposalNavigator;
