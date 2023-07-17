import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

// helpers
import {useAppDispatch, useAppSelector} from '../../hooks';

// components
import ContractStatus from './components/ContractStatus';
import {getContract} from '../../redux/actions/userAction';
import {fonts} from '../../theme';

const {height} = Dimensions.get('window');

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
              <Text style={styles.text}>No Contracts Rejected</Text>
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
    minHeight: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: '70%',
    height: 250,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: '#000F1A',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Reject;
