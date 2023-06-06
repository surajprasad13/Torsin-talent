import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

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
import Allexpertise from '../screens/home/Allexpertise';
import MusicComposer from '../screens/jobs/JobDetail';
import ProposalSentSuccess from '../screens/proposals/ProposalSentSuccess';
import ChatUser from '../screens/chat/ChatUser';
import Myjob from '../screens/jobs/MyAllJob';
import WebScreen from '../screens/WebScreen';
import DetailActiveJob from '../screens/jobs/DetailActiveJob';
import RatingReview from '../screens/jobs/services/RatingReview';
import ReportProblem from '../screens/jobs/services/ReportProblem';
import DetailPastJob from '../screens/jobs/DetailPastJob';
import DetailNewJob from '../screens/jobs/DetailNewJob';
import AddJobDetails from '../screens/proposals/AddJobDetails';
import ProposalDetail from '../screens/proposals/ProposalDetail';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const {userToken, isFirstOpen} = useAppSelector(state => state.auth);

  const config = {
    screens: {
      LoginScreen: 'login',
      ChatUser: 'chat',
    },
  };

  const linking = {
    prefixes: ['talent://'],
    config,
  };

  return (
    <NavigationContainer linking={linking}>
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
          <Stack.Screen
            name="MusicComposer"
            component={MusicComposer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProposalSentSuccess"
            component={ProposalSentSuccess}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatUser"
            component={ChatUser}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
            initialParams={{
              item: {},
            }}
          />
          <Stack.Screen
            name="Myjob"
            component={Myjob}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailActiveJob"
            component={DetailActiveJob}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RatingReview"
            component={RatingReview}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ReportProblem"
            component={ReportProblem}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailPastJob"
            component={DetailPastJob}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailNewJob"
            component={DetailNewJob}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddJobDetails"
            component={AddJobDetails}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
            initialParams={{
              id: 0,
            }}
          />
          <Stack.Screen
            name="ProposalDetail"
            component={ProposalDetail}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false,
            }}
            initialParams={{item: {}}}
          />

          <Stack.Screen
            name="WebScreen"
            component={WebScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
            initialParams={{item: ''}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
