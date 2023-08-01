import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

//helpers
import {Title} from '../../components';
import {colors, fonts, appstyle} from '../../theme';

const Feeds = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Feeds" />
      <ScrollView>
        {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
          <View key={index} style={styles.feedContainer}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <FastImage
                source={{uri: 'https://source.unsplash.com/400x400?stone'}}
                resizeMode="cover"
                style={styles.image}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('FeedDetails')}
                style={styles.container}>
                <View style={{width: '65%'}}>
                  <Text
                    style={{
                      fontFamily: fonts.semibold,
                      color: '#1E202B',
                      left: 10,
                    }}>
                    Blog Heading
                  </Text>
                  <Text style={styles.title}>
                    As a musician minim mollit non deseruntAmet minim mollit non
                    deserunt .{' '}
                  </Text>
                  <Divider style={{marginTop: 10, left: 10}} />
                  <Text
                    style={{
                      color: '#1E202B',
                      fontSize: 8,
                      marginTop: 10,
                      left: 10,
                    }}>
                    5 hour ago
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  title: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 12,
    marginTop: 5,
    left: 10,
  },
});

export default Feeds;
