import React from 'react';
import {} from 'react-native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

// screens
import HomeScreen from '../screens/home/HomeScreen';
import {HomeScreenParamList} from './RouteType';
import AllExpertise from '../screens/home/Allexpertise';
import ProposalSentSuccess from '../screens/proposals/ProposalSentSuccess';
import JobDetails from '../screens/jobs/JobDetail';
import AddJobDetails from '../screens/proposals/AddJobDetails';

const Stack = createStackNavigator<HomeScreenParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="AllExpertise"
        component={AllExpertise}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetails}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="AddJobDetails"
        component={AddJobDetails}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialParams={{
          item: undefined,
        }}
      />
      <Stack.Screen
        name="ProposalSentSuccess"
        component={ProposalSentSuccess}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
