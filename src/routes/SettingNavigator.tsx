import React, {FC} from 'react';
import {} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
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
import OpenImage from '../screens/common/OpenImage';
import PortfolioDetail from '../screens/setting/PortfolioDetail';

const Stack = createStackNavigator<SettingScreenParamList>();

const SettingNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="AddService"
        component={AddService}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="AddSkill"
        component={AddSkill}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="EditUserProfile"
        component={EditUserProfile}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="ServiceSkill"
        component={ServiceSkill}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="AddPortfolio"
        component={AddPortfolio}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="OpenImage"
        component={OpenImage}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="PortfolioDetail"
        component={PortfolioDetail}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
