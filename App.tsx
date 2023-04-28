import 'react-native-gesture-handler';
import React, { useEffect } from "react";

import SplashScreen from 'react-native-splash-screen'
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import WalkthroughScreen from "./Screen/WalkthroughScreen";
import LostPassword from './Screen/Forgot/LostPassword';
import VerifyOtp from './Screen/Forgot/VerifyOtp';
import ResetPassword from './Screen/Forgot/ResetPassword';
import Successfull from './Screen/Forgot/Successfull';
import VerifyOtpRegister from './Screen/VerifyOtpRegister';
import Tabs from './Screen/tabScreen/Tabs';
// import { NotificationServices, requestUserPermission } from './Screen/utils/PushNotifications';
// import ForegroundHandler from './Screen/utils/ForegroundHandler';
import ThroughRegister from './Screen/ThroughRegister';
import OnboardingScreen from './Screen/Components/OnboardingScreen';
import IndivisualRegister from './Screen/IndivisualRegister';
import BusinessRegister from './Screen/BusinessRegister';
import FirstStepBusinessRegister from './Screen/FirstStepBusinessRegister';
import BusinessPassword from './Screen/BusinessPassword';
import BusinessStart from './Screen/BusinessStart';
import DrawerNavigation from './Screen/Components/drawer/DrawerNavigation';
import EditProfile from './Screen/EditProfile';
import EditUserProfile from './Screen/EditUserProfile';
import WithoutSignupHome from './Screen/WithoutSignupHome';

const Stack = createStackNavigator();

const App = () => {

  // useEffect(() => {
  //   SplashScreen.hide();
  //   setTimeout(() => {

  //   }, 5000)
  // }, []);

  // useEffect(() => {
  //   requestUserPermission();
  //   NotificationServices()
  // }, [])

  return (
   <>
   {/* <ForegroundHandler /> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnboardingScreen"
          screenOptions={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0
            },
          }}
        >
          {/* OnboardingScreen which will come once for 5 Seconds */}
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            // Hiding header for Splash Screen
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LostPassword"
            component={LostPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerifyOtp"
            component={VerifyOtp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Successfull"
            component={Successfull}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerifyOtpRegister"
            component={VerifyOtpRegister}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="WalkthroughScreen"
            component={WalkthroughScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ThroughRegister"
            component={ThroughRegister}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="IndivisualRegister"
            component={IndivisualRegister}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="BusinessRegister"
            component={BusinessRegister}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="FirstStepBusinessRegister"
            component={FirstStepBusinessRegister}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="BusinessPassword"
            component={BusinessPassword}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="BusinessStart"
            component={BusinessStart}
            options={{ headerShown: false }}
          />


          <Stack.Screen
            name="DrawerNavigation"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='EditUserProfile'
            component={EditUserProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='WithoutSignupHome'
            component={WithoutSignupHome}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
   </>
  )
};

export default App;