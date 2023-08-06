import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

//helpers
import {Title} from '../../components';
import {colors, fonts, appstyle} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFeedList} from '../../redux/actions/userAction';
import FeedCard from './component/FeedCard';

const {height} = Dimensions.get('window');

const Feeds = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {feed, loading} = useAppSelector(state => state.user);

  const mainFeed = feed?.filter(item => item?.isMain);

  const otherFeed = feed?.filter(item => item?.isMain == false);

  useEffect(() => {
    dispatch(getFeedList(''));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Feeds" />
      {mainFeed?.length > 0 &&
        mainFeed?.map((item, index) => (
          <FastImage
            source={{uri: item?.feedPhoto}}
            resizeMode="cover"
            style={{
              width: 'auto',
              height: 150,
              margin: 10,
              borderRadius: 10,
            }}
          />
        ))}
      <FlatList
        data={otherFeed}
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
                  No Blogs / News!
                </Text>
              </>
            )}
          </View>
        }
        renderItem={({item, index}) => {
          return (
            <View>
              <FeedCard item={item} key={index.toString()} />
            </View>
          );
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

export default Feeds;
