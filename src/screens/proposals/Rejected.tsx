import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProposalStatus} from '../../redux/actions/userAction';
import ProposalStatus from './components/ProposalStatus';
import {fonts} from '../../theme';

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
                  No Proposals Reject
                </Text>
              </>
            )}
          </View>
        }
        data={proposalStatus.filter(_item => _item.proposalStatus == 3)}
        renderItem={({item, index}) => {
          return <ProposalStatus item={item} key={index.toString()} />;
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

export default Rejected;
