import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {JobScreenParamList} from './RouteType';
import Jobs from '../screens/jobs/Jobs';
import JobDetails from '../screens/jobs/JobDetail';
import AddJobDetails from '../screens/proposals/AddJobDetails';
import MyAlljob from '../screens/jobs/MyAllJob';
import ActiveJobDetail from '../screens/jobs/ActiveJobDetail';
// screens

const Stack = createStackNavigator<JobScreenParamList>();

const JobNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="MyAllJobs" component={MyAlljob} />
      <Stack.Screen name="JobDetail" component={JobDetails} />
      <Stack.Screen name="AddJobDetails" component={AddJobDetails} />
      <Stack.Screen name="ActiveJobDetail" component={ActiveJobDetail} />
    </Stack.Navigator>
  );
};

export default JobNavigator;
