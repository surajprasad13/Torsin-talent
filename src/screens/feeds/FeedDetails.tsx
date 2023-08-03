import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import FastImage from 'react-native-fast-image';

//helpers
import {Title} from '../../components';
import {colors, fonts} from '../../theme';
import {Feed} from '../../types/user';

const FeedDetails = ({route}: any) => {
  const {item}: {item: Feed} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Title title="View Blogs / News" />
      <ScrollView>
        <View style={styles.innerContainer}>
          <FastImage
            source={{uri: item.feedPhoto}}
            resizeMode="cover"
            style={styles.image}
          />
          <View style={{marginTop: 20, width: '90%'}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: fonts.semibold,
                color: colors.grey,
              }}>
              {item.feedHeadline}
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 16,
                color: colors.grey,
                width: 'auto',
                marginTop: 10,
              }}>
              {item.feedDescription}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  innerContainer: {
    margin: 10,
    justifyContent: 'center',
  },
});

export default FeedDetails;
