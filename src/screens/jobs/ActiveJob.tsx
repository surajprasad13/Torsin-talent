import React from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';

// helpers
import {appstyle, colors, fonts} from '../../theme';

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const ActiveJob = ({}) => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      {[0, 1, 2, 3, 4, 5, 6].map(item => (
        <Pressable
          onPress={() => navigation.navigate('DetailActiveJob')}
          key={item.toString()}
          style={[styles.cardContainer, {}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <FastImage
              source={require('../../assets/images/men.png')}
              resizeMode="cover"
              style={{width: 50, height: 50, borderRadius: 25}}
            />
            <View style={{width: '80%'}}>
              <Text style={{fontFamily: fonts.semibold, color: colors.black}}>
                Java Developer
              </Text>
              <Text style={[styles.headertext, {marginTop: 10}]}>
                Testing Java
              </Text>
              <Text style={styles.text}>Test YourSelf</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.text}>$22222</Text>
              </View>
            </View>
          </View>

          <Divider style={{marginTop: 10}} />

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
                justifyContent: 'center',
              }}>
              <AntDesign name="clockcircleo" size={10} style={styles.icon} />
              <Text style={{fontFamily: fonts.regular, fontSize: 12}}>12</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Entypo name="location-pin" size={10} style={styles.icon} />
              <Text
                style={{fontFamily: fonts.regular, fontSize: 12}}
                numberOfLines={1}>
                Noida, India
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...appstyle.shadow,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    marginTop: 20,
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
    color: colors.primary,
    fontSize: 16,
    justifyContent: 'center',
  },
  icon: {
    right: 2,
  },
});

export default ActiveJob;
