import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

//icons
import {useAppDispatch, useAppSelector} from '../../hooks';
import JobCard from './components/JobCard';
import {fetchActiveJobAndContract} from '../../redux/actions/jobAction';

const PastJob = ({}) => {
  const {jobs, loading} = useAppSelector(state => state.job);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActiveJobAndContract(''));
  }, []);

  return (
    <View style={{}}>
      <FlatList
        ListEmptyComponent={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {loading && <ActivityIndicator />}
          </View>
        }
        data={jobs.filter(item => item.status == 4)}
        renderItem={({item, index}) => {
          return <JobCard item={item} key={index.toString()} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PastJob;
