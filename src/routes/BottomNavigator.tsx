import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

// helpers
import {colors} from '../theme';

// screens
import Chat from '../screens/chat/Chat';

import {BottomScreenParamList} from './RouteType';
import SettingNavigator from './SettingNavigator';
import JobNavigator from './JobNavigator';
import HomeNavigator from './HomeNavigator';

const Bottom = createBottomTabNavigator<BottomScreenParamList>();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.light,
        tabBarHideOnKeyboard: true,
      }}>
      <Bottom.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({size, color}) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        name="JobNavigator"
        component={JobNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Jobs',
          tabBarIcon: ({size, color}) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarLabel: 'Chats',
          tabBarIcon: ({size, color}) => (
            <IonIcon
              name="chatbubble-ellipses-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="SettingNavigator"
        component={SettingNavigator}
        options={{
          tabBarLabel: 'Setting',
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
