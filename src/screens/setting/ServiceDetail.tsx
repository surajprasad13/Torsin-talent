import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

// iconms

import {appstyle, colors, fonts} from '../../theme';
import {CustomInput, Title} from '../../components';

const ProjectType = ['', 'Hourly', 'Fixed'];

const ServiceDetail = ({route}: any) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <Title title="View Service" />

      <ScrollView>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
              fontSize: 16,
            }}>
            Add services
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: '#1E202B',
              marginTop: 12,
            }}>
            Job Description Complete your profile. Set your profile completely .
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            label="Service Name"
            placeholder="eg. Song Production"
            value={item.serviceName}
            containerStyle={{}}
            editable={false}
          />

          <CustomInput
            label="Project Type"
            value={ProjectType[item.chargeType]}
            containerStyle={{marginTop: 10}}
            editable={false}
          />

          <CustomInput
            label="Service Charge"
            value={`$ ${String(item.serviceCharge)}`}
            containerStyle={{marginTop: 10}}
            editable={false}
          />

          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#4F4F4F',
                fontSize: 16,
              }}>
              Service Description
            </Text>
            <View
              style={{
                height: 170,
                borderWidth: 0.5,
                borderRadius: 8,
                borderColor: colors.light,
                marginTop: 10,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Type description here..."
                multiline={true}
                placeholderTextColor="#333333"
                value={item.serviceDescription}
                style={{padding: 15, fontFamily: fonts.regular}}
                editable={false}
              />
            </View>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
              fontSize: 16,
            }}>
            Video
          </Text>
        </View>
        <Pressable style={styles.videoInput}>
          {item.serviceVideo !== null && item.serviceVideo.length > 0 ? (
            <Video
              source={{uri: item.serviceVideo}}
              controls
              paused
              resizeMode="contain"
              style={{
                width: '100%',
                height: 150,
                borderWidth: 0.3,
                borderRadius: 10,
                backgroundColor: colors.almostBlack,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: '#EBEFFF',
                minHeight: 150,
                borderRadius: 10,
                borderColor: colors.primary,
                borderWidth: 1,
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                No Video
              </Text>
            </View>
          )}
        </Pressable>

        <View style={styles.textContainer}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
              fontSize: 16,
            }}>
            Photos
          </Text>
        </View>

        <View
          style={{
            ...appstyle.shadow,
            borderRadius: 10,
            margin: 10,
            padding: 10,
          }}>
          <View style={styles.photoContainer}>
            {item.serviceImage !== null &&
              item.serviceImage.map((_item: string, index: number) => {
                return (
                  <View key={index.toString()} style={styles.innerPhotos}>
                    <FastImage
                      source={{uri: _item}}
                      resizeMode="cover"
                      style={{width: '100%', height: 100, borderRadius: 10}}
                    />
                  </View>
                );
              })}
          </View>
        </View>

        <View style={{marginTop: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 10,
    padding: 10,
  },
  inputContainer: {
    marginLeft: 10,
    padding: 10,
  },
  videoInput: {
    ...appstyle.shadow,
    height: 200,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  photoInput: {
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  innerPhotos: {
    backgroundColor: '#EBEFFF',
    minHeight: 100,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  dropdwon: {},
  photoContainer: {
    flexDirection: 'row',
  },
});

export default ServiceDetail;
