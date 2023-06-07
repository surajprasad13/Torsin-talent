import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// helpers
import {appstyle, fonts} from '../../theme';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAccepted} from '../../redux/actions/userAction';
import moment from 'moment';

const Chat = ({}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {userToken} = useAppSelector(state => state.auth);
  const {acceptList, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getAccepted({userToken}));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fbff'}}>
      <ScrollView>
        {loading && <ActivityIndicator />}
        <View
          style={{
            ...appstyle.shadow,
            padding: 10,
            borderRadius: 15,
            backgroundColor: 'white',
            margin: 10,
          }}>
          {acceptList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  navigation.navigate('ChatUser', {item});
                }}
                style={styles.container}>
                <FastImage
                  source={{uri: item.profileImage}}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderWidth: 0.5,
                  }}
                />
                <View style={{width: '80%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
                      {item.fullname}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: '#BDBDBD',
                        textAlign: 'right',
                      }}>
                      {moment(item.createdAt).fromNow()}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: fonts.semibold,
                      color: '#1E202B',
                      marginTop: 5,
                      opacity: 0.8,
                    }}>
                    {item.jobName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      color: '#1E202B',
                      opacity: 0.6,
                      marginTop: 5,
                    }}>
                    {item.jobDescription}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderBottomColor: '#D3D3D3',
  },
});

export default Chat;

const json = [
  {
    createdAt: '2023-06-07T05:12:11.460644Z',
    fullname: 'Mayank Tyagi',
    image: [
      'https://torsin-bucket.s3.ap-south-1.amazonaws.com/DE5AA26F-2C02-4F96-B387-BAB425245B94.png',
      'https://torsin-bucket.s3.ap-south-1.amazonaws.com/5521B2E2-B5EF-49BD-BCF1-096808C14B31.jpg',
    ],
    jobDescription:
      'I am looking for the iOS developer for mobile application ',
    jobId: 157,
    jobName: 'IOS developer ',
    profileImage:
      'https://torsin-bucket.s3.ap-south-1.amazonaws.com/IMG_0003.JPG',
    proposalId: 71,
    proposalStatus: 2,
  },
  {
    createdAt: '2023-06-06T20:00:23.000508Z',
    fullname: 'Mayank Tyagi',
    image: [
      'https://torsin-bucket.s3.ap-south-1.amazonaws.com/D16F5CEB-FF02-4B72-8A01-104B1758791E.png',
    ],
    jobDescription: 'DuckDuckGo',
    jobId: 158,
    jobName: 'Android ',
    profileImage:
      'https://torsin-bucket.s3.ap-south-1.amazonaws.com/IMG_0003.JPG',
    proposalId: 70,
    proposalStatus: 2,
  },
];
