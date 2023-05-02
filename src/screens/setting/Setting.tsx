import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

// components
import ProFile from '../../components/ProFile';
import {colors, fonts} from '../../theme';

const Setting = ({}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{flex: 1, padding: 10}}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
            style={{}}>
            <Feather name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fonts.medium,
              fontSize: 16,
              color: '#000C14',
            }}>
            View Profile
          </Text>
          <View />
        </View>

        <View style={{backgroundColor: '#f9fbff', flex: 2}}>
          <View style={{top: 24.33}}>
            <ProFile image="" onPress={() => {}} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40,
              padding: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: 20,
                color: colors.black,
              }}>
              Personal Information
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditUserProfile');
              }}
              style={{flexDirection: 'row'}}>
              <AntDesign name="edit" size={20} />
              <Text style={{fontFamily: fonts.medium, color: colors.primary}}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', top: 71}}>
            <Image
              source={require('../../assets/images/User_light.png')}
              style={styles.userIcon}
            />
            <Text style={styles.userText}>John Smith</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              top: 94,
            }}>
            <Image
              source={require('../../assets/images/nounMale.png')}
              style={styles.userIcon}
            />
            <Text style={styles.userText}>Male</Text>
          </View>

          <View style={{flexDirection: 'row', top: 115}}>
            <Image
              source={require('../../assets/images/Message_light.png')}
              style={styles.userIcon}
            />
            <Text style={styles.userText}>john@gmail.com</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              top: 136,
            }}>
            <Image
              source={require('../../assets/images/Phone_light.png')}
              style={styles.userIcon}
            />
            <Text style={styles.userText}>895204300</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              top: 157,
            }}>
            <Image
              source={require('../../assets/images/location.png')}
              style={styles.userIcon}
            />
            <Text style={styles.userText}>
              Murshid Bazar, Deira, P.O Box 40512
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  userText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
    left: 60,
  },

  userIcon: {
    width: 15,
    height: 15,
    left: 27,
    top: 3,
    tintColor: '#6c6c6c',
  },
});
