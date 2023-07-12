import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import AboutUs from '../screens/drawerScreens/AboutUs';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import MyRating from '../screens/rating/MyRating';
import MyService from '../screens/drawerScreens/MyService';
import Payment from '../screens/payment/Payment';
import Terms from '../screens/drawerScreens/Terms';

import BottomNavigation from './BottomNavigator';

import {DrawerScreenParamaList} from './RouteType';
import Notification from '../screens/notification/Notification';
import {fonts} from '../theme';
import ContractNavigator from './ContractNavigator';
import ProposalNavigator from './ProposalNavigator';
import PaymentMethod from '../screens/drawerScreens/PaymentMethod';
import JobNavigator from './JobNavigator';

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
          fontFamily: fonts.regular,
          fontSize: 16,
          color: '#000C14',
        },
      }}>
      <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
      <Drawer.Screen
        name="Notifications"
        component={Notification}
        options={{}}
      />
      <Drawer.Screen
        name="ProposalNavigator"
        component={ProposalNavigator}
        options={{}}
      />
      <Drawer.Screen
        name="JobNavigator"
        component={JobNavigator}
        options={{}}
      />
      <Drawer.Screen name="MyRatings" component={MyRating} options={{}} />
      <Drawer.Screen name="ContractNavigator" component={ContractNavigator} />
      <Drawer.Screen name="PaymentNavigator" component={Payment} options={{}} />
      <Drawer.Screen name="AboutUs" component={AboutUs} options={{}} />
      <Drawer.Screen name="MyServices" component={MyService} options={{}} />
      <Drawer.Screen name="TermsPrivacy" component={Terms} options={{}} />
      <Drawer.Screen name="HelpSupport" component={Terms} options={{}} />
      <Drawer.Screen name="PaymentMethod" component={PaymentMethod} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
