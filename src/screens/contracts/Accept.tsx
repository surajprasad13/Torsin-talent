import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

// components
import ContractStatus from './components/ContractStatus';

// helpers
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getContract} from '../../redux/actions/userAction';

const Accept = () => {
  const dispatch = useAppDispatch();
  const {loading, contracts} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getContract(1));
  }, []);

  console.log(contracts);

  return (
    <FlatList
      data={contracts.filter(item => item.status == 1)}
      ListEmptyComponent={<View>{loading && <ActivityIndicator />}</View>}
      renderItem={({item, index}) => {
        return <ContractStatus item={item} key={index} />;
      }}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default Accept;
