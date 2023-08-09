import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Text,
  RefreshControl,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors, fonts} from '../../theme';
import {useNavigation} from '@react-navigation/native';

//components
import {Title} from '../../components';
import RatingCard from './component/RatingCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getRating} from '../../redux/actions/userAction';
import FastImage from 'react-native-fast-image';

const {height} = Dimensions.get('window');

const MyRating = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {rating, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getRating(''));
  }, []);

  const onRefresh = () => {
    dispatch(getRating(''));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="My Rating" />

      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        data={rating}
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
                <FastImage
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
                  No rating avilable!
                </Text>
              </>
            )}
          </View>
        }
        renderItem={({item, index}) => {
          return <RatingCard item={item} key={index.toString()} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  emptyImage: {
    width: '70%',
    height: 200,
    resizeMode: 'contain',
    marginLeft: '15%',
  },
});

export default MyRating;
