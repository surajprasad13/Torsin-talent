import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// components
import {
  CustomButton,
  CustomInput,
  GridImageView,
  Title,
} from '../../components';

// helpers
import {appstyle, colors, fonts} from '../../theme';

const projectType = ['', 'Hourly', 'Fixed'];

const ProposalDetail = ({route}: any) => {
  const ref = useRef(null);
  const [imageVisible, setImageVisible] = useState<boolean>(false);

  const {item} = route.params;
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const heightProgress = useSharedValue(150);

  const handleViewMore = () => {
    setIsExpanded(!isExpanded);
    heightProgress.value = withTiming(isExpanded ? 150 : 300);
  };

  const rStyle = useAnimatedStyle(() => {
    return {height: heightProgress.value};
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Title title="Proposal Detail" />

        <ScrollView ref={ref}>
          <View
            style={[
              appstyle.shadow,
              {margin: 10, padding: 10, borderRadius: 12},
            ]}>
            <Animated.View style={[rStyle, {overflow: 'hidden'}]}>
              <Text style={styles.title}>{item.jobName}</Text>
              <View style={{marginTop: 10}}>
                <Text style={styles.titleName}>
                  Published date:{' '}
                  <Text style={styles.description}>
                    {moment(item.createdAt).format('lll')}
                  </Text>
                </Text>
                <Text style={styles.titleName}>
                  Service:
                  <Text style={styles.description}> {item.adminService}</Text>
                </Text>
                <Text style={styles.titleName}>
                  Payment type:
                  <Text style={styles.description}>
                    {' '}
                    {projectType[item.jobProjectType]}
                  </Text>
                </Text>
                <Text style={styles.titleName}>
                  Location:
                  <Text style={styles.description}> {item.location}</Text>
                </Text>
                <Text style={styles.titleName}>
                  Country:
                  <Text style={styles.description}> {item.countryName}</Text>
                </Text>
              </View>

              <Text style={styles.title}>Description</Text>
              <Text style={styles.description}>{item.jobDescription}</Text>

              {item.photos && item.photos.length > 0 && (
                <View style={{margin: 5, padding: 5}}>
                  <Text style={styles.title}>Photos</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}>
                    {item.photos.map((_item: string, index: number) => {
                      return (
                        <FastImage
                          key={index.toString()}
                          source={{uri: _item}}
                          style={styles.innerImage}
                        />
                      );
                    })}
                  </View>
                </View>
              )}
              <View
                style={{
                  margin: 5,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.semibold,
                    fontSize: 18,
                    color: colors.primary,
                  }}>
                  Rates:
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: colors.grey2,
                      fontFamily: fonts.semibold,
                      padding: 5,
                    }}>
                    ${item.jobPriceRate}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            <TouchableOpacity
              style={{alignItems: 'flex-end', padding: 5}}
              onPress={handleViewMore}>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fonts.regular,
                  fontSize: 12,
                }}>
                {isExpanded ? 'View Less' : 'View More'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 0, margin: 15}}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#4F4F4F',
                fontSize: 16,
              }}>
              Message
            </Text>
            <View
              style={{
                width: '100%',
                height: 170,
                borderWidth: 0.5,
                borderRadius: 8,
                borderColor: colors.light,
                marginTop: 10,
                backgroundColor: colors.white,
              }}>
              <TextInput
                placeholder="Message"
                value={item.message}
                multiline={true}
                placeholderTextColor="#4F4F4F"
                editable={false}
                style={{
                  padding: 15,
                  top: 10,
                  fontSize: 14,
                  width: '100%',
                  lineHeight: 20,
                  fontFamily: fonts.regular,
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: 'auto',
            }}>
            <CustomInput
              label="Project Type"
              keyboardType="number-pad"
              editable={false}
              value={
                item.projectType !== null ? projectType[item.projectType] : 'NA'
              }
              containerStyle={{marginTop: 10, width: '45%'}}
            />

            <CustomInput
              label="Service Charge"
              value={item.charges !== null ? String(item.charges) : 'NA'}
              keyboardType="number-pad"
              editable={false}
              containerStyle={{marginTop: 10, width: 'auto'}}
            />
          </View>

          {item.photos !== null && item.photos.length > 0 && (
            <View
              style={{
                ...appstyle.shadow,
                borderRadius: 10,
                margin: 15,
                padding: 10,
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
                {item.photos?.map((a: any, b: any) => (
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

          {item.videos !== null && (
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: '#4F4F4F',
                  fontSize: 16,
                }}>
                Video
              </Text>
            </View>
          )}

          {item.videos !== null ? (
            <View style={styles.videoInput}>
              <FastImage
                source={require('../../assets/images/video1.png')}
                resizeMode="cover"
                style={{
                  height: 200,
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
              />
            </View>
          ) : null}

          {item.portfolio !== null && (
            <CustomInput
              label="Portfolio link"
              placeholder="https://portfolio.link.com"
              value={item.portfolio}
              containerStyle={{marginTop: 10, margin: 15}}
              editable={false}
            />
          )}

          <CustomButton
            title="Chat now"
            onPress={() =>
              navigation.navigate('ChatUser', {
                item,
              })
            }
            disabled={item.proposalStatus == 2}
            style={{marginTop: 20}}
          />
          <View style={{marginTop: 50}} />
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    ...appstyle.shadow,
    maxWidth: '100%',
    margin: 10,
    borderRadius: 15,
    padding: 0,
  },
  textContainer: {
    marginLeft: 10,
    padding: 10,
    marginTop: 10,
  },

  videoInput: {
    ...appstyle.shadow,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  photoInput: {
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  innerPhotos: {
    borderRadius: 10,
    flex: 1,
  },
  dropdwon: {},
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...appstyle.shadow,
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  image: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontFamily: fonts.semibold,
    color: colors.primary,
    fontSize: 18,
    marginTop: 10,
  },
  description: {
    fontFamily: fonts.regular,
    color: colors.grey2,
    marginTop: 10,
  },
  titleName: {
    color: colors.primary,
    marginTop: 5,
  },
  innerImage: {
    width: 86,
    height: 100,
    borderRadius: 5,
    margin: 5,
  },
});

export default ProposalDetail;
