import React from 'react';
import {SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//icons

//import
import ActiveJob from './ActiveJob';
import PastJob from './PastJob';
import NewJob from './NewJob';
import MyTabBar from '../../components/MyTabBar';
import {Title} from '../../components';

const Tab = createMaterialTopTabNavigator();

const MyAlljob = ({}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="My Jobs" />

      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Active" component={ActiveJob} />
        <Tab.Screen name="Past" component={PastJob} />
        <Tab.Screen name="New" component={NewJob} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MyAlljob;
