import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import AboutUs from '../screens/drawerScreens/AboutUs';
import Tabs from '../screens/tabScreen/Tabs';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import Proposals from '../screens/drawerScreens/Proposals';
import MyRating from '../screens/drawerScreens/MyRating';
import MyService from '../screens/drawerScreens/MyService';
import MyJobs from '../screens/drawerScreens/MyJobs';
import Payment from '../screens/drawerScreens/Payment';
import SwitchAccount from '../screens/drawerScreens/SwitchAccount';
import Terms from '../screens/drawerScreens/Terms';

const Drawer = createDrawerNavigator();

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
      <Drawer.Screen name="Notifications" component={Tabs} options={{}} />
      <Drawer.Screen name="Proposals" component={Proposals} options={{}} />
      <Drawer.Screen name="My Ratings" component={MyRating} options={{}} />
      <Drawer.Screen name="My Services" component={MyService} options={{}} />
      <Drawer.Screen name="My Jobs" component={MyJobs} options={{}} />
      <Drawer.Screen name="Payments" component={Payment} options={{}} />
      <Drawer.Screen
        name="Switch Account"
        component={SwitchAccount}
        options={{}}
      />
      <Drawer.Screen name="About Us" component={AboutUs} options={{}} />
      <Drawer.Screen name="Terms & Privacy" component={Terms} options={{}} />
      <Drawer.Screen name="Help & Support" component={Terms} options={{}} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
