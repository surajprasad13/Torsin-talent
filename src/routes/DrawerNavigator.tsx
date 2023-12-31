import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerScreenParamaList} from './RouteType';
import {fonts} from '../theme';

import AboutUs from '../screens/drawerScreens/AboutUs';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import MyRating from '../screens/rating/MyRating';
import MyService from '../screens/drawerScreens/MyService';
import Payment from '../screens/payment/Payment';
import Terms from '../screens/drawerScreens/Terms';

import BottomNavigation from './BottomNavigator';

import Notification from '../screens/notification/Notification';
import ContractNavigator from './ContractNavigator';
import ProposalNavigator from './ProposalNavigator';
import PaymentMethod from '../screens/payment/PaymentMethod';
import JobNavigator from './JobNavigator';
import HelpSupport from '../screens/help/HelpSupport';
import Feeds from '../screens/feeds/Feeds';
import ChangePassword from '../screens/auth/ChangePassword';
import HelpDetails from '../screens/help/HelpDetails';
import ChatCard from '../screens/help/ChatCard';

const Drawer = createDrawerNavigator<DrawerScreenParamaList>();

const DrawerNavigation: React.FC = ({}) => {
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
      <Drawer.Screen name="HelpSupport" component={HelpSupport} options={{}} />
      <Drawer.Screen
        name="HelpDetail"
        component={HelpDetails}
        options={{}}
        initialParams={{
          item: {},
        }}
      />
      <Drawer.Screen name="ChatCard" component={ChatCard} />
      <Drawer.Screen name="PaymentMethod" component={PaymentMethod} />
      <Drawer.Screen name="Feeds" component={Feeds} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
