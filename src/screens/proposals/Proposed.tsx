import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getProposalStatus} from '../../redux/actions/userAction';
import ProposalStatus from './components/ProposalStatus';
import {fonts} from '../../theme';

const {height} = Dimensions.get('window');

const Proposed = () => {
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
          <View
            style={{
              flex: 1,
              minHeight: height * 0.7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
                    fontSize: 20,
                    color: '#000F1A',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  No Proposals Yet
                </Text>
              </>
            )}
          </View>
        }
        data={proposalStatus.filter(_item => _item.proposalStatus == 1)}
        renderItem={({item, index}) => {
          return <ProposalStatus item={item} key={index.toString()} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyImage: {
    width: '70%',
    height: 250,
    resizeMode: 'contain',
  },
});

export default Proposed;
