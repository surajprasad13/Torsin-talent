import React, {FC} from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthScreenParamList} from './RouteType';
import LoginScreen from '../screens/auth/LoginScreen';
import IndivisualRegister from '../screens/auth/IndivisualRegister';
import BusinessRegister from '../screens/auth/BusinessRegister';


const Stack = createStackNavigator<AuthScreenParamList>();

const AuthNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="IndivisualRegister" component={IndivisualRegister} />
      <Stack.Screen name="BusinessRegister" component={BusinessRegister} />
      
    </Stack.Navigator>
  );
};

export default AuthNavigator;
