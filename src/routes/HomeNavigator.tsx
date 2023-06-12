import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import HomeScreen from '../screens/home/HomeScreen';
import {HomeScreenParamList} from './RouteType';
import AllExpertise from '../screens/home/Allexpertise';

const Stack = createStackNavigator<HomeScreenParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AllExpertise" component={AllExpertise} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
