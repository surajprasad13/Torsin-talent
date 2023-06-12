import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

// icons

// components
import {CustomButton, CustomInput, Title} from '../../components';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

const projectType = ['', 'Hourly', 'Fixed'];

const ProposalDetail = ({route}: any) => {
  const {item} = route.params;
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleViewMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Title title="Proposal Detail" />

        <ScrollView>
          <View
            style={{
              ...appstyle.shadow,
              padding: 10,
              margin: 10,
              borderRadius: 12,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <FastImage
                source={{
                  uri: 'https://source.unsplash.com/400x400?user',
                }}
                resizeMode="cover"
                style={{width: 50, height: 50, borderRadius: 25}}
              />
              <View style={{width: '80%', margin: 5}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#1E202B',
                    fontFamily: fonts.semibold,
                  }}>
                  Card Content
                </Text>
                <Text
                  style={{
                    color: '#1E202B',
                    fontFamily: fonts.regular,
                    fontSize: 12,
                  }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nesciunt commodi accusantium exercitationem autem blanditiis
                  debitis, sequi pariatur voluptatibus facilis voluptatem vitae
                  quo repellat modi quasi hic? Neque enim animi ipsa.
                </Text>
              </View>
            </View>
            {isExpanded && <Text>Additional Content</Text>}
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={handleViewMore}>
              <Text style={{color: colors.primary}}>
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
              width: '100%',
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
              containerStyle={{marginTop: 10, width: '45%'}}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#4F4F4F',
                fontSize: 16,
              }}>
              Photos
            </Text>
          </View>

          {item.photos.length > 0 ? (
            <View style={styles.photoContainer}>
              {item.photos.map((_item: string, index: number) => (
                <View key={index.toString()} style={styles.innerPhotos}>
                  <FastImage
                    source={{uri: _item}}
                    resizeMode="cover"
                    style={{width: '100%', height: 140, borderRadius: 10}}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.videoInput}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                  fontFamily: fonts.regular,
                  color: colors.grey,
                }}>
                No Photos
              </Text>
            </View>
          )}

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
          ) : (
            <View style={styles.videoInput}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 10,
                  fontFamily: fonts.regular,
                  color: colors.grey,
                }}>
                No Video
              </Text>
            </View>
          )}

          <CustomInput
            label="Portfolio link"
            placeholder="https://portfolio.link.com"
            value={item.portfolio !== null ? item.portfolio : 'NA'}
            containerStyle={{marginTop: 10, margin: 15}}
            editable={false}
          />
          {}
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
});

export default ProposalDetail;
