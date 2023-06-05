import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import {} from '@react-navigation/native';

//icons

//import
import {colors, fonts} from '../../theme';
import ProposalAccept from './ProposalAccept';
import ProposalSent from './ProposalSent';
import ProposalsReject from './ProposalsReject';
import {Title} from '../../components';

const jobs = [
  {
    title: 'Sent',
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

const Proposals = ({route}: any) => {
  const {sectionId} = route.params;

  const [section, setSection] = useState('');

  useEffect(() => {
    setSection(sectionId);
  }, [sectionId]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Proposals" />

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
