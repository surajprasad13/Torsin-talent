import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//icons
import Feather from 'react-native-vector-icons/Feather';

//import
import {colors, fonts} from '../../theme';
import ActiveJob from './ActiveJob';
import PastJob from './PastJob';
import NewJob from './NewJob';
import MyTabBar from '../../components/MyTabBar';

const Tab = createMaterialTopTabNavigator();

const MyAlljob = ({}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <View style={{backgroundColor: colors.white, padding: 10}}>
        <Feather
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={20}
          style={{left: 10, padding: 10, position: 'absolute'}}
        />
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontFamily: fonts.regular,
            fontSize: 16,
          }}>
          My Jobs
        </Text>
      </View>

      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Active" component={ActiveJob} />
        <Tab.Screen name="Past" component={PastJob} />
        <Tab.Screen name="New" component={NewJob} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MyAlljob;
