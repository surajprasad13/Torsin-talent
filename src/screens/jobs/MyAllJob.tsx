import React, {useState} from 'react';
import {View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//icons
import Feather from 'react-native-vector-icons/Feather';

//import
import {appstyle, colors, fonts} from '../../theme';
import ActiveJob from './ActiveJob';
import PastJob from './PastJob';
import NewJob from './NewJob';

const jobs = [
  {
    title: 'Active Jobs',
    section: 'active',
    component: (index: number) => <ActiveJob key={index.toString()} />,
  },
  {
    title: 'Past Jobs',
    section: 'past',
    component: (index: number) => <PastJob key={index.toString()} />,
  },
  {
    title: 'New Jobs',
    section: 'new',
    component: (index: number) => <NewJob key={index.toString()} />,
  },
];

const MyAlljob = () => {
  const navigation = useNavigation();
  const [section, setSection] = useState('active');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <View style={{backgroundColor: colors.white, padding: 10}}>
        <Feather
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={20}
          style={{left: 10, padding: 10, position: 'absolute'}}
        />
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontFamily: fonts.regular,
            fontSize: 16,
          }}>
          My Jobs
        </Text>
      </View>
      <View style={styles.topContainer}>
        {jobs.map((item, index) => (
          <Pressable
            key={index.toString()}
            onPress={() => setSection(item.section)}
            style={{
              padding: 8,
              backgroundColor:
                section == item.section ? colors.white : colors.primary,
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: section == item.section ? colors.primary : colors.white,
              }}>
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>

      {jobs
        .filter(item => item.section == section)
        .map((_item, index) => _item.component(index))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  jobText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.primary,
  },
});

export default MyAlljob;
