/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

// helpers
import {colors, fonts} from '../../theme';

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
    <View style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <FlatList
        data={jobs}
        style={{backgroundColor: colors.white}}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Image
                  source={require('../../assets/images/noModule/job.png')}
                  style={styles.emptyImage}
                />
                <Text
                  style={{
                    fontFamily: fonts.semibold,
                    fontSize: 24,
                    color: '#000F1A',
                  }}>
                  No Active Job Yet
                </Text>
              </>
            )}
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

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    flex: 1,
  },
});

export default ActiveJob;
