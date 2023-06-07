/* eslint-disable react-hooks/exhaustive-deps */
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
import {useNavigation} from '@react-navigation/native';

//helpers
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
  const navigation = useNavigation();
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

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(getProposalStatus({userToken}));
    });
    return listener;
  }, []);

  useEffect(() => {
    if (section == 'sent') {
      const data = proposalStatus.filter(_item => _item.proposalStatus == 1);
      setFiltered(data);
    }
  }, [proposalStatus]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <Title title="Proposals" />

      <View style={styles.topContainer}>
        {jobs.map((item, index) => (
          <Pressable
            key={index.toString()}
            onPress={() => {
              setSection(item.section);
              if (index == 1) {
                const data = proposalStatus.filter(
                  _item => _item.proposalStatus == 2,
                );
                setFiltered(data);
              } else if (index == 2) {
                const data = proposalStatus.filter(
                  _item => _item.proposalStatus == 3,
                );
                setFiltered(data);
              } else {
                const data = proposalStatus.filter(
                  _item => _item.proposalStatus == 1,
                );
                setFiltered(data);
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
