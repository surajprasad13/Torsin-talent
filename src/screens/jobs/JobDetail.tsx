import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import moment from 'moment';

// components
import {CustomButton, GridImageView, Title} from '../../components';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {JobDetail} from '../../types/user';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const projectType = ['', 'Fixed', 'Hourly'];

const JobDetails = ({route}: any) => {
  const {item} = route.params as {item: JobDetail};
  const navigation = useNavigation();

  const [imageVisible, setImageVisible] = useState<boolean>(false);
  console.log(item?.adminService);

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Job Details" />

      <ScrollView>
        <View style={styles.cardContainer}>
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
            <Text
              style={{fontFamily: fonts.regular, fontSize: 12, marginTop: 5}}>
              Skills Required: {item.adminService?.join(', ')}
            </Text>
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

          {item.photos !== null && item.photos.length > 0 && (
            <View
              style={{
                ...appstyle.shadow,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  color: colors.black,
                  fontSize: 16,
                  padding: 5,
                }}>
                Photos
              </Text>

              <View style={styles.photoContainer}>
                {item.photos?.map((a, b) => (
                  <Pressable
                    onPress={() => {
                      setImageVisible(true);
                    }}
                    key={b.toString()}
                    style={styles.innerPhotos}>
                    <FastImage
                      source={{uri: a}}
                      resizeMode="cover"
                      style={{width: '100%', height: 140, borderRadius: 10}}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          <View style={{marginTop: 30}}>
            <CustomButton
              disabled={true}
              title="Apply for job"
              onPress={() =>
                navigation.navigate('AddJobDetails', {id: item.id ?? 0})
              }
              // onPress={() => navigation.navigate('PurposalSent')}
            />
          </View>
        </View>
      </ScrollView>
      {item.photos !== null && item.photos.length > 0 && (
        <GridImageView
          data={item.photos}
          visible={imageVisible}
          onRequestClose={() => {
            setImageVisible(false);
          }}
        />
      )}
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
  innerPhotos: {
    borderRadius: 10,
    flex: 1,
    margin: 5,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
});

export default JobDetails;
