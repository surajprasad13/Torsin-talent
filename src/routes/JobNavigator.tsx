import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {JobScreenParamList} from './RouteType';
import Jobs from '../screens/jobs/Jobs';
import JobDetails from '../screens/jobs/JobDetail';
import AddJobDetails from '../screens/proposals/AddJobDetails';
// screens

const Stack = createStackNavigator<JobScreenParamList>();

const JobNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="JobDetail" component={JobDetails} />
      <Stack.Screen name="AddJobDetails" component={AddJobDetails} />
    </Stack.Navigator>
  );
};

export default JobNavigator;
