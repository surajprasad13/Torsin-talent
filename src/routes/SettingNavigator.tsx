import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingScreenParamList} from './RouteType';

// screens
import Setting from '../screens/setting/Setting';
import AddService from '../screens/setting/AddService';
import AddSkill from '../screens/setting/AddSkill';
import EditProfile from '../screens/setting/EditProfile';
import EditUserProfile from '../screens/setting/EditUserProfile';
import ServiceSkill from '../screens/setting/ServiceSkill';
import ServiceDetail from '../screens/setting/ServiceDetail';
import AddPortfolio from '../screens/setting/AddPortfolio';
import OpenCamera from '../components/OpenImage';

const Stack = createStackNavigator<SettingScreenParamList>();

const SettingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="AddSkill" component={AddSkill} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
      <Stack.Screen name="ServiceSkill" component={ServiceSkill} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      <Stack.Screen name="AddPortfolio" component={AddPortfolio} />
      <Stack.Screen name="OpenCamera" component={OpenCamera} />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
