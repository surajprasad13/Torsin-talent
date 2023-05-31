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
import Ionicons from 'react-native-vector-icons/Ionicons';

import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import {CustomButton} from '../../../components';
import moment from 'moment';

const DetailActiveJob = ({route}) => {
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
            Active Job details
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={{fontSize: 18, fontFamily: fonts.medium, padding: 5}}>
            React Native
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <FastImage
              source={require('../../../assets/images/men.png')}
              resizeMode="cover"
              style={{width: 50, height: 50, borderRadius: 25}}
            />
            <View style={{width: '80%'}}>
              <Text style={styles.headertext}>Java Developer</Text>
              <Text
                style={{fontFamily: fonts.regular, fontSize: 12, marginTop: 5}}>
                Project type : Hourly
              </Text>
              <Text
                style={{fontFamily: fonts.regular, fontSize: 12, marginTop: 5}}>
                Cost : $700
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
              <Text style={{fontFamily: fonts.regular, fontSize: 12}}>
                06/06/2006
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
                Noida, India
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
              magni error facilis placeat necessitatibus dolores debitis,
              laboriosam, voluptate porro quibusdam tempore vero. Quas alias
              esse explicabo odit debitis, non obcaecati.
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
              <FastImage
                source={require('../../../assets/images/men.png')}
                style={styles.innerImage}
              />
            </View>
          </View>

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
        </View>

        <Pressable
          onPress={() => navigation.navigate('RatingReview')}
          style={{
            ...appstyle.shadow,
            marginTop: 10,
            padding: 15,
            margin: 10,
            flexDirection: 'row',
            borderRadius: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#D6DFFF',
              padding: 15,
              borderRadius: 100,
            }}>
            <AntDesign name="star" size={30} style={{color: colors.primary}} />
          </View>
          <View
            style={{
              width: '80%',
            }}>
            <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
              Add Rating & Review
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                marginTop: 5,
                fontSize: 10,
                opacity: 0.8,
                color: '#1E202B',
                lineHeight: 15,
              }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Blanditiis labore iusto velit aspernatur deleniti necessitatibus
              molestias ad, dolores nisi harum placeat quis consequuntur hic
              libero laboriosam nam iste, ipsam accusantium.
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('ReportProblem')}
          style={{
            ...appstyle.shadow,
            marginTop: 10,
            padding: 15,
            margin: 10,
            flexDirection: 'row',
            borderRadius: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#D6DFFF',
              padding: 15,
              borderRadius: 100,
            }}>
            <Ionicons
              name="md-shield-checkmark"
              size={30}
              style={{color: colors.primary}}
            />
          </View>
          <View
            style={{
              width: '80%',
            }}>
            <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
              Report a problems
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                marginTop: 5,
                fontSize: 10,
                opacity: 0.8,
                color: '#1E202B',
                lineHeight: 15,
              }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Blanditiis labore iusto velit aspernatur deleniti necessitatibus
              molestias ad, dolores nisi harum placeat quis consequuntur hic
              libero laboriosam nam iste, ipsam accusantium.
            </Text>
          </View>
        </Pressable>
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

export default DetailActiveJob;
