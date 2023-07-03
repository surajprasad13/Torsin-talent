import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProposalStatus} from '../../redux/actions/userAction';
import ProposalStatus from './components/ProposalStatus';

const Accepted = () => {
  const dispatch = useAppDispatch();
  const {proposalStatus, loading} = useAppSelector(state => state.user);
  const [filtered, setFiltered] = useState(proposalStatus);

  useEffect(() => {
    dispatch(getProposalStatus(''));
  }, []);

  return (
    <View>
      <FlatList
        ListEmptyComponent={<View>{loading && <ActivityIndicator />}</View>}
        data={filtered.filter(_item => _item.proposalStatus == 2)}
        renderItem={({item, index}) => {
          return <ProposalStatus item={item} key={index} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default Accepted;
