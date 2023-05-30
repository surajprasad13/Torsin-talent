import {View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

//icons
import Feather from 'react-native-vector-icons/Feather';

//import
import {appstyle, colors, fonts} from '../../theme';
import ActiveJob from './ActiveJob';
import PastJob from './PastJob';
import NewJob from './NewJob';

const Myjob = () => {
  const navigation = useNavigation();
  const [section, setSection] = useState('basic');
  const withBorder = {
    color: colors.primary,
    backgroundColor: colors.white,
    fontSize: 15,
    padding: 8,
  };
  const withoutBorder = {
    color: colors.white,
    fontSize: 15,
    fontFamily: fonts.regular,
    padding: 8,
  };
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: colors.primary,
        }}>
        <Pressable onPress={() => setSection('active')}>
          <Text
            style={[
              styles.jobText,
              section == 'active' ? withBorder : withoutBorder,
            ]}>
            Active Jobs
          </Text>
        </Pressable>

        <Pressable onPress={() => setSection('past')}>
          <Text
            style={[
              styles.jobText,
              section == 'past' ? withBorder : withoutBorder,
            ]}>
            Past Jobs
          </Text>
        </Pressable>

        <Pressable onPress={() => setSection('new')}>
          <Text
            style={[
              styles.jobText,
              section == 'new' ? withBorder : withoutBorder,
            ]}>
            New Jobs
          </Text>
        </Pressable>
      </View>
      <View>{section == 'active' ? <ActiveJob /> : null}</View>
      <View>{section == 'past' ? <PastJob /> : null}</View>
      <View>{section == 'new' ? <NewJob /> : null}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  jobText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
});

export default Myjob;

//{section == "basic" ? < BasicView /> : null}
