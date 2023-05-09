import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//icons
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

// components

import {colors, fonts} from '../../../theme';
import ExpertiseCard from '../../../screens/home/components/ExpertiseCard';
import OpenModal from './OpenModal';

const {} = Dimensions.get('window');

const MusicJob = ({}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: colors.white, padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DrawerNavigation')}>
            <Feather name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: 16,
              color: '#1E202B',
              textAlign: 'center',
            }}>
            Music
          </Text>
          <View style={{flex: 0.2}} />
        </View>

        <View
          style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            padding: 10,
          }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: '#EBEFFF',
                width: 30,
                height: 30,
                borderRadius: 4,
                alignItems: 'center',
                margin: 5,
              }}>
              <Octicons name="git-compare" size={15} />
            </View>
            <OpenModal />
            <TouchableOpacity style={styles.innerSearch}>
              <Text style={styles.innerText}>
                Budget <AntDesign name="down" size={12} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.innerSearch}>
              <Text style={styles.innerText}>
                Avilability
                <AntDesign name="down" size={12} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.innerSearch}>
              <Text style={styles.innerText}>
                Location <AntDesign name="down" size={12} />
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <ScrollView style={{padding: 10, backgroundColor: '#F9FBFF'}}>
        <View
          style={{
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: 16,
              color: '#1E202B',
            }}>
            Search results
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <ExpertiseCard item={item} key={index.toString()} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MusicJob;

const styles = StyleSheet.create({
  searchInput: {
    color: '#454545',
  },
  item: {
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  innerSearch: {
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 30,
    margin: 5,
    borderColor: '#1E202B',
  },
  innerText: {
    fontFamily: fonts.regular,
    color: '#1E202B',
  },
});
