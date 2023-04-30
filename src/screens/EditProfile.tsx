import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';

import {fonts} from '../theme';

const EditProfile = ({}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#ffffff',
          height: 100,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            navigation.navigate('HomeScreen');
          }}
          style={{
            position: 'absolute',
            top: 58,
            left: 24,
          }}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            top: 50,
            fontFamily: fonts.medium,
            color: '#000C14',
          }}>
          John Smith’s Profile
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#F9FBFF',
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditUserProfile');
          }}>
          <View
            style={{
              width: '90%',
              height: 125,
              backgroundColor: '#ffffff',
              elevation: 1,
              marginLeft: '5%',
              top: 25,
              borderRadius: 19,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#D6DFFF',
                borderRadius: 30,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                top: 32,
                left: 23,
              }}>
              <Image
                source={require('../assets/images/User_fill.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>

            <View style={{top: 27, left: 50}}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontSize: 16,
                  color: '#1E202B',
                }}>
                Edit personal info
              </Text>
            </View>

            <View style={{top: 47}}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  fontSize: 10,
                  lineHeight: 15,
                  width: 200,
                  right: 75,
                  /* or 122% */
                  display: 'flex',
                  alignItems: 'center',
                  /* Brand black */
                  color: '#1E202B',
                }}>
                Complete your profile. Set your profile completely so that
                recruiter will find your profile easily.
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            navigation.navigate('EditUserProfile');
          }}>
          <View
            style={{
              width: '90%',
              height: 125,
              backgroundColor: '#ffffff',
              elevation: 1,
              marginLeft: '5%',
              top: 41,
              borderRadius: 19,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#D6DFFF',
                borderRadius: 30,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                top: 32,
                left: 23,
              }}>
              <Image
                source={require('../assets/images/pp.png')}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>

            <View style={{top: 27, left: 50}}>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                  lineHeight: 20,
                  color: '#1E202B',
                }}>
                Add services and skills
              </Text>
            </View>

            <View style={{top: 47}}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  width: 200,
                  right: 115,
                  color: '#1E202B',
                }}>
                Complete your profile. Set your profile completely so that
                recruiter will find your profile easily.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default EditProfile;
