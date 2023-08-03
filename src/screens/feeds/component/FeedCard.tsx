import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

//helpers
import {fonts, appstyle} from '../../../theme';
import {Feed} from '../../../types/user';
import moment from 'moment';

const FeedCard = ({item}: {item: Feed}) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.feedContainer}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <FastImage
            source={{uri: item.feedPhoto}}
            resizeMode="stretch"
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('FeedDetails', {item})}
            style={styles.container}>
            <View style={{width: '78%'}}>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  color: '#1E202B',
                  left: 10,
                }}>
                {item.feedHeadline}
              </Text>
              <Text style={styles.title}>
                {' '}
                {item?.feedDescription?.length > 50
                  ? item?.feedDescription?.substr(0, 50) + '...'
                  : item?.feedDescription}
              </Text>
              <Divider style={{marginTop: 10, left: 10}} />
              <Text
                style={{
                  color: '#1E202B',
                  fontSize: 8,
                  marginTop: 5,
                  left: 10,
                }}>
                {moment(item.createdAt).format('lll')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12,
    ...appstyle.shadow,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 100,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
  },
  title: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 12,
    marginTop: 5,
    left: 10,
  },
});

export default FeedCard;
