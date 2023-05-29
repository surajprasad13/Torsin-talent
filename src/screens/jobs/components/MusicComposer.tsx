import {View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {appstyle, colors, fonts} from '../../../theme';

//icons
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

const MusicComposer = () => {
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
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cardContainer: {
    ...appstyle.shadow,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 20,
    margin: 10,
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
