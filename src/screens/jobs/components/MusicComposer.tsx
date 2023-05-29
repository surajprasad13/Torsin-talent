import {View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native';
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

const MusicComposer = ({item}: {item: JobDetail}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
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
          Music Composer jobs
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <Text style={{fontSize: 18, fontFamily: fonts.medium, padding: 5}}>
          Music Composer(Song Writer)
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <FastImage
            source={{
              uri: 'https://www.adorama.com/alc/wp-content/uploads/2017/10/shutterstock_76086133.jpg',
            }}
            resizeMode="cover"
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <View style={{width: '80%'}}>
            <Text style={styles.headertext}>
              PIE Management Consultancy by James Cameroon
            </Text>
            <Text
              style={{fontFamily: fonts.regular, fontSize: 14, marginTop: 5}}>
              $500.00-$ 600.00
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            margin: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Entypo name="location-pin" size={10} style={styles.icon} />
            <Text
              style={{fontFamily: fonts.regular, fontSize: 12}}
              numberOfLines={1}>
              5h ago
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name="clockcircleo" size={10} style={styles.icon} />
            <Text style={{fontFamily: fonts.regular, fontSize: 12}}>
              2715 Ash, South Dakota
            </Text>
          </View>
        </View>
        <Divider />
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 14, fontFamily: fonts.semibold}}>
            Job Description
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              lineHeight: 30,
              marginTop: 10,
              fontSize: 12,
              color: '#1E202B',
            }}>
            As a musician minim mollit non deseruntAmet minim mollit non
            deserunt . Job Description Complete your profile. Set your profile
            completely so that recruiter will find your profile easily. Amet
            minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit. Exercitation veniam
            consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco
            est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet
            minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.{' '}
          </Text>
        </View>

        <View style={{marginTop: 30}}>
          <CustomButton
            disabled
            title="Apply for job"
            onPress={() => navigation.navigate('PurposalSent')}
          />
        </View>
      </View>
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
});

export default MusicComposer;
