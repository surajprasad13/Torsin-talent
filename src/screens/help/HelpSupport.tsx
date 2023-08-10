/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//helpers
import {CustomButton, Title} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {TicketList} from '../../redux/actions/userAction';
import HelpCard from './component/HelpCard';

const HelpSupport: FC = ({}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {ticket} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(TicketList(''));
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#f9fbff', flex: 1}}>
      <Title title="Help & Support" />

      <CustomButton
        disabled
        title="Raise a query"
        onPress={() => navigation.navigate('RaiseQuery')}
        style={{marginTop: 10}}
      />

      <FlatList
        contentContainerStyle={{paddingBottom: 20, margin: 10}}
        data={ticket}
        renderItem={({item, index}) => {
          return <HelpCard item={item} key={index.toString()} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default HelpSupport;
