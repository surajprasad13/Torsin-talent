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
import {fetchPastJobAndContract} from '../../redux/actions/jobAction';
import {colors, fonts} from '../../theme';
import PastJobCard from './components/PastJobCard';

const {height} = Dimensions.get('window');

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
            style={{
              flex: 1,
              minHeight: height * 0.7,
              justifyContent: 'center',
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
                  No Past Job
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
  emptyImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
});

export default PastJob;
