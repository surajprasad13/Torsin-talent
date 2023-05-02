import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import AboutUs from '../screens/drawerScreens/AboutUs';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import Proposals from '../screens/drawerScreens/Proposals';
import MyRating from '../screens/drawerScreens/MyRating';
import MyService from '../screens/drawerScreens/MyService';
import MyJobs from '../screens/drawerScreens/MyJobs';
import Payment from '../screens/drawerScreens/Payment';
import SwitchAccount from '../screens/drawerScreens/SwitchAccount';
import Terms from '../screens/drawerScreens/Terms';

import BottomNavigation from './BottomNavigator';

import {DrawerScreenParamaList} from './RouteType';
import Notification from '../screens/Notification';

const Drawer = createDrawerNavigator<DrawerScreenParamaList>();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomSidebarMenu {...props} />}
      screenOptions={{
        drawerItemStyle: {
          borderRadius: 0,
          marginVertical: 7,
          borderBottomWidth: 0.5,
          borderBottomColor: '#d3d3d3',
        },
        drawerType: 'front',
        headerShown: false,
        drawerActiveBackgroundColor: '#ffffff',
        drawerActiveTintColor: '#000C14',

        drawerLabelStyle: {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: 16,
          lineHeight: 24,
          color: '#000C14',
        },
      }}>
      <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
      <Drawer.Screen
        name="Notifications"
        component={Notification}
        options={{}}
      />
      <Drawer.Screen name="Proposals" component={Proposals} options={{}} />
      <Drawer.Screen name="MyRatings" component={MyRating} options={{}} />
      <Drawer.Screen name="MyServices" component={MyService} options={{}} />
      <Drawer.Screen name="MyJobs" component={MyJobs} options={{}} />
      <Drawer.Screen name="Payments" component={Payment} options={{}} />
      <Drawer.Screen
        name="SwitchAccount"
        component={SwitchAccount}
        options={{}}
      />
      <Drawer.Screen name="AboutUs" component={AboutUs} options={{}} />
      <Drawer.Screen name="TermsPrivacy" component={Terms} options={{}} />
      <Drawer.Screen name="HelpSupport" component={Terms} options={{}} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
