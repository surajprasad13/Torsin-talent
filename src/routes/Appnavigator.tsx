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
import BusinessStart from '../screens/BusinessStart';
import WithoutSignupHome from '../screens/WithoutSignupHome';

import DrawerNavigation from './DrawerNavigator';
import {RootStackParamList} from './RouteType';

import {useAppSelector} from '../hooks';
import CreatePassword from '../screens/auth/CreatePassword';
import SearchJob from '../screens/jobs/components/SearchJob';
import MusicJob from '../screens/jobs/components/MusicJob';
import OpenModal from '../screens/jobs/components/OpenModal';
import ExpertiseCard from '../screens/home/components/ExpertiseCard';
import Allexpertise from '../screens/home/Allexpertise';

const Stack = createStackNavigator<RootStackParamList>();

export default function Appnavigator({}) {
  const {userToken, isFirstOpen} = useAppSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{}}
        initialRouteName={
          userToken
            ? 'DrawerNavigation'
            : isFirstOpen
            ? 'OnboardingScreen'
            : 'LoginScreen'
        }>
        <Stack.Group>
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
        </Stack.Group>

        <Stack.Group>
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

          {/*  */}
          <Stack.Screen
            name="CreatePassword"
            component={CreatePassword}
            initialParams={{item: ''}}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="BusinessRegister"
            component={BusinessRegister}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="BusinessStart"
            component={BusinessStart}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="WithoutSignupHome"
            component={WithoutSignupHome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DrawerNavigation"
            component={DrawerNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchJob"
            component={SearchJob}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MusicJob"
            component={MusicJob}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OpenModal"
            component={OpenModal}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Allexpertise"
            component={Allexpertise}
            options={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
