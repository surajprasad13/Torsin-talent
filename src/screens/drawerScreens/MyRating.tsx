import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';

//components
import {Title} from '../../components';
import RatingCard from '../rating/component/RatingCard';

const MyRating = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="My Ratings & Reviews" />
      <ScrollView style={{}}>
        {[0, 1, 2, 3, 4, 5].map((item: any, index: number) => (
          <RatingCard />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default MyRating;
