import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  Dimensions,
} from 'react-native';

//icons
import {useAppDispatch, useAppSelector} from '../../hooks';
import JobCard from './components/JobCard';
import {fetchNewJobAndContract} from '../../redux/actions/jobAction';
import {colors, fonts} from '../../theme';
import PastJobCard from './components/PastJobCard';

const {height} = Dimensions.get('window');

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
                <Text style={styles.text}>No New Job</Text>
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
    minHeight: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: '70%',
    height: 250,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: '#000F1A',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default NewJob;
