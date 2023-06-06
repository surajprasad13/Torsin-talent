import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {colors} from '../theme';

// screens
import HomeScreen from '../screens/home/HomeScreen';
import Jobs from '../screens/jobs/Jobs';
import Chat from '../screens/chat/Chat';
import Setting from '../screens/setting/Setting';
import EditProfile from '../screens/setting/EditProfile';
import EditUserProfile from '../screens/setting/EditUserProfile';
import AddService from '../screens/setting/AddService';
import AddSkill from '../screens/setting/AddSkill';

import {BottomScreenParamList, SettingScreenParamList} from './RouteType';
import ServiceSkill from '../screens/setting/ServiceSkill';
import ServiceDetail from '../screens/setting/ServiceDetail';
import {useNavigation} from '@react-navigation/native';

const Bottom = createBottomTabNavigator<BottomScreenParamList>();
const Stack = createStackNavigator<SettingScreenParamList>();

export const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="AddSkill" component={AddSkill} />
      <Stack.Screen name="ServiceSkill" component={ServiceSkill} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
    </Stack.Navigator>
  );
};

const BottomNavigator = () => {
  const navigation = useNavigation();
  return (
    <Bottom.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.light,
        tabBarHideOnKeyboard: true,
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
          headerShown: true,
          tabBarIcon: ({size, color}) => (
            <IonIcon
              name="chatbubble-ellipses-outline"
              size={size}
              color={color}
            />
          ),
          headerRight: ({color}) => (
            <AntDesign
              name="search1"
              size={20}
              style={{right: 10}}
              color={colors.primary}
            />
          ),
          headerLeft: ({color}) => (
            <Feather
              onPress={() => navigation.goBack()}
              name="arrow-left"
              size={20}
              color={colors.black}
              style={{left: 10}}
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
