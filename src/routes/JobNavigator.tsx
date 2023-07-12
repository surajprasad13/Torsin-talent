import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

//helpers
import {JobScreenParamList} from './RouteType';

// screens
import Jobs from '../screens/jobs/Jobs';
import JobDetails from '../screens/jobs/JobDetail';
import AddJobDetails from '../screens/proposals/AddJobDetails';
import MyAlljob from '../screens/jobs/MyAllJob';
import ActiveJobDetail from '../screens/jobs/ActiveJobDetail';
import PastJobDetail from '../screens/jobs/DetailPastJob';
import RatingReview from '../screens/jobs/services/RatingReview';
import ReportProblem from '../screens/jobs/services/ReportProblem';

const Stack = createStackNavigator<JobScreenParamList>();

const JobNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="MyAllJobs" component={MyAlljob} />
      <Stack.Screen name="JobDetail" component={JobDetails} />
      <Stack.Screen name="AddJobDetails" component={AddJobDetails} />
      <Stack.Screen name="ActiveJobDetail" component={ActiveJobDetail} />
      <Stack.Screen name="PastJobDetail" component={PastJobDetail} />
      <Stack.Screen name="RatingReview" component={RatingReview} />
      <Stack.Screen name="ReportProblem" component={ReportProblem} />
    </Stack.Navigator>
  );
};

export default JobNavigator;
