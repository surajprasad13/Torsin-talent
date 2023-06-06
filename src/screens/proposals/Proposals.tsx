import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {} from '@react-navigation/native';

//icons

//import
import {colors, fonts} from '../../theme';

import ProposalStatus from './components/ProposalStatus';

import {Title} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProposalStatus} from '../../redux/actions/userAction';

const jobs = [
  {
    title: 'Proposed',
    section: 'sent',
  },
  {
    title: 'Accepted',
    section: 'accepted',
  },
  {
    title: 'Rejected',
    section: 'reject',
  },
];

const Proposals = ({route}: any) => {
  const {sectionId} = route.params;

  const dispatch = useAppDispatch();
  const {userToken} = useAppSelector(state => state.auth);
  const {proposalStatus, loading} = useAppSelector(state => state.user);
  const [filtered, setFiltered] = useState(proposalStatus);

  const [section, setSection] = useState('');

  useEffect(() => {
    setSection(sectionId);
  }, [sectionId]);

  useEffect(() => {
    dispatch(getProposalStatus({userToken}));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Proposals" />

      <View style={styles.topContainer}>
        {jobs.map((item, index) => (
          <Pressable
            key={index.toString()}
            onPress={() => {
              setSection(item.section);
              if (item.section == 'accepted') {
                const data = proposalStatus.filter(
                  _item => _item.proposalStatus == 2,
                );
                setFiltered(data);
              } else if (item.section == 'reject') {
                const data = proposalStatus.filter(
                  _item => _item.proposalStatus == 3,
                );
                setFiltered(data);
              } else {
                setFiltered(proposalStatus);
              }
            }}
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

      <FlatList
        data={filtered}
        ListEmptyComponent={<View>{loading && <ActivityIndicator />}</View>}
        renderItem={({item, index}) => {
          return <ProposalStatus item={item} key={index} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
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
