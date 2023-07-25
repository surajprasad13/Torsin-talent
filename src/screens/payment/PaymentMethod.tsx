/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CustomButton, CustomInput, Title} from '../../components';
import {appstyle, colors, fonts} from '../../theme';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  generateLink,
  getBankAccountDeail,
  getStripeAccountInfo,
} from '../../redux/actions/paymentAction';

const PaymentMethod = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {accountDetail, loading, accountOnboarding, bankAccountDetail} =
    useAppSelector(state => state.payment);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      if (accountDetail) {
        dispatch(generateLink(accountDetail.instanceId));
      }
    });
    return () => listener;
  }, []);

  useEffect(() => {
    dispatch(getStripeAccountInfo(''));
  }, []);

  useEffect(() => {
    if (accountDetail) {
      dispatch(generateLink(accountDetail.instanceId));
    }
  }, [accountDetail]);

  useEffect(() => {
    dispatch(getBankAccountDeail(''));
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title title="Payment Method" />

        {bankAccountDetail?.Details?.external_accounts?.data ? (
          <View style={{margin: 10}}>
            {bankAccountDetail?.Details?.external_accounts?.data.map(
              (item: any, index: number) => {
                return (
                  <View key={index.toString()} style={{}}>
                    <CustomInput
                      editable={false}
                      label="Bank Name"
                      value={item.bank_name}
                    />
                    <CustomInput
                      editable={false}
                      label="Account Holder Name"
                      value={item.account_holder_name ?? ''}
                      containerStyle={{marginTop: 10}}
                    />
                    <CustomInput
                      editable={false}
                      label="Account Number"
                      value={`**** **** **** ` + item.last4 ?? ''}
                      containerStyle={{marginTop: 10}}
                    />
                    <CustomInput
                      editable={false}
                      label="Account Type"
                      value={item.account_type ?? ''}
                      containerStyle={{marginTop: 10}}
                    />
                  </View>
                );
              },
            )}
          </View>
        ) : (
          <View style={{padding: 10}}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <CustomButton
                  disabled
                  title="Add Bank"
                  onPress={() => {
                    navigation.navigate('WebScreen', {
                      item: accountOnboarding?.url,
                    });
                  }}
                />
                <View
                  style={{
                    ...appstyle.shadow,
                    padding: 10,
                    borderRadius: 12,
                    marginTop: 40,
                    borderWidth: 0.2,
                    borderColor: colors.grey,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name="exclamationcircleo"
                    size={50}
                    color="#6180F4"
                    style={{padding: 10}}
                  />

                  <Text
                    style={{
                      color: colors.black,
                      padding: 10,
                      width: '85%',
                      fontFamily: fonts.regular,
                      textAlign: 'center',
                    }}>
                    Click on the button to proceed to Stripe payment source
                  </Text>
                </View>
                <Image
                  source={require('../../assets/images/noModule/paymentmethod.png')}
                  style={styles.noPaymentImage}
                />
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  noPaymentImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentMethod;
