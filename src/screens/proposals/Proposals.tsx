/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// components
import {Title} from '../../components';
import Proposed from './Proposed';
import Rejected from './Rejected';
import Accepted from './Accepted';

//helpers
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProposalStatus} from '../../redux/actions/userAction';
import MyTabBar from '../../components/MyTabBar';

const Tab = createMaterialTopTabNavigator();

const Proposals: FC = ({}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.auth);
  const {} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getProposalStatus());
  }, []);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(getProposalStatus());
    });
    return () => listener;
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Proposals" />

      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Proposed" component={Proposed} />
        <Tab.Screen name="Accepted" component={Accepted} />
        <Tab.Screen name="Rejected" component={Rejected} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Proposals;
