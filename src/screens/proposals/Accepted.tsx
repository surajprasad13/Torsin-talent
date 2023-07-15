import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProposalStatus} from '../../redux/actions/userAction';
import ProposalStatus from './components/ProposalStatus';
import {fonts} from '../../theme';

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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Image
                  source={require('../../assets/images/noModule/proposed.png')}
                  style={styles.emptyImage}
                />
                <Text
                  style={{
                    fontFamily: fonts.semibold,
                    fontSize: 24,
                    color: '#000F1A',
                  }}>
                  No Proposals Accept
                </Text>
              </>
            )}
          </View>
        }
        data={filtered.filter(_item => _item.proposalStatus == 2)}
        renderItem={({item, index}) => {
          return <ProposalStatus item={item} key={index} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: '90%',
    height: 300,
    resizeMode: 'contain',
    flex: 1,
  },
});

export default Accepted;
