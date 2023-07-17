import React, {FC} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../hooks';

import Accept from './Accept';
import Reject from './Reject';
import MyTabBar from '../../components/MyTabBar';

import ArchiveContract from './ArchiveContract';
import {appstyle} from '../../theme';

const Tab = createMaterialTopTabNavigator();

const Contracts: FC = ({}) => {
  const navigation = useNavigation();

  const {} = useAppSelector(state => state.auth);

  const {} = useAppSelector(state => state.user);

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#f9fbff'}}>
        <View
          style={[
            appstyle.rowBetween,
            {
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#d3d3d3',
            },
          ]}>
          <View style={[appstyle.rowBetween, {flex: 0.6}]}>
            <Feather
              onPress={() => navigation.goBack()}
              name="arrow-left"
              size={20}
            />
            <Text style={{textTransform: 'capitalize', fontSize: 16}}>
              Contracts
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Accepted" component={Accept} />
        <Tab.Screen name="Rejected" component={Reject} />
        <Tab.Screen name="Archived" component={ArchiveContract} />
      </Tab.Navigator>
    </>
  );
};

export default Contracts;
