import {View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProposalStatus} from '../../redux/actions/userAction';
import ProposalStatus from './components/ProposalStatus';

const Rejected = () => {
  const {proposalStatus, loading} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [filtered, setFiltered] = useState(proposalStatus);

  useEffect(() => {
    dispatch(getProposalStatus(''));
  }, []);

  return (
    <View>
      <FlatList
        ListEmptyComponent={<View>{loading && <ActivityIndicator />}</View>}
        data={proposalStatus.filter(_item => _item.proposalStatus == 3)}
        renderItem={({item, index}) => {
          return <ProposalStatus item={item} key={index.toString()} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default Rejected;
