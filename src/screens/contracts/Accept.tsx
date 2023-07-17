import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

// components
import ContractStatus from './components/ContractStatus';

// helpers
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getContract} from '../../redux/actions/userAction';
import {fonts} from '../../theme';

const {height} = Dimensions.get('window');

const Accept = () => {
  const dispatch = useAppDispatch();
  const {loading, contracts} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getContract(1));
  }, []);

  return (
    <FlatList
      data={contracts.accepted}
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
              <Text style={styles.text}>No Contracts Accepted</Text>
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

export default Accept;
