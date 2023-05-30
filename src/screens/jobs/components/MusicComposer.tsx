import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {appstyle, colors, fonts} from '../../../theme';

//icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import {CustomButton} from '../../../components';
import {JobDetail} from '../../../types/user';
import moment from 'moment';

const projectType = ['', 'Fixed', 'Hourly'];

const MusicComposer = ({route}) => {
  const {item} = route.params as JobDetail;

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <Pressable
            style={{position: 'absolute', left: 10}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Feather name="arrow-left" size={20} />
          </Pressable>
          <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
            Job details
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={{fontSize: 18, fontFamily: fonts.medium, padding: 5}}>
            {item.adminService}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <FastImage
              source={{
                uri: item.photos[0],
              }}
              resizeMode="cover"
              style={{width: 50, height: 50, borderRadius: 25}}
            />
            <View style={{width: '80%'}}>
              <Text style={styles.headertext}>{item.jobName}</Text>
              <Text
                style={{fontFamily: fonts.regular, fontSize: 12, marginTop: 5}}>
                Project type : {projectType[item.projectType]}
              </Text>
              <Text
                style={{fontFamily: fonts.regular, fontSize: 12, marginTop: 5}}>
                Cost : {item.priceRate}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              margin: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AntDesign name="clockcircleo" size={10} style={styles.icon} />
              <Text
                style={{fontFamily: fonts.regular, fontSize: 12}}
                numberOfLines={1}>
                {moment(item.createdAt).format('lll')}
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
                {item.location},{item.countryName}
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
              {item.jobDescription}
            </Text>
          </View>

          <Divider style={{marginTop: 20}} />

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
              {item.photos.map((_item, _index) => (
                <FastImage
                  source={{uri: _item}}
                  key={_index.toString()}
                  style={styles.innerImage}
                />
              ))}
            </View>
          </View>

          <View style={{marginTop: 30}}>
            <CustomButton
              disabled={true}
              title="Apply for job"
              // onPress={() => navigation.navigate('PurposalSent')}
            />
          </View>
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

export default MusicComposer;
