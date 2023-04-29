import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

/**
 * Screens
 */

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import LostPassword from '../screens/auth/forgot/LostPassword';
import VerifyOtp from '../screens/auth/forgot/VerifyOtp';
import ResetPassword from '../screens/auth/forgot/ResetPassword';
import VerifyOtpRegister from '../screens/auth/VerifyOtpRegister';
import Successfull from '../screens/auth/forgot/Successfull';
import WalkthroughScreen from '../screens/WalkthroughScreen';
import ThroughRegister from '../screens/ThroughRegister';
import IndivisualRegister from '../screens/auth/IndivisualRegister';
import BusinessRegister from '../screens/auth/BusinessRegister';
import FirstStepBusinessRegister from '../screens/FirstStepBusinessRegister';
import BusinessPassword from '../screens/auth/BusinessPassword';
import BusinessStart from '../screens/BusinessStart';
import EditProfile from '../screens/EditProfile';
import EditUserProfile from '../screens/EditUserProfile';
import WithoutSignupHome from '../screens/WithoutSignupHome';
import RegisterScreen from '../screens/auth/RegisterScreen';

import Tabs from '../screens/tabScreen/Tabs';
import DrawerNavigation from './DrawerNavigator';

const Stack = createStackNavigator();

export default function Appnavigator({}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnboardingScreen"
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
        }}>
        {/* OnboardingScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LostPassword"
          component={LostPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Successfull"
          component={Successfull}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyOtpRegister"
          component={VerifyOtpRegister}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="WalkthroughScreen"
          component={WalkthroughScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ThroughRegister"
          component={ThroughRegister}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="IndivisualRegister"
          component={IndivisualRegister}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BusinessRegister"
          component={BusinessRegister}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="FirstStepBusinessRegister"
          component={FirstStepBusinessRegister}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BusinessPassword"
          component={BusinessPassword}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BusinessStart"
          component={BusinessStart}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="EditUserProfile"
          component={EditUserProfile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="WithoutSignupHome"
          component={WithoutSignupHome}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
