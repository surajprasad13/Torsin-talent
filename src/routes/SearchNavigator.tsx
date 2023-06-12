import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {JobScreenParamList} from './RouteType';
import Jobs from '../screens/jobs/Jobs';
import ActiveJob from '../screens/jobs/ActiveJob';

// screens

const Stack = createStackNavigator<JobScreenParamList>();

const Searchnavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="ActiveJob" component={ActiveJob} />
    </Stack.Navigator>
  );
};

export default Searchnavigator;
