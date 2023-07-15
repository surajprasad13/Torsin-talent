import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

// helpers
import {useAppDispatch, useAppSelector} from '../../hooks';

// components
import ContractStatus from './components/ContractStatus';
import {getContract} from '../../redux/actions/userAction';
import {fonts} from '../../theme';

const Reject = () => {
  const dispatch = useAppDispatch();
  const {loading, contracts} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getContract(2));
  }, []);

  return (
    <FlatList
      data={contracts.filter(item => item.status == 2)}
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
                No Contracts Rejected
              </Text>
            </>
          )}
        </View>
      }
      renderItem={({item, index}) => {
        return <ContractStatus item={item} key={index} />;
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

export default Reject;
