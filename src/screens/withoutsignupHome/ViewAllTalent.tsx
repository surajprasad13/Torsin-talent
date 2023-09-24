import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';

//helpers
import {Title} from '../../components';
import HomeCard from './component/HomeCard';

const ViewAllTalent = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Top recmonded job" />
      <ScrollView>
        <HomeCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewAllTalent;
