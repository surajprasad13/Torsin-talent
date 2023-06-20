import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

// helpers
import {useAppDispatch, useAppSelector} from '../../hooks';

// components
import ContractStatus from './components/ContractStatus';
import {getContract} from '../../redux/actions/userAction';

const Reject = () => {
  const dispatch = useAppDispatch();
  const {loading, contracts} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getContract(2));
  }, []);

  return (
    <FlatList
      data={contracts.filter(item => item.status == 2)}
      ListEmptyComponent={<View>{loading && <ActivityIndicator />}</View>}
      renderItem={({item, index}) => {
        return <ContractStatus item={item} key={index} />;
      }}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default Reject;
