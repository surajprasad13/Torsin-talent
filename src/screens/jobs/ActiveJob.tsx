/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

// helpers
import {colors} from '../../theme';

//icons
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchActiveJobAndContract} from '../../redux/actions/jobAction';
import JobCard from './components/JobCard';

const ActiveJob = ({}) => {
  const dispatch = useAppDispatch();
  const {jobs, loading} = useAppSelector(state => state.job);

  useEffect(() => {
    dispatch(fetchActiveJobAndContract(''));
  }, []);

  return (
    <View>
      <FlatList
        data={jobs}
        style={{backgroundColor: colors.white}}
        ListEmptyComponent={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {loading && <ActivityIndicator />}
          </View>
        }
        renderItem={({item}) => {
          return <JobCard item={item} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default ActiveJob;
