import React, {FC, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import notifee from '@notifee/react-native';
import {useFlipper} from '@react-navigation/devtools';

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
import PaymentDetail from '../screens/payment/PaymentDetail';
import ReportProblem from '../screens/jobs/services/ReportProblem';
import ReceivedPayment from '../screens/payment/ReceivedPaymentDetail';
import RatingDetail from '../screens/rating/RatingDetail';
import FeedDetails from '../screens/feeds/FeedDetails';
import ChangePassword from '../screens/auth/ChangePassword';

import Complaints from '../screens/help/Complaints';
import Location from '../screens/common/Location';
import WithoutSignupHome from '../screens/withoutsignupHome/WithoutSignupHome';

import ViewAllTalent from '../screens/withoutsignupHome/ViewAllTalent';
import FliterJobs from '../screens/withoutsignupHome/FliterJobs';
import FilterJobDetail from '../screens/withoutsignupHome/FilterJobDetail';
import Feeds from '../screens/feeds/Feeds';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: FC = () => {
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
      navigationRef?.navigate('ChatUser', {item: {}});
      await notifee.cancelNotification(
        initialNotification.notification.id ?? '',
      );
    }
  };

  useEffect(() => {
    openAppBootStrap();
  }, []);

  useFlipper(navigationRef);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      fallback={
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      }>
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
              name="FeedDetails"
              component={FeedDetails}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />

            <Stack.Screen
              name="Feeds"
              component={Feeds}
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
              name="Complaints"
              component={Complaints}
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
            <Stack.Screen
              name="Location"
              component={Location}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
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
              options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
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
              name="WithoutSignupHome"
              component={WithoutSignupHome}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />

            <Stack.Screen
              name="Feeds"
              component={Feeds}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />

            <Stack.Screen
              name="FeedDetails"
              component={FeedDetails}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />

            <Stack.Screen
              name="ViewAllTalent"
              component={ViewAllTalent}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
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
            <Stack.Screen
              name="Location"
              component={Location}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="FilterJobs"
              component={FliterJobs}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="FilterJobDetail"
              component={FilterJobDetail}
              options={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
