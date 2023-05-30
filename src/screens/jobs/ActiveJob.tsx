import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../hooks';
import ExpertiseCard from '../home/components/ExpertiseCard';

const ActiveJob = () => {
  const {correspond} = useAppSelector(state => state.user);
  const renderItem = ({item, index}) => <ExpertiseCard item={item} />;

  return (
    <SafeAreaView style={{backgroundColor: '#f9fbff'}}>
      <View style={{marginTop: 20}}>
        <FlatList
          style={{}}
          contentContainerStyle={{padding: 10}}
          data={correspond}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActiveJob;
