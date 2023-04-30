import React from 'react';
import {} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/bottomScreen/HomeScreen';
import Jobs from '../screens/bottomScreen/Jobs';
import Chat from '../screens/bottomScreen/Chat';
import Setting from '../screens/bottomScreen/Setting';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator screenOptions={{}}>
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Bottom.Screen
        name="Jobs"
        component={Jobs}
        options={{headerShown: false}}
      />
      <Bottom.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Bottom.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
