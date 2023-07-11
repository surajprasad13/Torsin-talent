import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../theme';
import {useNavigation} from '@react-navigation/native';

//components
import {Title} from '../../components';
import RatingCard from './component/RatingCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getRating} from '../../redux/actions/userAction';

const MyRating = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {rating, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getRating(''));
  }, []);

  console.log(rating);

  return (
    <SafeAreaView style={styles.container}>
      <Title title="My Rating" />

      <FlatList
        data={rating}
        ListEmptyComponent={<View>{loading && <ActivityIndicator />}</View>}
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
});

export default MyRating;
