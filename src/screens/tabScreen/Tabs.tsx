import React from 'react';
import {Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';

import Jobs from './Jobs';
import Chat from './Chat';
import Setting from './Setting';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/images/tabImage/Home_light.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#14226D' : '#66636C',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/images/tabImage/Search.png')}
              resizeMode="contain"
              style={{
                tintColor: focused ? '#14226D' : '#66636C',
                width: 25,
                height: 25,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/images/tabImage/chat.png')}
              resizeMode="contain"
              style={{
                tintColor: focused ? '#14226D' : '#66636C',
                width: 25,
                height: 25,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/images/tabImage/User_light.png')}
              resizeMode="contain"
              style={{
                tintColor: focused ? '#14226D' : '#66636C',
                width: 25,
                height: 25,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
