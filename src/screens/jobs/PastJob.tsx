import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

//icons
import {useAppDispatch, useAppSelector} from '../../hooks';
import JobCard from './components/JobCard';
import {fetchPastJobAndContract} from '../../redux/actions/jobAction';
import {colors} from '../../theme';
import PastJobCard from './components/PastJobCard';

const PastJob = ({}) => {
  const {pastjob, loading} = useAppSelector(state => state.job);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPastJobAndContract(''));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <FlatList
        data={pastjob}
        style={{backgroundColor: colors.white}}
        ListEmptyComponent={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {loading && <ActivityIndicator />}
          </View>
        }
        renderItem={({item}) => {
          return <PastJobCard item={item} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PastJob;
