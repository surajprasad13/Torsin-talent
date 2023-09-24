import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {appstyle, fonts} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getPaymentStatus} from '../../redux/actions/userAction';
import PaymentStatus from './component/PaymentStatus';

const {height} = Dimensions.get('window');

const Pending = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {paymentStatus, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getPaymentStatus());
  }, []);

  const onRefresh = () => {
    dispatch(getPaymentStatus());
  };

  console.log(paymentStatus);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
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
                <FastImage
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
                  No Pending Payment
                </Text>
              </>
            )}
          </View>
        }
        data={paymentStatus.filter(_item => _item.paymentStatus == 1)}
        renderItem={({item, index}) => {
          return <PaymentStatus item={item} key={index} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyImage: {
    width: '70%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default Pending;
