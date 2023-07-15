import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

// components
import ContractStatus from './components/ContractStatus';

// helpers
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getContract} from '../../redux/actions/userAction';
import {fonts} from '../../theme';

const Accept = () => {
  const dispatch = useAppDispatch();
  const {loading, contracts} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getContract(1));
  }, []);

  return (
    <FlatList
      data={contracts}
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
                No Contracts Accepted
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

export default Accept;
