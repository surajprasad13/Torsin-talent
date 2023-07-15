import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';

//icons
import {useAppDispatch, useAppSelector} from '../../hooks';
import JobCard from './components/JobCard';
import {fetchNewJobAndContract} from '../../redux/actions/jobAction';
import {colors, fonts} from '../../theme';
import PastJobCard from './components/PastJobCard';

const NewJob = ({}) => {
  const {newjob, loading} = useAppSelector(state => state.job);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNewJobAndContract(''));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <FlatList
        data={newjob}
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
                  No New Job
                </Text>
              </>
            )}
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

export default NewJob;
