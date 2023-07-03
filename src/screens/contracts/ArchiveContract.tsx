import React, {useEffect} from 'react';
import {View} from 'react-native';

//icons

//helpers
import {} from '../../theme';
import ArchiveContractCard from './components/ArchiveContractCard';
import {} from '../../components';
import {FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getContract} from '../../redux/actions/userAction';

const ArchiveContract = () => {
  const {loading, contracts} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContract(3));
  }, []);

  return (
    <FlatList
      data={contracts.filter(item => item.status == 3)}
      ListEmptyComponent={<View>{loading && <ActivityIndicator />}</View>}
      renderItem={({item, index}) => {
        return <ArchiveContractCard item={item} key={index} />;
      }}
      inverted
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default ArchiveContract;
