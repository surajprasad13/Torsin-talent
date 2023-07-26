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
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('FeedDetails')}
            style={styles.container}>
            <FastImage
              source={{uri: 'https://source.unsplash.com/400x400?stone'}}
              resizeMode="cover"
              style={styles.image}
            />
            <View style={{width: '80%'}}>
              <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
                Blog Heading
              </Text>

              <Text style={styles.title}>
                As a musician minim mollit non deseruntAmet minim mollit non
                deserunt .{' '}
              </Text>
              <Divider style={{marginTop: 10}} />
              <Text
                style={{
                  color: '#1E202B',
                  fontSize: 8,
                  marginTop: 10,
                }}>
                5 hour ago
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerView: {
    ...appstyle.shadow,
    margin: 10,
    borderRadius: 12,
  },
  container: {
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ...appstyle.shadow,
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 12,
    marginTop: 5,
  },
  description: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    opacity: 0.6,
    marginTop: 5,
  },
  time: {
    fontFamily: fonts.regular,
    color: 'blue',
    textAlign: 'right',
  },
});

export default Feeds;
