import React, {useEffect} from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import notifee from '@notifee/react-native';

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
import IndivisualRegister from '../screens/auth/IndivisualRegister';
import BusinessRegister from '../screens/auth/BusinessRegister';

import DrawerNavigation from './DrawerNavigator';

import CreatePassword from '../screens/auth/CreatePassword';
import ChatUser from '../screens/chat/ChatUser';
import WebScreen from '../screens/common/WebScreen';
import RatingReview from '../screens/jobs/services/RatingReview';

import {navigationRef} from './RootNavigation';

// helpers
import {RootStackParamList} from './RouteType';
import {useAppSelector} from '../hooks';
import ThroughRegister from '../screens/ThroughRegister';
import PdfScreen from '../screens/chat/PdfScreen';
import PaymentDetail from '../screens/payment/PendingPaymentDetail';
import ReportProblem from '../screens/jobs/services/ReportProblem';
import ReceivedPayment from '../screens/payment/ReceivedPaymentDetail';
import RatingDetail from '../screens/rating/RatingDetail';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const {userToken, isFirstOpen} = useAppSelector(state => state.auth);

  const config = {
    screens: {
      LoginScreen: 'login',
      ChatUser: 'chatuser',
    },
  };

  const linking = {
    prefixes: ['talent://'],
    config,
  };

  const openAppBootStrap = async () => {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification) {
      console.log('Initial Notification');
      // this.handleNotificationOpen(initialNotification.notification);
      navigationRef?.navigate('ChatUser', {item: {}});
      await notifee.cancelNotification(
        initialNotification.notification.id ?? '',
      );
    }
  };

  useEffect(() => {
    openAppBootStrap();
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{}}
        initialRouteName={isFirstOpen ? 'OnboardingScreen' : 'LoginScreen'}>
        {userToken ? (
          <Stack.Group>
            <Stack.Screen
              name="DrawerNavigation"
              component={DrawerNavigation}
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
              name="PdfScreen"
              component={PdfScreen}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="PaymentDetail"
              component={PaymentDetail}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="ReceivePayment"
              component={ReceivedPayment}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Rating"
              component={RatingReview}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="RatingDetail"
              component={RatingDetail}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Report"
              component={ReportProblem}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
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
        ) : (
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
              initialParams={{
                email: '',
              }}
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
              name="ThroughRegister"
              component={ThroughRegister}
              options={{headerShown: false}}
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
              name="WebScreen"
              component={WebScreen}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
              initialParams={{item: ''}}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
