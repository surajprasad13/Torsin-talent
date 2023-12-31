import React, {FC, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';

// helpers
import {appstyle, colors, fonts} from '../../theme';

//icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getPaymentDetails} from '../../redux/actions/userAction';
import {Title} from '../../components';
import moment from 'moment';

interface PaymentDetailProp {
  route: any;
}

const projectType = ['', 'Hourly', 'Fixed'];

const PaymentDetail: FC<PaymentDetailProp> = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {id} = route.params;

  const {paymentDetail: item, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getPaymentDetails(Number(id)));
  }, []);

  if (loading && item == null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Payment Details" />
      <ScrollView>
        <View style={styles.cardContainer}>
          <Text style={{fontSize: 18, fontFamily: fonts.medium}}>
            {item?.jobName}
          </Text>

          {/* <FastImage
              source={{uri: item?.photos}}
              resizeMode="cover"
              style={{width: 50, height: 50, borderRadius: 25}}
            /> */}

          <Text style={{fontFamily: fonts.regular, fontSize: 12, marginTop: 5}}>
            Project type : {projectType[item?.projectType ?? 1]}
          </Text>
          <Text style={{fontFamily: fonts.regular, fontSize: 12, marginTop: 5}}>
            Cost : ${item?.receivedAmount}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AntDesign name="clockcircleo" size={10} style={styles.icon} />
              <Text style={{fontFamily: fonts.regular, fontSize: 12}}>
                {moment(item?.createdAt).format('lll')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Entypo name="location-pin" size={10} style={styles.icon} />
              <Text style={{fontFamily: fonts.regular, fontSize: 12}}>
                {item?.location}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Divider />
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 14, fontFamily: fonts.semibold}}>
              Job Description
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                lineHeight: 20,
                marginTop: 10,
                fontSize: 12,
                color: '#1E202B',
              }}>
              {item?.jobDescription}
            </Text>
          </View>

          <Divider style={{marginTop: 20}} />
          {/* 
          <View
            style={{
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: colors.black,
                fontSize: 16,
              }}>
              Photos
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <FastImage
                source={{uri: item?.photos}}
                style={styles.innerImage}
              />
            </View>
          </View> */}
          {item?.paymentStatus === 1 && (
            <View
              style={{
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={{
                  padding: 10,
                  backgroundColor: colors.primary,
                  borderRadius: 12,
                  justifyContent: 'center',
                  width: '60%',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.bold,
                    color: colors.white,
                    fontSize: 14,
                    textAlign: 'center',
                  }}>
                  Request Payment
                </Text>
              </Pressable>

              <Pressable
                style={{
                  padding: 10,
                  backgroundColor: colors.red,
                  borderRadius: 10,
                  justifyContent: 'center',
                  width: '35%',
                  height: 50,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.bold,
                    color: colors.white,
                    fontSize: 14,
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
  cardContainer: {
    ...appstyle.shadow,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 10,
    marginTop: 20,
  },
  text: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 12,
    marginTop: 5,
    justifyContent: 'center',
  },
  headertext: {
    fontFamily: fonts.regular,
    color: colors.black,
    fontSize: 12,
    justifyContent: 'center',
  },
  icon: {
    right: 2,
  },
  innerImage: {
    width: 86,
    height: 86,
    borderRadius: 5,
    margin: 5,
  },
});

export default PaymentDetail;
