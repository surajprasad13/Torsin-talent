import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

// icons

// components
import {CustomButton, CustomInput, Title} from '../../components';

// helpers
import {appstyle, colors, fonts} from '../../theme';

const projectType = ['', 'Hourly', 'Fixed'];

const ProposalDetail = ({route}: any) => {
  const {item} = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Title title="Proposal Detail" />

        <ScrollView>
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
                  opacity: 0.5,
                  width: '100%',
                  lineHeight: 20,
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
              placeholder={projectType[item.projectType]}
              keyboardType="number-pad"
              editable={false}
              containerStyle={{marginTop: 10, width: '45%'}}
            />

            <CustomInput
              label="Service Charge"
              placeholder={String(item.charges)}
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

          <View style={styles.photoContainer}>
            {item.images.map((_item: string, index: number) => (
              <View key={index.toString()} style={styles.innerPhotos}>
                <FastImage
                  source={{uri: _item}}
                  resizeMode="cover"
                  style={{width: '100%', height: 140, borderRadius: 10}}
                />
              </View>
            ))}
          </View>

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

          <Pressable style={styles.videoInput}>
            <FastImage
              source={require('../../assets/images/video1.png')}
              resizeMode="cover"
              style={{
                height: 200,
                justifyContent: 'center',
                borderRadius: 10,
              }}
            />
          </Pressable>

          <CustomInput
            label="Add Portfolio link"
            placeholder="https://portfolio.link.com"
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
