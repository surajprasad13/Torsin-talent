import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import {appstyle, colors, fonts} from '../../theme';
import {useAppSelector} from '../../hooks';

const EditProfile = ({}: any) => {
  const {userInfo} = useAppSelector(state => state.auth);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: colors.white,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            fontFamily: fonts.medium,
            color: '#000C14',
          }}>
          {`${userInfo?.fullName}'s Profile`}
        </Text>
        <View />
      </View>

      <View style={{backgroundColor: '#F9FBFF', flex: 1, padding: 10}}>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.navigate('EditUserProfile')}>
          <View style={styles.iconContainer}>
            <Feather name="user" size={20} />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: 16,
                color: '#1E202B',
              }}>
              Edit personal info
            </Text>
            <Text style={{fontFamily: fonts.regular, color: '#1E202B'}}>
              Complete your profile. Set your profile completely so that
              recruiter will find your profile easily.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => {
            //@ts-expect-error
            navigation.navigate('ServiceSkill');
          }}>
          <View style={styles.iconContainer}>
            <Feather name="settings" size={20} />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: '#1E202B',
                fontSize: 16,
              }}>
              Add services and skills
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#1E202B',
                marginTop: 5,
              }}>
              Complete your profile. Set your profile completely so that
              recruiter will find your profile easily.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.navigate('AddPortfolio')}>
          <View style={styles.iconContainer}>
            <Entypo name="suitcase" size={20} />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: 16,
                color: '#1E202B',
              }}>
              Add Portfolio
            </Text>
            <Text style={{fontFamily: fonts.regular, color: '#1E202B'}}>
              Complete your profile. Set your profile completely so that
              recruiter will find your profile easily.
            </Text>
          </View>
        </TouchableOpacity>

        {/*  */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    ...appstyle.shadow,
    marginBottom: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#D6DFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
    marginLeft: 10,
  },
});

export default EditProfile;
