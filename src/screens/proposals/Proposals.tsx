import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//icons
import Feather from 'react-native-vector-icons/Feather';

//import
import {appstyle, colors, fonts} from '../../theme';
import ProposalAccept from './ProposalAccept';
import ProposalSent from './ProposalSent';
import ProposalsReject from './ProposalsReject';

const jobs = [
  {
    title: 'Proposed',
    section: 'sent',
    component: (index: number) => <ProposalSent key={index.toString()} />,
  },
  {
    title: 'Accepted',
    section: 'accepted',
    component: (index: number) => <ProposalAccept key={index.toString()} />,
  },

  {
    title: 'Rejected',
    section: 'reject',
    component: (index: number) => <ProposalsReject key={index.toString()} />,
  },
];

const Proposals = ({route}) => {
  const {sectionId} = route.params;
  const navigation = useNavigation();
  const [section, setSection] = useState('');

  useEffect(() => {
    setSection(sectionId);
  }, [sectionId]);

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
          Proposals
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
              width: 100,
            }}>
            <Text
              style={{
                fontFamily:
                  section == item.section ? fonts.bold : fonts.regular,
                textAlign: 'center',
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

export default Proposals;
