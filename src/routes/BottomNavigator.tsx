import React from 'react';
import {} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/bottomScreen/HomeScreen';
import Jobs from '../screens/bottomScreen/Jobs';
import Chat from '../screens/bottomScreen/Chat';
import Setting from '../screens/setting/Setting';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../theme';
import {createStackNavigator} from '@react-navigation/stack';
import EditProfile from '../screens/setting/EditProfile';
import EditUserProfile from '../screens/setting/EditUserProfile';

const Bottom = createBottomTabNavigator();
const Stack = createStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
    </Stack.Navigator>
  );
};

const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.light,
      }}>
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        name="Jobs"
        component={Jobs}
        options={{
          headerShown: false,
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
        name="SettingStack"
        component={SettingStack}
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
