/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  RefreshControl,
} from 'react-native';

// helpers
import {colors, fonts} from '../../theme';

//icons
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchActiveJobAndContract} from '../../redux/actions/jobAction';
import JobCard from './components/JobCard';

const {height} = Dimensions.get('window');

const ActiveJob: FC = ({}) => {
  const dispatch = useAppDispatch();
  const {jobs, loading} = useAppSelector(state => state.job);

  useEffect(() => {
    dispatch(fetchActiveJobAndContract(''));
  }, []);

  const onRefresh = () => {
    dispatch(fetchActiveJobAndContract(''));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        data={jobs}
        style={{backgroundColor: colors.white}}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              minHeight: height * 0.7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
                    fontSize: 20,
                    color: '#000F1A',
                    textAlign: 'center',
                    marginTop: 10,
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
  emptyImage: {
    width: '70%',
    height: 250,
    resizeMode: 'contain',
  },
});

export default ActiveJob;
