import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

//icons

//helpers
import {fonts} from '../../theme';
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
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Image
                source={require('../../assets/images/noModule/contract.png')}
                style={styles.emptyImage}
              />
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: 24,
                  color: '#000F1A',
                }}>
                No Contracts Archived
              </Text>
            </>
          )}
        </View>
      }
      renderItem={({item, index}) => {
        return <ArchiveContractCard item={item} key={index} />;
      }}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    flex: 1,
  },
});

export default ArchiveContract;
